import { mixin } from './mixin';

// mixin
export const vueSlotCheckerMixin = mixin;

function install(Vue, { silent = Vue.config.silent } = {}) {
  if (install.installed || silent) return;
  install.installed = true;

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
