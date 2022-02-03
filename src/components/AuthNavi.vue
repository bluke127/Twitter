<template>
  <div class="auth_navi_wrap">
    <ul>
      <li
        class="auth_navi_tab"
        v-for="(tabs, index) in tabs"
        :key="index"
        @click="emit('clickTab', tabs)"
      >
        {{ tabs }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  components: {},
  props: { tabs: { type: Array, required: true } },
  setup() {
    return {};
  },
});
</script>

<style></style>
