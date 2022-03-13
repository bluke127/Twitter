<template>
  <MainLayout>
    <template #side_menu>
      <side-menu v-if="!$isMobile()"></side-menu>
      <MobileSide v-else-if="$isMobile()"></MobileSide>
    </template>
    <router-view class="main_inner"></router-view>
  </MainLayout>
</template>

<script lang="ts">
import MainLayout from '@/layout/MainLayout.vue';
import SideMenu from '@/components/Side.vue';
import MobileSide from '@/components/Mobile/MobileSide.vue';
import { defineComponent } from 'vue';
export default defineComponent({
  components: { MainLayout, SideMenu, MobileSide },
  setup() {
    return {};
  },
});
</script>
<style lang="scss" scoped>
::v-deep {
  main {
    display: flex;
    width: 100%;
    .main_inner {
      flex: 1;
    }
  }
}

@include tablet {
  ::v-deep {
    main {
      flex-direction: column;
    }
  }
}
@include mobile {
  ::v-deep {
    main {
      flex-direction: column;
    }
  }
}
</style>
