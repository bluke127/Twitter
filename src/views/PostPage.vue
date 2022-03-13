<template>
  <div class="post_wrap">
    <ul class="post_store_wrap">
      <li v-for="(post, index) in storeList" :key="index">
        <Post :readonly="true" :storeValue="post.content"
          ><template #btn>
            <div class="btn_wrap">
              <BaseButton
                @click="
                  setLikeBtn(index, buttonClass.storeBtnClass[index].like)
                "
                :class="
                  buttonClass.storeBtnClass[index].like ? 'like' : 'unLike'
                "
                v-bind="$attrs"
              ></BaseButton>
              <span v-if="post.like">
                {{ post.like }}
              </span>
              <BaseButton
                @click="setKeepBtn(index)"
                :class="
                  buttonClass.storeBtnClass[index].keep ? 'keep' : 'unKeep'
                "
                v-bind="$attrs"
              ></BaseButton>
            </div> </template
        ></Post>
      </li>
    </ul>
    <div class="post_write_wrap">
      <Post class="post_write" v-model="writeValue" :readonly="false">
        <template #btn>
          <div class="btn_wrap">
            <BaseButton
              :class="buttonClass.check ? 'check' : 'unCheck'"
              v-bind="$attrs"
            ></BaseButton>
          </div>
        </template>
      </Post>
    </div>
  </div>
</template>

<script lang="ts">
import Post from '@/components/Post.vue';
import BaseButton from '@/components/BaseButton.vue';
import { defineComponent, onBeforeMount, ref } from 'vue';
import { response } from '@/constant/todayList';

export default defineComponent({
  components: { BaseButton, Post },
  setup() {
    const writeValue = ref<string>('');
    const storeList = ref(response.list);
    const buttonClass = ref<{
      storeBtnClass: { like: boolean; keep: boolean }[];
      check: boolean;
    }>({
      storeBtnClass: [],
      check: true,
    });
    const setLikeBtn = (i: number, likeFlag: boolean) => {
      // if(e && e.type==='click'){
      // buttonClass.value.storeBtnClass[i].like =
      // !buttonClass.value.storeBtnClass[i].like;
      // }
      buttonClass.value.storeBtnClass[i].like =
        !buttonClass.value.storeBtnClass[i].like;
      controlLike(i, likeFlag);
    };
    const setKeepBtn = (i: number) => {
      buttonClass.value.storeBtnClass[i].keep =
        !buttonClass.value.storeBtnClass[i].keep;
    };
    const setCheckBtn = () => {
      if (writeValue.value) {
        buttonClass.value.check = false;
      } else if (!writeValue.value) {
        buttonClass.value.check = true;
      }
    };
    const controlLike = (i: number, like: boolean) => {
      if (like) {
        storeList.value[i].like = storeList.value[i].like + 1;
      } else {
        storeList.value[i].like = storeList.value[i].like - 1;
      }
    };
    onBeforeMount(() => {
      console.log(ref());
      storeList.value.forEach((e, i) => {
        buttonClass.value.storeBtnClass.push({ like: true, keep: true });
      });
    });
    return {
      buttonClass,
      storeList,
      writeValue,
      setLikeBtn,
      setKeepBtn,
      setCheckBtn,
      controlLike,
    };
  },
});
</script>

<style lang="scss" scoped>
.post_wrap {
  flex: 1;
  .post_store_wrap,
  .post_write_wrap {
    width: 60%;
    li {
      margin-bottom: 1%;
    }

    ::v-deep textarea {
      width: 100%;
      padding: 16px;
      min-height: 10vh;
      border-radius: 20px;
      display: flex;
    }
  }

  .btn_wrap {
    button {
      width: 30px;
      height: 30px;
      background-size: 700px 600px;
      background-attachment: initial;
      background-origin: initial;
      background-clip: initial;
      background-color: initial;
      background-image: url('~@/assets/images/icon/gather.png');
      &.unLike {
        background-position: $unLike;
      }

      &.like {
        background-position: $like;
      }
      &.keep {
        background-position: $keep;
      }

      &.unKeep {
        background-position: $unKeep;
      }
      &.unCheck {
        background-position: $unCheck;
      }
      &.check {
        background-position: $check;
      }
    }
  }
}
</style>
