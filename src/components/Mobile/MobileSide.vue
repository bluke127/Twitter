<template>
  <div>
    <div class="profile_wrap">
      <BaseInput
        :type="'file'"
        id="profile"
        class="profile"
        ref="insertFile"
        v-bind="$attrs"
        @change="upload"
        ><template #label
          ><label
            for="profile"
            ref="profileLabel"
            :style="{ backgroundImage: `url(${profileImg})` }"
          ></label></template
      ></BaseInput>
      <div>
        <p>모바일프로필</p>
        <BaseTextarea
          :readonly="!editFlag"
          :class="editFlag ? 'editing' : ''"
          v-model="profileInfo"
        ></BaseTextarea>
        <button @click="editFlag = !editFlag" class="edit_btn">
          {{ editFlag ? '저장' : '수정' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import BaseInput from '@/components/BaseInput.vue';
import BaseTextarea from '@/components/BaseTextarea.vue';

export default defineComponent({
  components: { BaseInput, BaseTextarea },
  setup() {
    const src = ref<string>('');
    const insertFile = ref(null);
    const profileImg = ref<string>('');
    const editFlag = ref<boolean>(false);
    const profileInfo = ref<string>('');
    const upload = (event: Event) => {
      const img = (event.target as HTMLInputElement).files;
      let reader = new FileReader();

      reader.onload = function (e) {
        console.log(e.target?.result);
        profileImg.value = e.target?.result as string;
      };
      reader.readAsDataURL(img![0]);
    };
    const labelStyle = ref<{ CSSProperties: string | number } | null>(null);
    return {
      src,
      upload,
      insertFile,
      labelStyle,
      profileImg,
      editFlag,
      profileInfo,
    };
  },
});
</script>

<style lang="scss" scoped>
.profile_wrap {
  width: 100%;
  height: 100%;
  outline: 1px solid #f00;
}
::v-deep {
  input {
    &.profile {
      display: none;
    }
  }
}
label {
  width: 100px;
  height: 100px;
  border-radius: 50px;
  cursor: pointer;
  background-color: red;
  background-size: cover;
  display: inline-block;
}
.edit_btn {
  background-color: yellow;
}
textarea {
  background-color: transparent;
  &.editing {
    background-color: #fff;
  }
}
</style>
