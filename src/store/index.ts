import { InjectionKey } from 'vue'
import { createStore, useStore as baseUseStore, Store } from 'vuex'

import { PostsInterface } from './modules/postsTypes';
import Posts from './modules/posts'
import { UsersInterface } from './modules/UsersTypes';
import Users from './modules/users'
import UserPosts from './modules/userPosts'

export interface State {
  errorWindow: {
    isActive: boolean
    message?: object
  }
}

export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({

  state: {
    errorWindow: {
      isActive: false
    }
  },

  getters: {
    clearErrorWindow: state => {
      state.errorWindow = {
        isActive: false
      }
    }
  },

  modules: {
    users: Users,
    userPosts: UserPosts,
    posts: Posts
  }
})

export function useStore () {
  return baseUseStore(key)
}