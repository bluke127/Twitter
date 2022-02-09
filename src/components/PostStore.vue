<template>
  <ul>
    <li v-for="(post, index) in storeList" :key="index"><PostInput></PostInput></li>
  </ul>
</template>

<script lang="ts">
import PostInput from '@/components/PostInput.vue';
import { defineComponent, ref, PropType } from 'vue';

export default defineComponent({
  components: { PostInput },
  props: { storeList: { type: Array as PropType<string[]> } },
  // setup() {
  //   const writeValue = ref<string>();
  //   return { writeValue };
  // },
});
</script>

<style></style>
