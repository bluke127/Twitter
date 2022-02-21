<template>
  <div class="header_wrap">
    <div id="title" @click="openSide">
      <!-- Twitter<span><img :src="require('@/assets/images/logo.png')" alt="logo" ref="logo" /></span> -->
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
  setup() {
    const store = useStore();
    const openSide = () => {
      store.dispatch('menu/SET_SIDEMENU', true);
    };
    return { store, openSide };
  },
});
</script>

<style lang="scss" scoped>
.header_wrap {
  width: 640px;
  position: fixed;
  top: 0;
  z-index: 1;
  #title {
    height: 15vh;
    font-size: 50px;
    color: #fff;
  }
  #title span {
    height: 100%;
    overflow: hidden;
    display: inline-block;
    vertical-align: middle;
  }
  #title img {
    height: 70%;
    max-width: 100%;
  }
}
</style>
