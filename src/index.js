import { buidMixin } from './mixin';

// mixin
export const vueSlotChecker = buidMixin();

function install(Vue, { silent = Vue.config.silent } = {}) {
  if (install.installed) return;
  install.installed = true;

  const mixin = buidMixin({ silent });

  Vue.mixin({
    mixins: [mixin],
  });
}

const plugin = { install };

let GlobalVue = null;
if (typeof window !== 'undefined') {
  GlobalVue = window.Vue;
} else if (typeof global !== 'undefined') {
  GlobalVue = global.Vue;
}
if (GlobalVue) {
  GlobalVue.use(plugin);
}

export default plugin;
