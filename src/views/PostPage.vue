<template>
  <div>
    <div><PostWrite></PostWrite></div>
    <div><PostStore></PostStore></div>
  </div>
</template>

<script lang="ts">
import PostWrite from '@/components/PostWrite.vue';
import PostStore from '@/components/PostStore.vue';
import { defineComponent, ref } from 'vue';

export default defineComponent({
  components: { PostWrite, PostStore },
  // setup() {
  //   const category = ref<string>('');
  //   return { category };
  // },
});
</script>

<style></style>
