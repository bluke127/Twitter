<template>
  <component v-bind="$attrs" :is="componentType" :class="classes">
    <slot></slot>
  </component>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { knownKeyBooleanValObj } from '@/types/index';
export type btnType = knownKeyBooleanValObj;
export default defineComponent({
  inheritAttrs: false,
  props: {
    category: {
      type: String,
    },
    classes: {
      type: Object as PropType<btnType>,
      default: () => {
        null;
      },
    },
    componentType: { type: String, default: 'button' },
  },
});
</script>
<style lang="scss" scoped>
button {
  color: #000;
  text-align: center;
  cursor: pointer;
}
</style>
