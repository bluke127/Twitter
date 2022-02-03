<template>
  <div id="wrap">
    <div id="title">
      Twitter<span><img :src="require('@/assets/image/logo.png')" alt="logo" ref="logo" /></span>
    </div>
    <div id="context">
      <span
        ><label>Login </label><input type="text" @keyup="checkId()" v-model="id.idValue"
      /></span>
      <div class="warnMsg">
        <span v-if="id.errorFlag">{{ id.errorMsg }}</span>
      </div>
      <span
        ><label>Password</label><input type="text" @keyup="checkPass()" v-model="pass.passValue"
      /></span>
      <div class="warnMsg">
        <span v-if="pass.errorFlag">{{ pass.errorMsg }}</span>
      </div>
    </div>
    <button @click="login" class="login" :class="{ active: btnActiveFlag }">로그인</button>
    <router-link to="/join" class="join">회원가입</router-link>
    <default-pop v-if="checkPop" :popSet="popSet" @close="close"></default-pop>
  </div>
</template>
<style lang="scss" scoped>
#wrap {
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
/* input[type='text']:hover {
  background: rgba(213 252 0 / 50%);
} */

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
</style>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import { useStore } from 'vuex';
import { userInfo } from '@/apis/user.js';
import defaultPop from '@/components/defaultPop.vue';
type userId={
        id: string,
        idValue: string,
        errorFlag: boolean,
        errorMsg: string,}
type userPass={
        id: string,
        idValue: string,
        errorFlag: boolean,
        errorMsg: string}
export default defineComponent({
  components: { defaultPop },
  setup() {
      const id=ref<userId>({
        id: '',
        idValue: '',
        errorFlag: false,
        errorMsg: '',
      }),
      pass: {
        pass: '',
        passValue: '',
        errorFlag: false,
        errorMsg: '',
      },
      btnActiveFlag: false,
      popSet: {
        title: '',
        passage: '',
        confirmMsg: '',
        concelMsg: '',
      },
    };
  },
  computed: {
    ...mapState(['checkPop']),
  },
  methods: {
    ...mapMutations(['CHECK_ID', 'SET_POP']),
    close() {
      this.SET_POP(false);
    },
    login() {
      if (!this.btnActiveFlag) {
        this.SET_POP(true);
        this.popSet.confirmMsg = '확인';
        this.popSet.title = '알림';
        if (this.id.errorMsg) {
          this.popSet.passage = this.id.errorMsg;
        } else if (this.pass.errorMsg) {
          this.popSet.passage = this.pass.errorMsg;
        } else if (!this.id.idValue && !this.pass.passValue) {
          this.popSet.passage = '아이디를 입력해주세요.';
        }
      }
      this.id.id = this.id.idValue;
      this.pass.pass = this.pass.passValue;
      this.$router.push({ name: 'Main' });
      // localStorage.setItem("userInfo") = this.id.id;
    },
    checkId() {
      var idReg = /^[A-za-z]/g;
      const check = userInfo.checkApi(idReg, this.id.idValue);
      if (check === 'wrong') {
        this.id.errorFlag = true;
        this.id.errorMsg = '시작을 영문으로 시작해주세요.';
        return false;
      } else if (check === 'empty') {
        this.id.errorFlag = true;
        this.id.errorMsg = '아이디를 입력해주세요';
        return false;
      }
      this.id.errorFlag = false;
      this.id.errorMsg = '';
      return true;
    },
    checkPass() {
      var passReg = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d~!@#$%^&*()+|=]{8,20}$/;
      const check = userInfo.checkApi(passReg, this.pass.passValue);
      if (check === 'wrong') {
        this.pass.errorFlag = true;
        this.pass.errorMsg =
          '최소 8 자 및 최대 10 자, 대문자 하나 이상, 소문자 하나, 숫자 하나 및 특수 문자 하나 이상으로 작성해주세요.';
        return false;
      } else if (check === 'empty') {
        this.pass.errorFlag = true;
        this.pass.errorMsg = '비밀번호를 입력해주세요';
        return false;
      }
      this.pass.errorFlag = false;
      this.pass.errorMsg = '';
      this.btnActive(this.id.errorFlag, this.pass.errorFlag);
      return true;
    },
    btnActive(id, pass) {
      console.log(id, pass);
      if (!id && !pass && this.id.idValue && this.pass.passValue) {
        this.btnActiveFlag = true;
      }
    },
  },
});
</script>
