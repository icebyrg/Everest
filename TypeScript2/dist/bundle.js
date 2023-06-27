(function () {
  'use strict';

  function mixin(a, b) {
      return Object.assign(Object.assign({}, a), b);
  }
  mixin({ a: 1, b: 2 }, { c: 3, b: '2' });

})();
//# sourceMappingURL=bundle.js.map
