<template>
  <div>
    <Main>
      <router-view></router-view>
    </Main>
  </div>
</template>

<script lang="ts">
import Main from '@/layout/Main.vue';
import { defineComponent } from 'vue';
export default defineComponent({
  components: { Main },
  setup() {
    return {};
  },
});
</script>
<style></style>
