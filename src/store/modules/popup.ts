import { Module, ActionContext, ActionTree } from 'vuex';
import { RootState } from '../index';

const state = {
  ShowPopup: false,
};
export type popupRootState = typeof state;

const mutations = {
  SET_POPUP(state: popupRootState, flag: boolean): void {
    state.ShowPopup = flag;
  },
};
type Mutations = typeof mutations;
type MyActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload?: Parameters<Mutations[K]>[1],
  ): ReturnType<Mutations[K]>;
} & Omit<ActionContext<popupRootState, RootState>, 'commit'>;

export enum ActionTypes {
  SET_POPUP = 'SET_POPUP',
}
const actions: ActionTree<popupRootState, RootState> = {
  [ActionTypes.SET_POPUP](context: MyActionContext, flag: boolean): void {
    context.commit('SET_POPUP', flag);
  },
};

export const popup: Module<popupRootState, RootState> = {
  namespaced: true,
  actions,
  mutations,
  state,
};
