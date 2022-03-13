<template>
  <MainLayout>
    <template #side_menu>
      <side-menu></side-menu>
    </template>
    <router-view></router-view>
  </MainLayout>
</template>

<script lang="ts">
import MainLayout from '@/layout/MainLayout.vue';
import SideMenu from '@/components/Side.vue';
import { defineComponent } from 'vue';
export default defineComponent({
  components: { MainLayout, SideMenu },
  setup() {
    return {};
  },
});
</script>
<style>
.main {
  display: flex;
}
</style>
