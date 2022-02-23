<template>
  <label class="base_label"><slot></slot></label>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
export default defineComponent({
  props: {
    styles: {
      type: Object as PropType<{ CSSProperties: string | number }>,
      default: () => {
        return {};
      },
    },
  },
});
</script>

<style lang="scss"></style>
