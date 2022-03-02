<template>
  <div>
    <div class="profile_wrap">
      <ImgUpload id="profile" v-bind="$attrs"
        ><template #label><label for="profile"></label></template
      ></ImgUpload>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import ImgUpload from "@/components/ImgUpload.vue";

export default defineComponent({
  components: { ImgUpload },
  setup() {
    const src = ref<string>("");
    return { src };
  },
});
</script>

<style lang="scss" scoped>
.profile_wrap {
  width: 30%;
  height: 100%;
  outline: 1px solid #f00;
}
</style>
