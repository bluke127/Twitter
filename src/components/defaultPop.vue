<template>
  <div id="popWrap" @click.self="close">
    <div id="pop">
      <div id="popInner">
        <div id="text">
          <p id="title">{{ popSet.title }}</p>
          <p id="passage">{{ popSet.passage }}</p>
        </div>
      </div>
      <div id="btnWrap">
        <button id="confirm" :class="{ twin: popSet.concelMsg }" @click="confirm()">
          {{ popSet.confirmMsg }}
        </button>
        <button
          v-if="popSet.concelMsg"
          :class="{ twin: popSet.concelMsg }"
          id="concel"
          @click="close()"
        >
          {{ popSet.concelMsg }}
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, PropType } from 'vue';
import type { popupSet } from '@/views/Login.vue';
export default defineComponent({
  props: {
    popSet: {
      type: Object as PropType<popupSet>,
      default: () => {
        return {
          confirmMsg: '',
        };
      },
    },
  },
  setup(props, context) {
    const confirmMsg = ref<string>('확인' || props.popSet.confirmMsg);
    const close = () => {
      alert();
      context.emit('close');
    };
    const confirm = () => {
      close();
    };
    return { confirmMsg, close, confirm };
  },
});
</script>

<style scoped>
#popWrap {
  width: 100%;
  background-color: rgba(200, 200, 200, 0.5);
  border-radius: 15px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-content: center;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
#pop {
  min-width: 500px;
  min-height: 300px;
  width: 50%;
  background-color: #fff;
}
#popInner {
  width: 50%;
  margin: 0 auto;
  color: #000;
}
#text {
  width: 100%;
}
#title {
  line-height: 30vh;
}
#passage {
  line-height: 30vh;
}
#btnWrap {
  width: 100%;
  display: flex;
}
#btnWrap button {
  width: 100%;
  line-height: 50px;
  border: none;
  font-size: 32px;
  color: #000;
}
#btnWrap button#confirm {
  background: salmon;
}
#btnWrap button.twin {
  width: 50%;
}
</style>
