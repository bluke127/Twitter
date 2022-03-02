<template>
  <div class="base_input" v-if="type !== 'file'">
    <input
      :type="type"
      :placeholder="placeholder"
      :readonly="readonly"
      :value="modelValue"
      :style="styles"
      @input="$emit('update:modelValue', $event.target.value)"
      @focus="$emit('focus')"
      @blur="$emit('blur')"
    />
    <slot name="label"></slot>
  </div>
  <template v-else-if="type === 'file'">
    <input
      :type="type"
      :readonly="readonly"
      :style="styles"
      @focus="$emit('focus')"
      @blur="$emit('blur')"
      v-bind="$attrs"
    />
    <slot name="label"></slot>
  </template>
</template>

<script lang="ts">
import { defineComponent, toRef, PropType } from "vue";
export default defineComponent({
  inheritAttrs: false,
  props: {
    styles: {
      type: Object as PropType<{ CSSProperties: string | number }>,
      default: () => {
        return {};
      },
    },
    labelStyle: {
      type: Object as PropType<{ CSSProperties: string | number }>,
      default: () => {
        return {};
      },
    },
    type: { type: String, default: "text", required: false },
    placeholder: { type: String, required: false, default: "" },
    readonly: { type: Boolean },
    modelValue: { type: String, required: false, default: "" },
  },
  setup() {
    // const value = toRef(props, 'modelValue');
    // return { value };
  },
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
