import { VNode, PluginObject } from 'vue';

type SlotValidator =
  | {
    required: boolean;
    }
  | {
    validator: (slots: VNode[] | undefined) => boolean;
    };
type BooleanSlotsDefinition = boolean;
type ArraySlotsDefinition = string[];
type RecordSlotsDefinition = {
  default: SlotValidator;
  [key: string]: SlotValidator;
};

export type SlotsDefinition =
  | BooleanSlotsDefinition
  | ArraySlotsDefinition
  | RecordSlotsDefinition;

export type VueSlotCheckerOption = {
  slient?: boolean;
};

export type VueSlotCheckerPlugin = PluginObject<VueSlotCheckerOption>;

export declare const vueSlotChckerMixin: {
  created(): void;
};

