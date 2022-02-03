import { createStore } from 'vuex';
import { popup, popupRootState } from './modules/popup';

export interface RootState {
  popup: popupRootState;
}
export default createStore({
  modules: { popup },
});
