import { RemoveFist } from "./9.KebabCase";

type ObjectAccessPaths<
  T,
  F extends string = "",
  K = keyof T
> = K extends keyof T
  ? T[K] extends object
    ? ObjectAccessPaths<T[K], `${F}.${K & string}`>
    : RemoveFist<`${F}.${K & string}`, ".">
  : any;

function createI18n<Schema>(
  schema: Schema
): (path: ObjectAccessPaths<Schema>) => void {
  return (path) => {};
}

const i18n = createI18n({
  home: {
    topBar: {
      title: "顶部标题",
      welcome: "欢迎登录",
    },
    bottomBar: {
      notes: "阿斯顿撒大",
    },
  },
  login: {
    username: "用户名",
    password: "密码",
  },
});

// i18n("home.bottomBar.myNotes");
