<template>
  <div>
    <MainLayout>
      <router-view></router-view>
    </MainLayout>
  </div>
</template>

<script lang="ts">
import MainLayout from '@/layout/MainLayout.vue';
import { defineComponent } from 'vue';
export default defineComponent({
  components: { MainLayout },
  setup() {
    return {};
  },
});
</script>
<style></style>
