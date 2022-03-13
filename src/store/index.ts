import { createStore } from 'vuex';
import { popup, popupRootState } from './modules/popup';
import { user, UserRootState } from './modules/user';
import { menu, menuRootState } from './modules/menu';

export interface RootState {
  popup: popupRootState;
  user: UserRootState;
  menu: menuRootState;
}
export default createStore({
  modules: { popup, user, menu },
});
