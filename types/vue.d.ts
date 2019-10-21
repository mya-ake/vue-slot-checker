import Vue from "vue";
import { SlotsDefinition } from './slot-checker'

declare module "vue/types/options" {
  interface ComponentOptions<V extends Vue> {
    slots?: SlotsDefinition;
  }
}
