<template>
  <div>
    <div><Post :category="'write'"></Post></div>
    <div><Post :category="'store'"></Post></div>
  </div>
</template>

<script lang="ts">
import Post from '@/components/Post.vue';
import { defineComponent, ref } from 'vue';

export default defineComponent({
  components: { Post },
  setup() {
    const category = ref<string>('');
    return { category };
  },
});
</script>

<style></style>
