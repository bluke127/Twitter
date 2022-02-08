<template>
  <input
    :value="modelValue"
    cols="30"
    rows="5"
    @input="$emit('update:modelValue', $event.target.value)"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    modelValue: { type: String, required: false },
  },
});
</script>

<style lang="scss" scoped></style>
