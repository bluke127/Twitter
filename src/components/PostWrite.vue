<template>
  <div>
    <BaseInput v-model="writeValue"></BaseInput><BaseButton :setBtn="setLikeBtn"></BaseButton>
  </div>
</template>

<script lang="ts">
import BaseInput from '@/components/BaseInput.vue';
import BaseButton from '@/components/BaseButton.vue';
import { btnType, styleType } from '@/types/index';
import { defineComponent, ref, PropType, reactive } from 'vue';

export default defineComponent({
  components: { BaseInput, BaseButton },
  setup() {
    const writeValue = ref<string>('');
    const setLikeBtn = reactive<btnType>({ class: 'like', event: 'like' });
    const setReplyBtn = reactive<btnType>({ class: 'reply', event: 'reply' });
    const setKeepBtn = reactive<btnType>({ class: 'keep', event: 'keep' });
    return { writeValue, setLikeBtn, setReplyBtn, setKeepBtn };
  },
});
</script>

<style></style>
