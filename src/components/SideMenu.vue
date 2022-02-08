<template>
  <div class="side_menu_wrap" v-if="sideMenuFlag" @click.self="closeSideMenu">
    <div class="side_menu" ref="sideMenu">
      <div class="go_login">
        <router-link to="/login" tag="div" class="need_login" v-if="!userEmail"
          ><span>로그인이</span> 필요해요!</router-link
        >
        <div v-else-if="userEmail" class="need_login">
          {{ userEmail.replace('@kakao.com', '') }}
        </div>
        <div v-if="!store.state.user.email">비회원 주문조회</div>
        <div v-else @click="$router.push('/login')">로그아웃</div>
      </div>
      <div class="img">
        <img
          src="https://t1.kakaocdn.net/friends/prod/main_tab/banner/main_tab/banner_20220117111515_220117_np_choon.jpg"
        />
      </div>
      <ul class="list_wrap">
        <li class="list">
          <div>
            장바구니 내역
            <ul class="shoping_list">
              <li v-for="(item, index) in buylist" :key="index">
                {{ item.title }}
              </li>
            </ul>
          </div>
          <div>주문 배송 내역</div>
        </li>
        <li class="charac">
          <div
            class="arrowDown"
            @click="toggleArrow('charac', 0)"
            :class="arrow.charac[0] ? 'arrowDown' : 'arrowUp'"
          >
            캐릭터
          </div>
          <div
            class="arrowDown"
            @click="toggleArrow('charac', 1)"
            :class="arrow.charac[1] ? 'arrowDown' : 'arrowUp'"
          >
            카테고리
          </div>
        </li>
        <li class="notice">
          <div>공지사항</div>
          <div>고객센터</div>
        </li>
        <li class="gift"><div>기프트카드 조회 환불</div></li>
        <li class="store">
          <div>브랜드 스토리</div>
          <div>매장안내</div>
        </li>
      </ul>
      <div class="img last_img">
        <img
          src="https://t1.kakaocdn.net/friends/prod/main_tab/banner/main_tab/banner_20220117111515_220117_np_choon.jpg"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, onMounted } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
  setup() {
    const store = useStore();
    const sideMenu = ref<HTMLElement | null>(null);
    const sideMenuFlag = computed(() => {
      return store.state.menu.ShowSideMenuFlag;
    });
    const buylist = ref(store.state.shopinglist.shopingList);
    const userEmail = ref<string>('');
    const closeSideMenu = () => {
      if (sideMenu.value) {
        sideMenu.value.style.marginLeft = '-400px';
      }
      //trainsition 0.5를 기다리기 위해서 setTimeout
      setTimeout(() => {
        store.dispatch('menu/SET_SIDEMENU', false);
      }, 500);
    };
    const arrow = ref<{ [key: string]: boolean[] }>({ charac: [true, true] });
    const toggleArrow = (category: string, i: number) => {
      console.log(category, arrow.value[category], i);
      arrow.value[`${category}`][i] = !arrow.value[`${category}`][i];
    };
    onMounted(() => {
      if (store.state.user.email) {
        userEmail.value = store.state.user.email;
      }
    });
    return { store, sideMenuFlag, sideMenu, buylist, closeSideMenu, arrow, toggleArrow, userEmail };
  },
});
</script>
<style lang="scss">
.side_menu_wrap {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 2;
  .side_menu {
    width: 400px;
    height: 100%;
    padding: 24px 0;
    background-color: #fff;
    animation: slidein 0.5s;
    transition: all 0.5s ease;
    @keyframes slidein {
      from {
        margin-left: -400px;
      }
      to {
        margin-left: 0;
      }
    }
    .go_login {
      width: 100%;
      padding: 12px 32px 30px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 14px;
      .need_login {
        font-size: 20px;
        cursor: pointer;
        font-weight: 900;
        color: #000;
      }
    }
    .img {
      border-radius: $border-radius-small-img;
      overflow: hidden;
      margin: 0 32px;
      img {
        width: 100%;
      }
    }
    .list,
    .charac,
    .notice {
      ::last-child {
        border-bottom: 1px solid rgba(0, 0, 0, 0.2);
      }
    }
    .list_wrap {
      li {
        padding: 16px 32px;
        font-size: 16px;
        line-height: 48px;
        border-bottom: 1px solid rgba(0, 0, 0, 0.2);
        .arrowDown {
          position: relative;
          &::after {
            content: '';
            width: 15px;
            height: 15px;
            position: absolute;
            right: 0;
            top: 50%;
            transform: translateY(-50%);
            background: url('~@/assets/icon/gather.png') 0 0 no-repeat;
            background-size: 700px 600px;
            background-position: $down-direction;
          }
        }
        .arrowUp {
          position: relative;
          &::after {
            content: '';
            width: 15px;
            height: 15px;
            position: absolute;
            right: 0;
            top: 50%;
            transform: translateY(-50%);
            background: url('~@/assets/icon/gather.png') 0 0 no-repeat;
            background-size: 700px 600px;
            background-position: $up-direction;
          }
        }
      }
    }
    .last_img {
      border-radius: $border-radius-small-img;
      height: 90px;
      overflow: hidden;
      margin: 32px;
      margin-bottom: 16px;
      img {
        width: 100%;
      }
    }
  }
}
</style>
