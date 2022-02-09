<template>
  <div class="main_wrap">
    <MainHeader class="header_wrap"></MainHeader>
    <main><slot></slot></main>
    <MainFooter></MainFooter>
    <SideMenu></SideMenu>
  </div>
</template>

<script lang="ts">
import MainHeader from '@/components/Header.vue';
import MainFooter from '@/components/Footer.vue';
import SideMenu from '@/components/SideMenu.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  components: { MainHeader, MainFooter, SideMenu },
});
</script>

<style lang="scss">
.main_wrap {
  width: 640px;
  margin: 0 auto;
  overflow: hidden;
  main {
    margin: 15vh auto 0;
  }
}
</style>
