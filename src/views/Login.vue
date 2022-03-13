<template>
  <div>
    <div id="wrap">
      <div id="title">
        Twitter<span
          ><img
            :src="require('@/assets/images/logo.png')"
            alt="logo"
            ref="logo"
        /></span>
      </div>
      <div id="context">
        <BaseInput
          :styles="inputStyle"
          :placeholder="'카카오메일 아이디, 이메일, 전화번호'"
          v-model="id.idValue"
          @click.self="idLabelClick"
          @input="idLabelClick()"
          @blur="idLabelBlur"
          ><template v-slot:label v-if="id.idValue">
            <label class="label" @click="labelClick('id')">
              <span
                class="id_label"
                :class="!id.setIdValueBtn ? 'close' : ''"
              ></span>
            </label> </template
        ></BaseInput>
        <BaseInput
          :styles="inputStyle"
          v-model="pass.passValue"
          @click.self="passLabelClick"
          @input="passLabelClick()"
          @blur="passLabelBlur"
          ><template v-slot:label v-if="pass.passValue">
            <label class="label" @click="labelClick('pass')">
              <span
                class="pass_label"
                :class="!pass.setPassValueBtn ? 'close' : ''"
              ></span>
            </label> </template
        ></BaseInput>
        <div class="warnMsg">
          <span v-if="!checkLogin">{{ errorMsg }}</span>
        </div>
      </div>
      <button
        @click="login"
        class="login_btn"
        :class="{ active: btnActiveFlag }"
      >
        로그인
      </button>
      <router-link to="/auth/join" class="join">회원가입</router-link>
    </div>
    <default-pop
      v-if="popupFlag"
      v-bind="$attrs"
      :top="popupTop"
      :body="popupBody"
      :confirmMsg="confirmMsg"
      :cancelMsg="cancelMsg"
      @confirmMsg="confirmMsg"
      @cancelMsg="cancelMsg"
      @close="close"
    ></default-pop>
  </div>
</template>

<script lang="ts">
import BaseInput from '@/components/BaseInput.vue';
import { defineComponent, ref, computed, watchEffect } from 'vue';
import { useStore } from 'vuex';
import { isId, isPass } from '@/api/validate/index';
import { loginApi } from '@/api/index';
import defaultPop from '@/components/Popup/DefaultPopup.vue';
type userId = {
  id: string;
  idValue: string | null;
  setIdValueBtn: boolean;
};
type userPass = {
  pass: string;
  passValue: string | null;
  setPassValueBtn: boolean;
};
export default defineComponent({
  components: { defaultPop, BaseInput },
  setup() {
    const inputStyle = {
      border: '2px solid #eee',
      height: '40px',
      lineHeight: '40px',
    };
    const store = useStore();
    const popupTop = ref<string>('');
    const popupBody = ref<string>('');
    const confirmMsg = ref<string>('');
    const cancelMsg = ref<string>('');
    const id = ref<userId>({
      id: '',
      idValue: null,
      setIdValueBtn: false,
    });
    const pass = ref<userPass>({
      pass: '',
      passValue: null,
      setPassValueBtn: false,
    });
    const login = () => {
      if (!btnActiveFlag.value) {
        popupTop.value = '경고';
        popupBody.value = errorMsg as any;
        confirmMsg.value = '확인';
        store.dispatch('popup/SET_POPUP', true);
        return;
      }
      const info = {
        email: id.value.idValue as string,
        password: pass.value.passValue as string,
      };
      loginApi.FETCH_LOGIN(info);
      store.dispatch('user/SET_EMAIL', `${id.value.idValue}`);
    };
    const popupFlag = computed(() => {
      return store.state.popup.ShowPopup;
    });
    const setupPop = (flag: boolean) => {
      store.dispatch('popup/SET_POPUP', flag);
    };
    const setIdLabelFlag = ref<null | string>(null);
    const idDelete = ref<boolean>(false);
    // const validateId = (id: string) => {
    //   if (!isId(id)) {
    //     errorMsg.value = '아이디의 형식이 맞지 않습니다';
    //     return false;
    //   } else if (!id) {
    //     errorMsg.value = '아이디를 입력해주세요';
    //     return false;
    //   } else {
    //     if (checkLogin.value) {
    //       errorMsg.value = '';
    //       return true;
    //     }
    //   }
    // };
    // const validatePass = (pass: string) => {
    //   if (!isPass(pass)) {
    //     errorMsg.value = '비밀번호의 형식이 맞지 않습니다';
    //     return false;
    //   } else if (!pass) {
    //     errorMsg.value = '비밀번호를 입력해주세요';
    //     return false;
    //   } else {
    //     if (checkLogin.value) {
    //       errorMsg.value = '';
    //       return true;
    //     }
    //   }
    // };
    const checkLogin = computed(() => {
      if (
        (isId(id.value.idValue as string) &&
          id.value.idValue &&
          isPass(pass.value.passValue as string) &&
          pass.value.passValue) ||
        (id.value.idValue === null && pass.value.passValue === null)
      ) {
        return true;
      } else {
        return false;
      }
    });
    const errorMsg = computed((): string => {
      if (!isId(id.value.idValue as string)) {
        return '아이디의 형식이 맞지 않습니다';
      } else if (!id.value.idValue) {
        return '비밀번호를 입력해주세요';
      }
      if (!isPass(pass.value.passValue as string)) {
        return '비밀번호의 형식이 맞지 않습니다';
      } else if (!pass.value.passValue) {
        return '비밀번호를 입력해주세요';
      } else {
        return '';
      }
    });
    const close = () => {
      setupPop(false);
    };
    const idLabelClick = () => {
      if (id.value.idValue) {
        id.value.setIdValueBtn = false;
      }
    };
    const idLabelBlur = () => {
      if (id.value.idValue) {
        id.value.setIdValueBtn = true;
      }
    };
    const passLabelClick = () => {
      if (pass.value.passValue) {
        pass.value.setPassValueBtn = false;
      }
    };
    const passLabelBlur = () => {
      if (pass.value.passValue) {
        pass.value.setPassValueBtn = true;
      }
    };
    const labelClick = (category: string) => {
      if (category === 'id') {
        if (id.value.idValue && id.value.setIdValueBtn) {
          id.value.setIdValueBtn = false;
          id.value.idValue = '';
        }
      } else {
        if (pass.value.passValue && pass.value.setPassValueBtn) {
          pass.value.setPassValueBtn = false;
          pass.value.passValue = '';
        }
      }
    };
    const btnActiveFlag = computed(() => {
      if (
        isId(id.value.idValue as string) &&
        id.value.idValue &&
        isPass(pass.value.passValue as string) &&
        pass.value.passValue
      ) {
        return true;
      } else {
        return false;
      }
    });
    return {
      id,
      pass,
      idDelete,
      // validateId,
      // validatePass,
      checkLogin,
      idLabelClick,
      idLabelBlur,
      passLabelBlur,
      labelClick,
      passLabelClick,
      btnActiveFlag,
      close,
      store,
      inputStyle,
      errorMsg,
      login,
      setIdLabelFlag,
      popupTop,
      popupBody,
      confirmMsg,
      cancelMsg,
      setupPop,
      popupFlag,
    };
  },
});
</script>

<style lang="scss" scoped>
#wrap {
  background-color: $represent;
  min-width: 200px;
  width: 40%;
  margin: 0 auto;
  height: 50%;
  min-height: 200px;
  color: aliceblue;
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  font-family: 'AppleSDGothicNeoM00';
  transform: translate(-50%, -50%);
}
#title {
  height: 15vh;
  font-size: 50px;
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
#context {
  width: 100%;
}
label {
  display: inline-block;
  width: 15%;
  margin-right: 5%;
  font-size: 32px;
  vertical-align: middle;
  font-family: 'Raleway';
}
input {
  display: inline-block;
  width: 40%;
  font-size: 32px;
  vertical-align: middle;
  border: none;
  border-bottom: 2px solid #000;
  background: transparent;
  color: #fff;
}
#context span {
  display: block;
}
.warnMsg {
  min-height: 7vh;
  line-height: 7vh;
  text-align: left;
  padding-top: 1vh;
  color: red;
  font-weight: 900;
  span {
    line-height: 1;
  }
}
.login_btn {
  width: 50%;
  margin: 0 auto 30px;
  border-radius: 10px;
  font-size: 24px;
  line-height: 60px;
  display: block;
  box-shadow: none;
  background-color: gray;
  color: honeydew;
  border: none;
  cursor: pointer;
  font-family: 'AppleSDGothicNeoB00';
}
.login_btn.active {
  background-color: salmon;
}

.label {
  min-width: 20px;
  min-height: 20px;
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  display: inline-block;
}
::v-deep input {
  width: 100%;
  height: 48px;
  border-style: solid;
  border-width: 0 0 2px 0;
  border-color: #ebebeb;
  padding: 11px 70px 8px 0;
  color: #252525;
  outline: 0;
  border-radius: 0;
  box-sizing: border-box;
  caret-color: #191919;
  text-decoration: none;
}
.id_label,
.pass_label {
  &.close {
    width: 20px;
    height: 20px;
    display: block;
    background: url('~@/assets/logo/logo_gather.png');
    background-position: $close;
    cursor: pointer;
  }
}
::v-deep .base_input input {
  &:focus {
    border-bottom: 2px solid #000 !important;
  }
}
::v-deep .hover {
  &:hover {
    background-color: #e7e7e7 !important;
  }
}
</style>
