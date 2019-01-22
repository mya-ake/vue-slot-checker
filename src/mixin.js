import { warn } from './debug';

const warnRequire = slotName => {
  warn(`Missing required slot: '${slotName}'`);
};

const warnCustomValidator = slotName => {
  warn(`Invalid slot: custom validator check failed for slot '${slotName}'`);
};

export const mixin = {
  created() {
    if (!this.$options.slots) {
      return;
    }

    if (this.$options.slots === true) {
      if ('default' in this.$slots === false) {
        warnRequire('default');
      }
    }

    if (Array.isArray(this.$options.slots)) {
      this.$options.slots.forEach(slotName => {
        if (slotName in this.$slots === false) {
          warnRequire(slotName);
        }
      });
    }

    if (typeof this.$options.slots === 'object') {
      Object.keys(this.$options.slots).forEach(slotName => {
        const option = this.$options.slots[slotName];
        if (option.required === true) {
          if (slotName in this.$slots === false) {
            warnRequire(slotName);
          }
        }
        const validator = option.validator;
        if (typeof validator === 'function') {
          if (validator(this.$slots[slotName]) === false) {
            warnCustomValidator(slotName);
          }
        }
      });
    }
  },
};
