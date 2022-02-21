<template>
  <button :style="btn.style ? btn.style : ''" @click="emit(btn.event)"><slot></slot></button>
</template>

<script lang="ts">
import { defineComponent, ref, PropType } from 'vue';

import { btnType } from '@/types/index';
export default defineComponent({
  props: {
    category: {
      type: String,
    },
    setBtn: {
      type: Object as PropType<btnType>,
      default: () => {
        return { style: {}, class: '', event: '' };
      },
    },
  },
});
</script>
<style lang="scss" scoped>
button {
  color: #000;
  text-align: center;
}
</style>
