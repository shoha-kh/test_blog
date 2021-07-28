import { UsersInterface } from './usersTypes'

import gql from 'graphql-tag'
import graphqlClient from '@/utils/graphql'

const state: UsersInterface = {
  data: [],
  loading: false
}

export default {
  namespaced: true,

  state,

  getters: {
    get: state => id => {
      return state.data.find(user => user.id === id)
    }
  },

  mutations: {
    ADD_USER (state, user) {
      state.data.push({
        id: user.id,
        name: user.name,
        username: user.username
      })
    },
    UPDATE_USER (state, { user, userIdx }) {
      state.data[userIdx] = {
        id: user.id,
        name: user.name,
        username: user.username
      }
    },

    IS_LOADING (state, payload) {
      state.loading = payload
    },

    CLEAR_DATA (state) {
      state.loading = false
      state.data.length = 0
    }
  },

  actions: {
    async get ({ commit, state }, userId) {

      const response = await graphqlClient.query({
        query: gql`
          query user($id: ID!) {
            user(id: $id) {
              id
              name
              username
            }
          }
        `,
        variables: {
          id: userId
        },
      });

      const userIdx = state.data.findIndex(user => user.id == response.data.user.id)
      if (userIdx >= 0)
        commit('UPDATE_USER', { user: response.data.user, userIdx })
      else
        commit('ADD_USER', response.data.user)
    },
    async getAll ({ commit }) {
      commit('CLEAR_DATA')

      const response = await graphqlClient.query({
        query: gql`
          query($options: PageQueryOptions) {
            users(options: $options) {
              data {
                id
                name
                username
              }
            }
          }
        `,
        variables: {
          options: {
            paginate: {
              page: 1,
              limit: 5
            }
          }
        },
      });

      await response.data.users.data.forEach(user => commit('ADD_USER', user))
      commit('IS_LOADING', true)
    },
  },
}