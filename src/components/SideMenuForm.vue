<template>
  <div>
    <side-menu v-if="sideMenuFlag"></side-menu>
  </div>
</template>

<script lang="ts">
import SideMenu from './SideMenu.vue';
import { defineComponent, computed } from 'vue';
import { useStore } from 'vuex';
export default defineComponent({
  components: { SideMenu },
  setup() {
    const store = useStore();
    const sideMenuFlag = computed(() => {
      return store.state.menu.ShowSideMenuFlag;
    });
    return { store, sideMenuFlag };
  },
});
</script>

<style lang="scss"></style>
