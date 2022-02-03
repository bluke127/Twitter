<template>
  <div class="base_input">
    <input
      :type="type"
      :placeholder="placeholder"
      :readonly="readonly"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      @focus="$emit('focus')"
      @blur="$emit('blur')"
    />
    <span><slot name="label"></slot></span>
  </div>
</template>

<script lang="ts">
import { defineComponent, toRef } from 'vue';
export default defineComponent({
  props: {
    type: { type: String, default: 'text', required: false },
    placeholder: { type: String, required: false, default: '' },
    readonly: { type: Boolean },
    modelValue: { type: String, required: false, default: '' },
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
  input {
    ::placeholder {
      color: #434343;
      font-weight: 900;
    }
  }
}
</style>
