<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<style lang="scss">
@import 'assets/styles/init.scss';
#app {
  font-family: NanumSquareB;
  font-style: normal;
  font-weight: 400;
  font-display: swap;
}
</style>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({});
</script>
