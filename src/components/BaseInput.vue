<template>
  <div class="base_input" v-bind="$attrs">
    <input
      :type="type"
      :placeholder="placeholder"
      :readonly="readonly"
      :value="modelValue"
      :style="styles"
      v-bind="$attrs"
      @input="$emit('update:modelValue', $event.target.value)"
    />
    <span> <slot name="label"></slot></span>
  </div>
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
    type: { type: String, default: 'text', required: false },
    placeholder: { type: String, required: false, default: '' },
    readonly: { type: Boolean },
    modelValue: { type: String, required: false, default: '' },
  },
  setup() {},
});
</script>

<style lang="scss">
.base_input {
  position: relative;
  span {
    font-size: 14px;
    position: absolute;
    right: 2%;
    top: 50%;
    transform: translateY(-50%);
    color: #000;
  }
  input {
    width: 100%;
    ::placeholder {
      color: #434343;
      font-weight: 900;
    }
  }
}
</style>
