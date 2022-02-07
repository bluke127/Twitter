<template>
  <div v-if="category === 'write'"><BaseText></BaseText></div>
  <ul v-if="category === 'store'">
    <li v-for="(post, index) in storeList" :key="index"><BaseText></BaseText></li>
  </ul>
</template>

<script lang="ts">
import BaseText from '@/components/BaseText.vue';
import { defineComponent, ref, computed, watchEffect, PropType } from 'vue';

export default defineComponent({
  components: { BaseText },
  props: { category: { type: String }, storeList: { type: Array as PropType<string[]> } },
  setup(props) {},
});
</script>

<style></style>
