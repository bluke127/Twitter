<template>
  <div v-if="category === 'write'"><BaseText v-model="writeValue"></BaseText></div>
  <ul v-if="category === 'store'">
    <li v-for="(post, index) in storeList" :key="index"><BaseText></BaseText></li>
  </ul>
</template>

<script lang="ts">
import BaseText from '@/components/BaseText.vue';
import { defineComponent, ref, PropType } from 'vue';

export default defineComponent({
  components: { BaseText },
  props: { category: { type: String }, storeList: { type: Array as PropType<string[]> } },
  setup(props) {
    const writeValue = ref<string>();
    return { writeValue };
  },
});
</script>

<style></style>
