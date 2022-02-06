import { Module, ActionContext, ActionTree } from 'vuex';
import { RootState } from '../index';

const state = {
  ShowSideMenuFlag: false,
};
export type menuRootState = typeof state;

const mutations = {
  SET_SIDEMENU(state: menuRootState, flag: boolean): void {
    state.ShowSideMenuFlag = flag;
  },
};
type Mutations = typeof mutations;
type MyActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload?: Parameters<Mutations[K]>[1],
  ): ReturnType<Mutations[K]>;
} & Omit<ActionContext<menuRootState, RootState>, 'commit'>;

export enum ActionTypes {
  SET_SIDEMENU = 'SET_SIDEMENU',
}
const actions: ActionTree<menuRootState, RootState> = {
  [ActionTypes.SET_SIDEMENU](context: MyActionContext, flag: boolean): void {
    context.commit('SET_SIDEMENU', flag);
  },
};

export const menu: Module<menuRootState, RootState> = {
  namespaced: true,
  actions,
  mutations,
  state,
};
