<template>
  <div>
    <div id="wrap">
      <div id="title">Twitter</div>
      <ul id="context">
        <li v-for="(userInfo, index) in userInfoStore" :key="index">
          <div class="insert_wrap">
            <span class="category" @click.prevent.stop="setCalendar(true)">{{
              category[index]
            }}</span
            ><BaseInput
              :styles="inputStyle"
              :status="
                userInfo.errorMsg
                  ? false
                  : userInfo.errorMsg === null
                  ? null
                  : true
              "
              v-model="userInfo.value"
              :readonly="category[index] === '생년월일' ? true : false"
              :maxlength="category[index] === '전화번호' ? 13 : ''"
              @click="setLabelBtn(userInfo)"
              @keyup="transformPhone($event, index)"
              @input="[setLabelBtn(userInfo), validate(userInfo)]"
              ><template v-slot:label v-if="userInfo.setValueBtn">
                <label
                  class="label"
                  @click.stop="
                    () => {
                      userInfo.value = '';
                    }
                  "
                >
                  <span
                    class="label_in id_label"
                    :class="userInfo.setValueBtn ? 'close' : ''"
                  ></span>
                </label> </template
            ></BaseInput>
          </div>
          <div
            class="calendar"
            v-if="category[index] === '생년월일' && calendarFlag === true"
          >
            <v-date-picker
              @dayclick="setCalendar(false)"
              v-model="birth.value"
              :attributes="attributes"
            />
          </div>
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
      <router-link to="/auth/login" class="join">로그인</router-link>
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
      @confirm="confirm"
      @close="close"
    ></default-pop>
  </div>
</template>

<script lang="ts">
import BaseInput from '@/components/BaseInput.vue';
import router from '@/router';
import {
  defineComponent,
  ref,
  computed,
  reactive,
  onUnmounted,
  onMounted,
} from 'vue';
import { useStore } from 'vuex';
import { isId, isPass, isEmail, isPhone } from '@/api/validate/index';
import { joinApi } from '@/api/index';
import { transformDateMethod } from '@/util/user';
import { Calendar, DatePicker } from 'v-calendar';

import defaultPop from '@/components/Popup/DefaultPopup.vue';
interface userInfo {
  value: string | null;
  setValueBtn: boolean;
  errorMsg: string;
}
interface birthInfo extends Omit<userInfo, 'value'> {
  value: Date | null;
}
export default defineComponent({
  components: { defaultPop, BaseInput },
  setup() {
    const inputStyle = {
      border: "2px solid #eee",
      height: "40px",
      lineHeight: "40px",
    };

    const popupTop = ref<string>("");
    const popupBody = ref<string>("");
    const confirmMsg = ref<string>("");
    const cancelMsg = ref<string>("");

    const popupFlag = computed(() => {
      return store.state.popup.ShowPopup;
    });
    const setupPop = (flag: boolean) => {
      store.dispatch("popup/SET_POPUP", flag);
    };
    const close = () => {
      setupPop(false);
    };
    const setCalendar = (flag: boolean) => {
      calendarFlag.value = flag;
      console.log(window.event, '이벤트');
    };
    const store = useStore();
    const category = [
      '아이디',
      '비밀번호',
      '비밀번호',
      '이메일',
      '전화번호',
      '생년월일',
    ];
    const id = ref<userInfo>({
      value: null,
      setValueBtn: false,
      errorMsg: "",
    });
    const pass = ref<userInfo>({
      value: null,
      setValueBtn: false,
      errorMsg: null,
    });
    const passConfirm = ref<userInfo>({
      value: null,
      setValueBtn: false,
      errorMsg: null,
    });
    const email = ref<userInfo>({
      value: null,
      setValueBtn: false,
      errorMsg: null,
    });
    const phone = ref<userInfo>({
      value: null,
      setValueBtn: false,
      errorMsg: null,
    });
    const birth = ref<birthInfo>({
      value: null,
      setValueBtn: false,
      errorMsg: '',
    });
    const transformDate = computed(() =>
      transformDateMethod(birth.value?.value as Date)
    );

    const attributes = computed(() => {
      return {
        highlight: true,
        dates: birth.value.value,
      };
    });
    const calendarFlag = ref<boolean>(false);
    const userInfoStore = reactive([
      id.value,
      pass.value,
      passConfirm.value,
      email.value,
      phone.value,
      transformDate,
    ]);
    const validate = () => {
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
        id.value.errorMsg = "";
        return true;
      } else if (!info) {
        id.value.errorMsg = "아이디를 입력해주세요";
        return false;
      } else {
        id.value.errorMsg = "아이디의 형식이 맞지 않습니다";
        return false;
      }
    };
    const validatePass = (info: string) => {
      if (isPass(info) && info) {
        pass.value.errorMsg = "";
        return true;
      } else if (!info) {
        pass.value.errorMsg = "비밀번호을 입력해주세요";
        return false;
      } else {
        pass.value.errorMsg = "비밀번호의 형식이 맞지 않습니다";
        return false;
      }
    };

    const validatePassConfirm = (info: string) => {
      if (pass.value.value === info && info) {
        passConfirm.value.errorMsg = "";
        return true;
      } else if (!passConfirm.value.value) {
        passConfirm.value.errorMsg = "비밀번호 확인란을 입력해주세요";
        return false;
      } else {
        passConfirm.value.errorMsg = "비밀번호와 일치하지 않습니다";
        return false;
      }
    };

    const validateEmail = (info: string) => {
      if (isEmail(info) && info) {
        email.value.errorMsg = "";
        return true;
      } else if (!info) {
        email.value.errorMsg = "이메일을 입력해주세요";
        return false;
      } else {
        email.value.errorMsg = "이메일의 형식이 맞지 않습니다";
        return false;
      }
    };

    const validatePhone = (info: string) => {
      if (isPhone(info) && info) {
        phone.value.errorMsg = "";
        return true;
      } else if (!info) {
        phone.value.errorMsg = "핸드폰번호을 입력해주세요";
        return false;
      } else {
        phone.value.errorMsg = "핸드폰번호의 형식이 맞지 않습니다";
        return false;
      }
    };
    const transformPhone = (e: KeyboardEvent, index: number) => {
      if (category[index] === '전화번호') {
        console.log(e.key, e);
        if (e.key === 'Backspace' || e.key === 'Delete') {
          return;
        }
        if (phone.value.value) {
          phone.value.value = phone.value.value?.substring(0, 13) as string;
          const regNum = /^[0-9]/g;
          phone.value.value = phone.value.value.replace(/[^0-9|-]/g, '');
          if (
            phone.value.value.length === 3 ||
            phone.value.value.length === 8
          ) {
            phone.value.value += '-';
          }
          console.log(regNum.test(phone.value.value), 'bo', phone.value.value);
        }
      }
    };
    const checkJoin = computed(() => {
      if (
        !id.value.value ||
        !pass.value.value ||
        !passConfirm.value.value ||
        !email.value.value ||
        !phone.value.value
      ) {
        return false;
      }
      if (
        !validateId(id.value.value!) ||
        !validatePass(pass.value.value!) ||
        !validatePassConfirm(passConfirm.value.value!) ||
        !validateEmail(email.value.value!) ||
        !validatePhone(phone.value.value!)
      ) {
        return false;
      } else {
        return true;
      }
    });
    const setLabelBtn = (category: userInfo) => {
      console.log(ref(category).value);
      if (!ref(category).value.setValueBtn) {
        ref(category).value.setValueBtn = true;
        window.addEventListener("click", () => {
          setLabelBlur(category);
        });
      }
    };
    const setLabelBlur = (category: userInfo) => {
      if (ref(category).value.setValueBtn) {
        ref(category).value.setValueBtn = false;
      }
    };
    const joinInfo = async () => {
      if (!btnActiveFlag.value) {
        popupTop.value = "경고";
        validate();
        const joinErrorMsg = [
          id.value.errorMsg,
          pass.value.errorMsg,
          passConfirm.value.errorMsg,
          email.value.errorMsg,
          phone.value.errorMsg,
        ];

        for (let i = 0; i < joinErrorMsg.length; i++) {
          if (joinErrorMsg[i] !== "") {
            popupBody.value = joinErrorMsg[i] as string;
            break;
          }
        }
        confirmMsg.value = '확인';

        cancelMsg.value = '';
        store.dispatch('popup/SET_POPUP', true);
        return;
      }
      try {
        const response = await joinApi.FETCH_JOIN();
        console.log(response);
        popupTop.value = "알람";
        popupBody.value = "회원가입이 되었습니다";
        localStorage.setItem(
          "joinInfo",
          JSON.stringify({
            id: id.value.value,
            pass: pass.value.value,
            email: email.value.value,
            phone: phone.value.value,
          })
        );
        store.dispatch("popup/SET_POPUP", true);
      } catch (e) {
        console.log(e);
      }
    };
    const confirmFlag = ref<boolean>(false);
    const confirm = () => {
      if (confirmFlag.value) {
        router.push("/post");
        return;
      } else {
        close();
      }
    };
    const btnActiveFlag = computed(() => {
      if (checkJoin.value) {
        return true;
      } else {
        return false;
      }
    });
    onMounted(() => window.addEventListener('click', () => setCalendar(false)));
    onUnmounted(() => {
      window.removeEventListener('click', () => setCalendar(false));
    });

    return {
      id,
      pass,
      passConfirm,
      email,
      phone,
      birth,
      transformDate,
      validateId,
      validatePass,
      transformPhone,
      attributes,
      checkJoin,
      setLabelBtn,
      setLabelBlur,
      validate,
      btnActiveFlag,
      userInfoStore,
      close,
      setCalendar,
      store,
      inputStyle,
      category,
      joinInfo,
      calendarFlag,
      popupTop,
      popupBody,
      confirmMsg,
      cancelMsg,
      setupPop,
      popupFlag,
      confirm,
      confirmFlag,
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
  font-family: "AppleSDGothicNeoM00";
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
  .insert_wrap {
    display: flex;
    .category {
      width: 30%;
      line-height: 40px;
    }
    input {
      flex: 1;
    }
  }
}
label {
  display: inline-block;
  width: 15%;
  margin-right: 5%;
  font-size: 32px;
  vertical-align: middle;
  font-family: "Raleway";
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
  font-family: "AppleSDGothicNeoB00";
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
    background: url("~@/assets/logo/logo_gather.png");
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
