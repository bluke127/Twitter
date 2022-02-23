<template>
  <div>
    <BaseLabel>s</BaseLabel><BaseInput v-model="writeValue"></BaseInput
    ><BaseButton :setBtn="setLikeBtn"></BaseButton>
  </div>
</template>

<script lang="ts">
import BaseLabel from '@/components/BaseLabel.vue';
import BaseInput from '@/components/BaseInput.vue';
import BaseButton from '@/components/BaseButton.vue';
import { btnType } from '@/types/index';
import { defineComponent, ref, reactive } from 'vue';

export default defineComponent({
  components: { BaseInput, BaseButton, BaseLabel },
  setup() {
    const writeValue = ref<string>('');
    const setLikeBtn = reactive<btnType>({ class: 'unLike', event: 'like' });
    const setReplyBtn = reactive<btnType>({ class: 'reply', event: 'reply' });
    const setKeepBtn = reactive<btnType>({ class: 'keep', event: 'keep' });
    return { writeValue, setLikeBtn, setReplyBtn, setKeepBtn };
  },
});
</script>

<style></style>
