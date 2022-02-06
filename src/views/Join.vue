<template>
  <div>
    <div id="wrap">
      <div id="title">
        Twitter<span><img :src="require('@/assets/images/logo.png')" alt="logo" ref="logo" /></span>
      </div>
      <ul id="context">
        <li v-for="(userInfo, index) in userInfoStore" :key="index">
          <BaseInput
            :styles="inputStyle"
            v-model="userInfo.value"
            @click.self="setLabelBtn(userInfo)"
            @input="[setLabelBtn(userInfo), validate(userInfo)]"
            @blur="setLabelBlur(userInfo)"
            ><template v-slot:label v-if="userInfo.value">
              <label class="label" @click="labelClick(userInfo.toString())">
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
        <!-- <li>
          <BaseInput
            :styles="inputStyle"
            :placeholder="'카카오메일 아이디, 이메일, 전화번호'"
            v-model="id.value"
            @click.self="setLabelBtn(id)"
            @input="[setLabelBtn(id), validateId(id.value)]"
            @blur="idLabelBlur"
            ><template v-slot:label v-if="id.value">
              <label class="label" @click="labelClick('id')">
                <span class="label_in id_label" :class="!id.setValueBtn ? 'close' : ''"></span>
              </label> </template
          ></BaseInput>
          <div class="warnMsg">
            <span v-if="id.errorMsg">{{ id.errorMsg }}</span>
          </div>
        </li>
        <li>
          <BaseInput
            :styles="inputStyle"
            v-model="pass.value"
            @click.self="setLabelBtn(pass)"
            @input="[setLabelBtn(pass), validatePass(pass.passValue)]"
            @blur="passLabelBlur"
            ><template v-slot:label v-if="pass.value">
              <label class="label" @click="labelClick('pass')">
                <span class="label_in pass_label" :class="!pass.setValueBtn ? 'close' : ''"></span>
              </label> </template
          ></BaseInput>
          <div class="warnMsg">
            <span v-if="pass.errorMsg">{{ pass.errorMsg }}</span>
          </div>
        </li>
        <li>
          <BaseInput
            :styles="inputStyle"
            v-model="passConfirm.value"
            @click.self="setLabelBtn(passConfirm)"
            @input="[setLabelBtn(passConfirm), validatePass(pass.passValue)]"
            @blur="passLabelBlur"
            ><template v-slot:label v-if="passConfirm.value">
              <label class="label" @click="labelClick('passConfirm')">
                <span
                  class="label_in pass_label"
                  :class="!passConfirm.setValueBtn ? 'close' : ''"
                ></span>
              </label> </template
          ></BaseInput>
          <div class="warnMsg">
            <span v-if="passConfirm.errorMsg">{{ passConfirm.errorMsg }}</span>
          </div>
        </li>
        <li>
          <BaseInput
            :styles="inputStyle"
            v-model="pass.value"
            @click.self="setLabelBtn(pass)"
            @input="[setLabelBtn(pass), validatePass(pass.passValue)]"
            @blur="passLabelBlur"
            ><template v-slot:label v-if="pass.value">
              <label class="label" @click="labelClick('pass')">
                <span class="label_in pass_label" :class="!pass.setValueBtn ? 'close' : ''"></span>
              </label> </template
          ></BaseInput>
          <div class="warnMsg">
            <span v-if="checkLogin">{{ errorMsg }}</span>
          </div>
        </li>
        <li>
          <BaseInput
            :styles="inputStyle"
            v-model="pass.value"
            @click.self="setLabelBtn(pass)"
            @input="[setLabelBtn(pass), validatePass(pass.passValue)]"
            @blur="passLabelBlur"
            ><template v-slot:label v-if="pass.value">
              <label class="label" @click="labelClick('pass')">
                <span class="label_in pass_label" :class="!pass.setValueBtn ? 'close' : ''"></span>
              </label> </template
          ></BaseInput>
          <div class="warnMsg">
            <span v-if="checkLogin">{{ errorMsg }}</span>
          </div> 
        </li>-->
      </ul>

      <button @click="login" class="login" :class="{ active: canJoin }">로그인</button>
      <router-link to="/join" class="join">회원가입</router-link>
    </div>
    <default-pop v-if="store.state.popup.popupFlag" :popSet="popSet" @close="close"></default-pop>
  </div>
</template>

<script lang="ts">
import BaseInput from '@/components/BaseInput.vue';
import { defineComponent, ref, computed, watchEffect, reactive } from 'vue';
import { useStore } from 'vuex';
import { isId, isPass, isEmail, isPhone } from '@/api/validate/index';
import { loginApi } from '@/api/index';
import defaultPop from '@/components/defaultPop.vue';
type userInfo = {
  value: string | null;
  setValueBtn: boolean;
  errorMsg: string;
};
export default defineComponent({
  components: { defaultPop, BaseInput },
  setup() {
    const inputStyle = { border: '2px solid #eee', height: '40px', lineHeight: '40px' };
    const store = useStore();
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
    const login = () => {
      if (
        !id.value.value ||
        !pass.value.value ||
        !passConfirm.value.value ||
        !email.value.value ||
        !phone.value.value
      ) {
        store.dispatch('popup/SET_POPUP', true);
        return;
      }
      const info = { email: id.value.value, password: pass.value.value };
      loginApi.FETCH_LOGIN(info);
      store.dispatch('user/SET_EMAIL', `${id.value.value}`);
    };
    const validate = (info: userInfo) => {
      if (info === id.value) {
        validateId(id.value.value!);
      } else if (info === pass.value) {
        validatePass(pass.value.value!);
      } else if (info === passConfirm.value) {
        validatePassConfirm(passConfirm.value.value!);
      } else if (info === email.value) {
        validateEmail(email.value.value!);
      } else if (info === phone.value) {
        validatePhone(phone.value.value!);
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
      }
      // if (category.value.idValue) {
      //   category.value.setIdValueBtn = false;
      // }
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

    const errorMsg = ref<string>('');
    const btnActiveFlag = computed(() => {
      if (checkJoin.value) {
        return true;
      } else {
        return false;
      }
    });
    const popSet = ref<{
      title: string;
      passage: string;
      confirmMsg: string;
      concelMsg: string;
    }>({
      title: '',
      passage: '',
      confirmMsg: '',
      concelMsg: '',
    });

    const close = () => {
      store.dispatch('popup/SET_POPUP', false);
    };
    return {
      id,
      pass,
      passConfirm,
      email,
      phone,
      popSet,
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
      login,
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
.login {
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
.login.active {
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
