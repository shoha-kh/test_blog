import { InjectionKey } from 'vue'
import { createStore, useStore as baseUseStore, Store } from 'vuex'

import { PostsInterface } from './modules/postTypes';
import Posts from './modules/posts'

export interface State {
  posts: PostsInterface
}

export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({

  actions: {},

  modules: {
    posts: Posts
  }
})

export function useStore () {
  return baseUseStore(key)
}