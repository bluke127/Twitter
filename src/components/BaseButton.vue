<template>
  <button
    :style="setBtn.style ? setBtn.style : ''"
    @click="emit(btn.event)"
    :class="setBtn.class ? setBtn.class : ''"
  >
    <slot></slot>
  </button>
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
.unLike {
  width: 30px;
  height: 25px;
  background: url('~@/assets/images/icon/gather.png') 0 0 no-repeat;
  background-position: $unLike;
  background-size: 700px 600px;
  background-attachment: initial;
  background-origin: initial;
  background-clip: initial;
  background-color: initial;
}
</style>
