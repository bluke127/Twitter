<template>
  <div
    class="popup_wrap"
    @click.self="store.dispatch('popup/SET_POPUP', false)"
  >
    <div class="popup">
      <div class="popup_top">{{ top }}</div>
      <div class="popup_body">
        <span>{{ body }}</span>
      </div>
      <div class="btn_wrap">
        <BaseButton v-if="confirmMsg" @click="$emit('confirm')">{{
          confirmMsg
        }}</BaseButton
        ><BaseButton
          v-if="cancelMsg"
          class="unActive"
          @click="$emit('close')"
          >{{ cancelMsg }}</BaseButton
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from 'vue';
import type { defaultPopup } from '@/types/index';
import BaseButton from '@/components/BaseButton.vue';
import { useStore } from 'vuex';
export default defineComponent({
  components: { BaseButton },
  props: {
    confirm: {
      type: Object as PropType<defaultPopup['confirm']>,
      default: () => {
        return { msg: '' };
      },
    },
    confirmMsg: {
      type: String,
      default: '',
    },
    cancel: {
      type: Object as PropType<defaultPopup['cancel']>,
      default: () => {
        return { msg: '' };
      },
    },
    cancelMsg: {
      type: String,
      default: '',
    },
    top: {
      type: String,
      default: '',
    },
    body: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    const store = useStore();
    const setBtnWidth = computed(() => {
      return `${
        100 /
        [props.confirmMsg, props.confirmMsg].filter(text => {
          return text !== '';
        }).length
      }%`;
    });
    return { setBtnWidth, store };
  },
});
</script>

<style lang="scss" scoped>
.popup_wrap {
  width: 100%;
  height: 100%;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  left: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 3;
  .popup {
    width: 65vw;
    min-height: 30vh;
    max-height: 50vh;
    background-color: #fff;
    position: relative;
    display: flex;
    flex-direction: column;
    .popup_top {
      padding-left: 20px;
      line-height: 7vh;
      color: #000;
      background-color: rgba(190, 190, 190, 0.4);
    }
    .popup_body {
      display: flex;
      justify-content: center;
      align-items: center;
      flex: 1;
    }
    .btn_wrap {
      width: 100%;
      display: flex;
      justify-content: space-between;
      button {
        width: v-bind(setBtnWidth);
        background-color: goldenrod;
        color: #fff;
        &.unActive {
          background-color: lightgray;
          color: #000;
        }
      }
    }
  }
}
</style>
