<template>
  <div>
    <div>
      <PostStore v-bind="$attrs" :classes="buttonClass" :storeList="storeList"></PostStore>
    </div>
    <div><PostWrite v-bind="$attrs" :classes="buttonClass"></PostWrite></div>
  </div>
</template>

<script lang="ts">
import PostWrite from '@/components/PostWrite.vue';
import PostStore from '@/components/PostStore.vue';
import { response } from '@/constant/todayList';
import { defineComponent, ref } from 'vue';

export default defineComponent({
  components: { PostWrite, PostStore },
  setup() {
    const storeList = ref(response.list);
    const buttonClass = ref({ like: true, keep: true });
    return { buttonClass, storeList };
  },
});
</script>

<style lang="scss" scoped></style>
