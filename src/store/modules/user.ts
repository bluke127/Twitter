import { Module, ActionContext, ActionTree } from 'vuex';
import { RootState } from '../index';

const state: {
  id: string;
  email: string;
  password: string;
  autoLogin: boolean;
} = {
  id: '',
  email: '',
  password: '',
  autoLogin: false,
};
export type UserRootState = typeof state;

const mutations = {
  SET_ID(state: UserRootState, payload: string): void {
    state.email = payload;
  },
  SET_EMAIL(state: UserRootState, payload: string): void {
    state.email = payload;
  },
  SET_PASSWORD(state: UserRootState, payload: string): void {
    state.password = payload;
  },
  SET_AUTO_LOGIN(state: UserRootState, payload: boolean): void {
    state.autoLogin = payload;
  },
};
type UserMutations = typeof mutations;
type UserActionContext = {
  commit<K extends keyof UserMutations>(
    key: K,
    payload?: Parameters<UserMutations[K]>[1],
  ): ReturnType<UserMutations[K]>;
} & Omit<ActionContext<UserRootState, RootState>, 'commit'>;

export enum ActionTypes {
  SET_ID = 'SET_ID',
  SET_EMAIL = 'SET_EMAIL',
  SET_PASSWORD = 'SET_PASSWORD',
  SET_AUTO_LOGIN = 'SET_AUTO_LOGIN',
}
const actions: ActionTree<UserRootState, RootState> = {
  [ActionTypes.SET_ID](context: UserActionContext, payload: string): void {
    context.commit('SET_ID', payload);
  },
  [ActionTypes.SET_EMAIL](context: UserActionContext, payload: string): void {
    context.commit('SET_EMAIL', payload);
  },
  [ActionTypes.SET_PASSWORD](
    context: UserActionContext,
    payload: string,
  ): void {
    context.commit('SET_PASSWORD', payload);
  },
  [ActionTypes.SET_AUTO_LOGIN](
    context: UserActionContext,
    flag: boolean,
  ): void {
    context.commit('SET_AUTO_LOGIN', flag);
  },
};

export const user: Module<UserRootState, RootState> = {
  namespaced: true,
  actions,
  mutations,
  state,
};
