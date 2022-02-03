<template>
  <div class="main_wrap">
    <MainHeader class="header_wrap"></MainHeader>
    <main><slot></slot></main>
    <MainFooter></MainFooter>
  </div>
</template>

<script lang="ts">
import MainHeader from '@/components/Header.vue';
import MainFooter from '@/components/Footer.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  components: { MainHeader, MainFooter },
});
</script>

<style lang="scss">
.main_wrap {
  width: 640px;
  margin: 87px auto 0;
  .header_wrap {
    width: 640px;
    position: fixed;
    top: 0;
    z-index: 1;
  }
}
</style>
