<template>
  <ul>
    <li v-for="(post, index) in storeList" :key="index">
      <BaseInput><template #:label>후후</template></BaseInput>
    </li>
  </ul>
  <div class="btn_wrap">
    <BaseButton
      @click="setLikeBtn"
      @mouseenter="setLikeBtn"
      @mouseleave="setLikeBtn"
      :class="classes.like ? 'like' : 'unLike'"
      v-bind="$attrs"
    ></BaseButton>
    <!-- <BaseButton
      @click="setReplyBtn"
      @mouseenter="setReplyBtn"
      @mouseleave="setReplyBtn"
      class="reply"
      v-bind="$attrs"
    ></BaseButton> -->
    <BaseButton
      @click="setKeepBtn"
      @mouseenter="setKeepBtn"
      @mouseleave="setKeepBtn"
      :class="classes.keep ? 'keep' : 'unKeep'"
      v-bind="$attrs"
    ></BaseButton>
  </div>
</template>

<script lang="ts">
import BaseInput from '@/components/BaseInput.vue';
import BaseButton, { btnType } from '@/components/BaseButton.vue';
import { defineComponent, PropType, ref, toRef } from 'vue';
export default defineComponent({
  inheritAttrs: false,
  props: {
    storeList: {
      type: Array,
      default: () => [],
    },
    classes: {
      type: Object as PropType<btnType>,
      default: () => {},
    },
  },
  components: { BaseInput, BaseButton },

  setup(props) {
    const writeValue = ref<string>('');
    const classes = toRef(props, 'classes');
    const setLikeBtn = () => {
      classes.value.like = !classes.value.like;
    };
    const setKeepBtn = () => {
      classes.value.keep = !classes.value.keep;
    };
    return { writeValue, setLikeBtn, setKeepBtn };
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
    &.unLike {
      background-position: $unLike;
    }

    &.like {
      background-position: $like;
    }
    &.keep {
      background-position: $keep;
    }

    &.unKeep {
      background-position: $unKeep;
    }
  }
}
</style>
