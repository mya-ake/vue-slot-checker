/* eslint-disable no-unused-vars */
import Vue, { ComponentOptions } from 'vue';
import VueSlotChcker, { vueSlotCheckerMixin } from '../../src/index';

Vue.use(VueSlotChcker);

const Mixin: ComponentOptions<Vue> = {
  mixins: [vueSlotCheckerMixin],
};

const BooleanSlots: ComponentOptions<Vue> = {
  slots: true,
};

const ArraySlots: ComponentOptions<Vue> = {
  slots: ['default'],
};

const RecordSlots: ComponentOptions<Vue> = {
  slots: {
    default: {
      required: true,
    },
  },
};

const ValidatorRecordSlots: ComponentOptions<Vue> = {
  slots: {
    default: {
      validator() {
        return true;
      },
    },
    header: {
      validator(slots) {
        if (typeof slots === 'undefined') {
          return false;
        }
        return (
          typeof slots[0].tag === 'undefined' &&
          typeof slots[0].text === 'string'
        );
      },
    },
  },
};
