<template>
  <div>
    <AuthNavi :tabs="tabs" @clickTab="clickTab"></AuthNavi>
    <!-- <Login v-if="getTabs === '로그인'"></Login>
    <Join v-else-if="getTabs === '회원가입'"></Join> -->
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import AuthNavi from '@/components/AuthNavi.vue';
export default defineComponent({
  components: { AuthNavi },
  setup() {
    const tabs = ref<string[]>(['로그인', '회원가입']);
    const getTabs = ref<string>('로그인');
    const clickTab = (tabs: string) => {
      getTabs.value = tabs;
    };
    return { tabs, getTabs, clickTab };
  },
});
</script>

<style></style>
