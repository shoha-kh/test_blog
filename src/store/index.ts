import { InjectionKey } from 'vue'
import { createStore, useStore as baseUseStore, Store } from 'vuex'

import { PostsInterface } from './modules/postsTypes';
import Posts from './modules/posts'
import { UsersInterface } from './modules/UsersTypes';
import Users from './modules/users'

export interface State {
  users: UsersInterface
  posts: PostsInterface
}

export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({

  actions: {},

  modules: {
    users: Users,
    posts: Posts
  }
})

export function useStore () {
  return baseUseStore(key)
}