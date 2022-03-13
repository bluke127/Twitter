<template>
  <BaseTextarea
    v-if="!readonly"
    v-model="writeValue"
    @change="$emit('update:modelValue', writeValue)"
    :readonly="readonly"
  ></BaseTextarea>

  <BaseTextarea
    v-else-if="readonly"
    v-model="store"
    :readonly="readonly"
  ></BaseTextarea>
  <slot name="btn"> </slot>
</template>

<script lang="ts">
import BaseTextarea from '@/components/BaseTextarea.vue';
import { btnType } from '@/components/BaseButton.vue';
import { defineComponent, ref, toRef, PropType } from 'vue';
export default defineComponent({
  inheritAttrs: false,
  components: { BaseTextarea },
  props: {
    classes: {
      type: Object as PropType<btnType>,
      default: () => {},
    },
    readonly: {
      type: Boolean as PropType<boolean>,
      default: true,
    },
    modelValue: {
      type: String as PropType<string>,
      required: false,
      default: '',
    },
    storeValue: {
      type: String as PropType<string>,
      required: false,
      default: '',
    },
  },
  setup(props) {
    const store = toRef(props, 'storeValue');
    const writeValue = ref<string>('');
    const classes = toRef(props, 'classes');
    const setCheckBtn = () => {
      if (writeValue.value) {
        classes.value.check = true;
      } else if (!writeValue.value) {
        classes.value.check = false;
      }
    };
    return { setCheckBtn, writeValue, store };
  },
});
</script>
<style lang="scss" scoped>
.btn_wrap {
  button {
    width: 30px;
    height: 30px;
    background-size: 700px 600px;
    background-attachment: initial;
    background-origin: initial;
    background-clip: initial;
    background-color: initial;
    background-image: url('~@/assets/images/icon/gather.png');
    &.unCheck {
      background-position: $unCheck;
    }
    &.check {
      background-position: $check;
    }
  }
}
</style>
