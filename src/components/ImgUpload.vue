<template>
  <div>
    <BaseInput :type="'file'" :id="$attrs.id" ref="insertFile"
      ><template #label
        ><label
          :for="$attrs.id"
          :labelStyle="labelStyle"
          @click="upload"
        ></label></template
    ></BaseInput>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, useAttrs } from "vue";
import BaseInput from "@/components/BaseInput.vue";

export default defineComponent({
  inheritAttrs: false,
  components: { BaseInput },
  setup(props, { attrs }) {
    const src = ref<string>("");
    const insertFile = ref(null);
    const upload = () => {
      // insertFile.value?.click();
    };
    const labelStyle = ref<{ CSSProperties: string | number } | null>(null);
    return { src, upload, insertFile, labelStyle };
  },
});
</script>

<style lang="scss" scoped>
div {
  label {
    width: 100px;
    height: 100px;
    border-radius: 50px;
    cursor: pointer;
    background: red;
    display: inline-block;
  }
  ::v-deep {
    #profile {
      background: blue;
      display: none;
    }
  }
}
</style>
