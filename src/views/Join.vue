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
      <ul id="context">
        <li v-for="(userInfo, index) in userInfoStore" :key="index">
          <span>{{ category[index] }}</span
          ><BaseInput
            :styles="inputStyle"
            v-model="userInfo.value"
            @click.self="setLabelBtn(userInfo)"
            @input="[setLabelBtn(userInfo), validate(userInfo)]"
            @blur="setLabelBlur(userInfo)"
            ><template v-slot:label v-if="userInfo.setCheckBtn">
              <label
                class="label"
                @click="
                  () => {
                    userInfo.value = '';
                  }
                "
              >
                <span
                  class="label_in id_label"
                  :class="!userInfo.setValueBtn ? 'close' : ''"
                ></span>
              </label> </template
          ></BaseInput>
          <div class="warnMsg">
            <span v-if="userInfo.errorMsg">{{ userInfo.errorMsg }}</span>
          </div>
        </li>
      </ul>
      <button
        @click="joinInfo"
        class="join_btn"
        :class="{ active: btnActiveFlag }"
      >
        회원가입
      </button>
      <router-link to="/auth/join" class="join">로그인</router-link>
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
import { defineComponent, ref, computed, reactive } from 'vue';
import { useStore } from 'vuex';
import { isId, isPass, isEmail, isPhone } from '@/api/validate/index';
import { joinApi } from '@/api/index';
import defaultPop from '@/components/Popup/DefaultPopup.vue';
type userInfo = {
  value: string | null;
  setValueBtn: boolean;
  errorMsg: string;
};
export default defineComponent({
  components: { defaultPop, BaseInput },
  setup() {
    const inputStyle = {
      border: '2px solid #eee',
      height: '40px',
      lineHeight: '40px',
    };

    const popupTop = ref<string>('');
    const popupBody = ref<string>('');
    const confirmMsg = ref<string>('');
    const cancelMsg = ref<string>('');

    const popupFlag = computed(() => {
      return store.state.popup.ShowPopup;
    });
    const setupPop = (flag: boolean) => {
      store.dispatch('popup/SET_POPUP', flag);
    };
    const close = () => {
      setupPop(false);
    };
    const store = useStore();
    const category = ['아이디', '비밀번호', '비밀번호', '이메일', '전화번호'];
    const id = ref<userInfo>({
      value: null,
      setValueBtn: false,
      errorMsg: '',
    });
    const pass = ref<userInfo>({
      value: null,
      setValueBtn: false,
      errorMsg: '',
    });
    const passConfirm = ref<userInfo>({
      value: null,
      setValueBtn: false,
      errorMsg: '',
    });
    const email = ref<userInfo>({
      value: null,
      setValueBtn: false,
      errorMsg: '',
    });
    const phone = ref<userInfo>({
      value: null,
      setValueBtn: false,
      errorMsg: '',
    });
    const userInfoStore = reactive([
      id.value,
      pass.value,
      passConfirm.value,
      email.value,
      phone.value,
    ]);
    const validate = (info: userInfo) => {
      if (
        !validateId(id.value.value!) ||
        !validatePass(pass.value.value!) ||
        !validatePass(pass.value.value!) ||
        !validatePassConfirm(passConfirm.value.value!) ||
        !validateEmail(email.value.value!) ||
        !validatePhone(phone.value.value!)
      ) {
        return false;
      }
    };
    const validateId = (info: string) => {
      if (isId(info) && info) {
        id.value.errorMsg = '';
        return true;
      } else if (!info) {
        id.value.errorMsg = '아이디를 입력해주세요';
        return false;
      } else {
        id.value.errorMsg = '아이디의 형식이 맞지 않습니다';
        return false;
      }
    };
    const validatePass = (info: string) => {
      if (isPass(info) && info) {
        pass.value.errorMsg = '';
        return true;
      } else if (!info) {
        pass.value.errorMsg = '비밀번호을 입력해주세요';
        return false;
      } else {
        pass.value.errorMsg = '비밀번호의 형식이 맞지 않습니다';
        return false;
      }
    };

    const validatePassConfirm = (info: string) => {
      if (pass.value.value === info && info) {
        passConfirm.value.errorMsg = '';
        return true;
      } else if (!passConfirm.value.value) {
        passConfirm.value.errorMsg = '비밀번호 확인란을 입력해주세요';
        return false;
      } else {
        passConfirm.value.errorMsg = '비밀번호와 일치하지 않습니다';
        return false;
      }
    };

    const validateEmail = (info: string) => {
      if (isEmail(info) && info) {
        email.value.errorMsg = '';
        return true;
      } else if (!info) {
        email.value.errorMsg = '이메일을 입력해주세요';
        return false;
      } else {
        email.value.errorMsg = '이메일의 형식이 맞지 않습니다';
        return false;
      }
    };

    const validatePhone = (info: string) => {
      if (isPhone(info) && info) {
        phone.value.errorMsg = '';
        return true;
      } else if (!info) {
        phone.value.errorMsg = '핸드폰번호을 입력해주세요';
        return false;
      } else {
        phone.value.errorMsg = '핸드폰번호의 형식이 맞지 않습니다';
        return false;
      }
    };
    const checkJoin = computed(() => {
      if (id.value.value === null) {
        return false;
      }
      if (
        validateId(id.value.value!) &&
        validatePass(pass.value.value!) &&
        validatePassConfirm(passConfirm.value.value!) &&
        validateEmail(email.value.value!) &&
        validatePhone(phone.value.value!)
      ) {
        return false;
      } else {
        return true;
      }
    });
    const setLabelBtn = (category: userInfo) => {
      if (ref(category).value) {
        ref(category).value.setValueBtn = false;
        // window.addEventListener('click', e => {
        //   console.log(e);
        // });
      }
    };
    const setLabelBlur = (category: userInfo) => {
      if (ref(category).value.setValueBtn) {
        ref(category).value.setValueBtn = true;
      }
    };
    const passLabelClick = () => {
      if (pass.value.value) {
        pass.value.setValueBtn = false;
      }
    };
    const passLabelBlur = () => {
      if (pass.value.value) {
        pass.value.setValueBtn = true;
      }
    };
    const labelClick = (category: string) => {
      if (category === 'id') {
        if (id.value.value && id.value.setValueBtn) {
          id.value.setValueBtn = false;
          id.value.value = '';
        }
      } else {
        if (pass.value.value && pass.value.setValueBtn) {
          pass.value.setValueBtn = false;
          pass.value.value = '';
        }
      }
    };
    const joinInfo = () => {};
    const btnActiveFlag = computed(() => {
      if (checkJoin.value) {
        return true;
      } else {
        return false;
      }
    });

    return {
      id,
      pass,
      passConfirm,
      email,
      phone,
      validateId,
      validatePass,
      checkJoin,
      setLabelBtn,
      setLabelBlur,
      labelClick,
      passLabelClick,
      validate,
      btnActiveFlag,
      userInfoStore,
      close,
      store,
      inputStyle,
      category,
      joinInfo,
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
.join_btn {
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
.join_btn.active {
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
.label_in {
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
