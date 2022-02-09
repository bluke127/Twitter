<template>
  <div><PostInput v-model="writeValue"></PostInput><BaseButton :btn="setLikeBtn"></BaseButton></div>
</template>

<script lang="ts">
import PostInput from '@/components/PostInput.vue';
import BaseButton from '@/components/BaseButton.vue';
import { btnType } from '@/types/index';
import { defineComponent, ref, PropType, reactive } from 'vue';

export default defineComponent({
  components: { PostInput, BaseButton },
  setup() {
    const writeValue = ref<string>('');
    const btnDefaultStyle = ref<{ [key: string]: string | number }>({
      width: '35px',
      height: '35px',
      backgroundRepeat: 'noRepeat',
      backgroundSize: 'cover',
      // backgroundImage: "`url(required('~@/assets/icon/gather.png'))`",
    });
    const setLikeBtn = reactive<btnType>({ style: btnDefaultStyle.value, event: 'like' });
    const setReplyBtn = reactive<btnType>({ style: btnDefaultStyle.value, event: 'reply' });
    const setKeepBtn = reactive<btnType>({ style: btnDefaultStyle.value, event: 'keep' });
    return { writeValue, btnDefaultStyle, setLikeBtn, setReplyBtn, setKeepBtn };
  },
});
</script>

<style></style>
