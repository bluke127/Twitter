import { createStore } from 'vuex';
import { popup, popupRootState } from './modules/popup';
import { shopinglist, shopingListRootState } from './modules/shopingList';
import { user, UserRootState } from './modules/user';
import { menu, menuRootState } from './modules/menu';

export interface RootState {
  popup: popupRootState;
  shopinglist: shopingListRootState;
  user: UserRootState;
  menu: menuRootState;
}
export default createStore({
  modules: { popup, shopinglist, user, menu },
});
