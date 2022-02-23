<template>
  <ul>
    <li v-for="(post, index) in list" :key="index">
      <div><img src="" /></div>
      <BaseInput></BaseInput><BaseButton :setBtn="setLikeBtn"></BaseButton
      ><BaseButton :setBtn="setReplyBtn"></BaseButton>
      <BaseButton :setBtn="setKeepBtn"></BaseButton>
    </li>
  </ul>
</template>

<script lang="ts">
// import BaseLabel from '@/components/BaseLabel.vue';
import BaseInput from '@/components/BaseInput.vue';
import BaseButton from '@/components/BaseButton.vue';
import { response, responseListType } from '@/constant/todayList';
import { btnType } from '@/types/index';
import { defineComponent, PropType, ref, reactive } from 'vue';

export default defineComponent({
  components: { BaseInput, BaseButton },
  props: { storeList: { type: Array as PropType<string[]> } },
  setup() {
    const list = ref<responseListType | null>(response.list);
    const writeValue = ref<string>('');
    const setLikeBtn = reactive<btnType>({ class: 'like', event: 'like' });
    const setReplyBtn = reactive<btnType>({ class: 'reply', event: 'reply' });
    const setKeepBtn = reactive<btnType>({ class: 'keep', event: 'keep' });
    return { list, writeValue, setLikeBtn, setReplyBtn, setKeepBtn };
  },
});
</script>

<style></style>
