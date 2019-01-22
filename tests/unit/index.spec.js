import { shallowMount, createLocalVue } from '@vue/test-utils';
import VueSlotChecker, { vueSlotChecker } from '@/index';

import SlotsTrue from '~fixtures/SlotsTrue';
import ArraySlots from '~fixtures/ArraySlots';
import ObjectSlots from '~fixtures/ObjectSlots';
import CustomValidator from '~fixtures/CustomValidator';

const buildMessage = slotName => {
  return `[vue-slot-checker warn]: Missing required slot: '${slotName}'`;
};

const buildMessageValidator = slotName => {
  return `[vue-slot-checker warn]: Invalid slot: custom validator check failed for slot '${slotName}'`;
};

const spyLog = jest.spyOn(console, 'error');
beforeEach(() => {
  spyLog.mockClear();
});

describe('Plugin', () => {
  const localVue = createLocalVue();
  localVue.use(VueSlotChecker);

  describe('SlotsTrue', () => {
    it('runs set slots', () => {
      shallowMount(SlotsTrue, {
        localVue,
        slots: {
          default: 'deafult slot',
        },
      });

      expect(spyLog).not.toHaveBeenCalled();
    });

    it('runs not set slots', () => {
      shallowMount(SlotsTrue, {
        localVue,
        slots: {},
      });

      expect(spyLog).toHaveBeenCalledWith(buildMessage('default'));
    });
  });

  describe('ArraySlots', () => {
    it('runs set slots', () => {
      shallowMount(ArraySlots, {
        localVue,
        slots: {
          default: 'deafult slot',
          header: 'header slot',
        },
      });

      expect(spyLog).not.toHaveBeenCalled();
    });

    it('runs not set slots', () => {
      shallowMount(ArraySlots, {
        localVue,
        slots: {},
      });

      expect(spyLog).toHaveBeenCalledTimes(2);
      expect(spyLog).toHaveBeenNthCalledWith(1, buildMessage('default'));
      expect(spyLog).toHaveBeenNthCalledWith(2, buildMessage('header'));
    });
  });

  describe('ObjectSlots', () => {
    it('runs set slots', () => {
      shallowMount(ObjectSlots, {
        localVue,
        slots: {
          default: 'deafult slot',
          header: 'header slot',
        },
      });

      expect(spyLog).not.toHaveBeenCalled();
    });

    it('runs not set slots', () => {
      shallowMount(ObjectSlots, {
        localVue,
        slots: {},
      });

      expect(spyLog).toHaveBeenCalledTimes(2);
      expect(spyLog).toHaveBeenNthCalledWith(1, buildMessage('default'));
      expect(spyLog).toHaveBeenNthCalledWith(2, buildMessage('header'));
    });
  });

  describe('CustomValidator', () => {
    it('runs set slots', () => {
      shallowMount(CustomValidator, {
        localVue,
        slots: {
          default: 'deafult slot',
          header: '<nav />',
        },
      });

      expect(spyLog).not.toHaveBeenCalled();
    });

    it('runs not set slots', () => {
      shallowMount(CustomValidator, {
        localVue,
        slots: {},
      });

      expect(spyLog).toHaveBeenCalledTimes(2);
      expect(spyLog).toHaveBeenNthCalledWith(
        1,
        buildMessageValidator('default'),
      );
      expect(spyLog).toHaveBeenNthCalledWith(
        2,
        buildMessageValidator('header'),
      );
    });

    it('runs invalid slots', () => {
      shallowMount(CustomValidator, {
        localVue,
        slots: {
          default: '<div />',
          header: 'header slot',
        },
      });

      expect(spyLog).toHaveBeenCalledTimes(2);
      expect(spyLog).toHaveBeenNthCalledWith(
        1,
        buildMessageValidator('default'),
      );
      expect(spyLog).toHaveBeenNthCalledWith(
        2,
        buildMessageValidator('header'),
      );
    });
  });
});

describe('Mixin', () => {
  describe('SlotsTrue', () => {
    it('runs set slots', () => {
      shallowMount(SlotsTrue, {
        slots: {
          default: 'deafult slot',
        },
        mixins: [vueSlotChecker],
      });

      expect(spyLog).not.toHaveBeenCalled();
    });

    it('runs not set slots', () => {
      shallowMount(SlotsTrue, {
        slots: {},
        mixins: [vueSlotChecker],
      });

      expect(spyLog).toHaveBeenCalledWith(buildMessage('default'));
    });
  });
});

describe('Option', () => {
  describe('silent', () => {
    it('runs not set slots, option', () => {
      const localVue = createLocalVue();
      localVue.use(VueSlotChecker, { silent: true });

      shallowMount(SlotsTrue, {
        slots: {},
        localVue,
      });

      expect(spyLog).not.toHaveBeenCalled();
    });

    it('runs not set slots, Vue.config.silent', () => {
      const localVue = createLocalVue();
      localVue.config.silent = true;
      localVue.use(VueSlotChecker);

      shallowMount(SlotsTrue, {
        slots: {},
        localVue,
      });

      expect(spyLog).not.toHaveBeenCalled();
    });
  });
});
