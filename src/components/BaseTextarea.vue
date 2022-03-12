<template>
  <textarea
    :placeholder="placeholder"
    :readonly="readonly"
    :value="modelValue"
    :style="styles"
    v-bind="$attrs"
    @input="$emit('update:modelValue', $event.target.value)"
  ></textarea>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
export default defineComponent({
  inheritAttrs: false,
  props: {
    styles: {
      type: Object as PropType<{ CSSProperties: string | number }>,
      default: () => {
        return {};
      },
    },
    placeholder: { type: String, required: false, default: '' },
    readonly: { type: Boolean },
    modelValue: {
      type: String as PropType<string>,
      required: false,
    },
  },
  setup() {},
});
</script>

<style lang="scss">
textarea {
  width: 100%;
  resize: none;
  ::placeholder {
    color: #434343;
    font-weight: 900;
  }
}
</style>
