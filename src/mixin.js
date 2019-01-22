import { warn, noop } from './debug';

export const buidMixin = ({ silent = false } = {}) => {
  let warnLog = silent ? noop : warn;

  const warnRequire = (slotName, vm) => {
    warnLog(`Missing required slot: '${slotName}'`, vm);
  };

  const warnCustomValidator = (slotName, vm) => {
    warnLog(
      `Invalid slot: custom validator check failed for slot '${slotName}'`,
      vm,
    );
  };

  return {
    created() {
      if (!this.$options.slots) {
        return;
      }

      if (this.$options.slots === true) {
        if ('default' in this.$slots === false) {
          warnRequire('default', this);
        }
      }

      if (Array.isArray(this.$options.slots)) {
        this.$options.slots.forEach(slotName => {
          if (slotName in this.$slots === false) {
            warnRequire(slotName, this);
          }
        });
      }

      if (typeof this.$options.slots === 'object') {
        Object.keys(this.$options.slots).forEach(slotName => {
          const option = this.$options.slots[slotName];
          if (option.required === true) {
            if (slotName in this.$slots === false) {
              warnRequire(slotName, this);
            }
          }
          const validator = option.validator;
          if (typeof validator === 'function') {
            if (validator(this.$slots[slotName]) === false) {
              warnCustomValidator(slotName, this);
            }
          }
        });
      }
    },
  };
};
