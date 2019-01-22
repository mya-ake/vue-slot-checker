// referred: https://github.com/vuejs/vue/blob/dev/src/core/util/debug.js

import Vue from 'vue';

export const noop = () => {};

const hasConsole = typeof console !== 'undefined';
const classifyRE = /(?:^|[-_])(\w)/g;
const classify = str =>
  str.replace(classifyRE, c => c.toUpperCase()).replace(/[-_]/g, '');

const formatComponentName = (vm, includeFile) => {
  if (vm.$root === vm) {
    return '<Root>';
  }
  const options =
    typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
      ? vm.$options || vm.constructor.options
      : vm;
  let name = options.name || options._componentTag;
  const file = options.__file;
  if (!name && file) {
    const match = file.match(/([^/\\]+)\.vue$/);
    name = match && match[1];
  }

  return (
    (name ? `<${classify(name)}>` : `<Anonymous>`) +
    (file && includeFile !== false ? ` at ${file}` : '')
  );
};

const repeat = (str, n) => {
  let res = '';
  while (n) {
    if (n % 2 === 1) res += str;
    if (n > 1) str += str;
    n >>= 1;
  }
  return res;
};

const generateComponentTrace = vm => {
  if (vm._isVue && vm.$parent) {
    const tree = [];
    let currentRecursiveSequence = 0;
    while (vm) {
      if (tree.length > 0) {
        const last = tree[tree.length - 1];
        if (last.constructor === vm.constructor) {
          currentRecursiveSequence++;
          vm = vm.$parent;
          continue;
        } else if (currentRecursiveSequence > 0) {
          tree[tree.length - 1] = [last, currentRecursiveSequence];
          currentRecursiveSequence = 0;
        }
      }
      tree.push(vm);
      vm = vm.$parent;
    }
    return (
      '\n\nfound in\n\n' +
      tree
        .map(
          (vm, i) =>
            `${i === 0 ? '---> ' : repeat(' ', 5 + i * 2)}${
              Array.isArray(vm)
                ? `${formatComponentName(vm[0])}... (${vm[1]} recursive calls)`
                : formatComponentName(vm)
            }`,
        )
        .join('\n')
    );
  } else {
    return `\n\n(found in ${formatComponentName(vm)})`;
  }
};

export const warn = (msg, vm) => {
  const trace = vm ? generateComponentTrace(vm) : '';

  if (Vue.config.warnHandler) {
    Vue.config.warnHandler.call(null, msg, vm, trace);
  } else if (hasConsole && !Vue.config.silent) {
    // eslint-disable-next-line no-console
    const message = process.env.NODE_ENV !== 'test' ? `${msg}${trace}` : msg;
    console.error(`[vue-slot-checker warn]: ${message}`);
  }
};
