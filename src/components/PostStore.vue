<template>
  <ul>
    <li v-for="(post, index) in storeList" :key="index"><BaseInput></BaseInput></li>
  </ul>
</template>

<script lang="ts">
import BaseInput from '@/components/BaseInput.vue';
import { defineComponent, ref, PropType } from 'vue';

export default defineComponent({
  components: { BaseInput },
  props: { storeList: { type: Array as PropType<string[]> } },
  // setup() {
  //   const writeValue = ref<string>();
  //   return { writeValue };
  // },
});
</script>

<style></style>
