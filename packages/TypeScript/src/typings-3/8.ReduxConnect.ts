interface Module {
  count: number;
  message: string;
  asyncMethod<T, U>(input: Promise<T>): Promise<Action<U>>;
  syncMethod<T, U>(action: Action<T>): Action<T>;
}

interface Action<T> {
  payload?: T;
  type: string;
}

type Result = {
  asyncMethod<T, U>(input: T): Action<T>;
  syncMethod<T, U>(action: T): Action<U>;
};

type Connect<T> = {
  [K in keyof T as T[K] extends (...args: any[]) => any
    ? K
    : never]: T[K] extends <T, U>(input: Promise<T>) => Promise<Action<U>>
    ? <T, U>(input: T) => Action<U>
    : T[K] extends <T, U>(action: Action<T>) => Action<T>
    ? <T, U>(action: T) => Action<U>
    : never;
};

type F = Connect<Module>;
