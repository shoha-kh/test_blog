import { PostsInterface } from './postTypes'

import gql from 'graphql-tag'
import graphqlClient from '@/utils/graphql'

const state: PostsInterface = {
  data: [],
  loading: false
}

export default {
  namespaced: true,

  state,

  getters: {
    get: state => id => {
      return state.data.find(post => post.id === id)
    }
  },

  mutations: {
    ADD_POST (state, post) {
      state.data.push({
        id: post.id,
        title: post.title,
        body: post.body
      })
    },
    UPDATE_POST (state, { post, postIdx }) {
      state.data[postIdx] = {
        id: post.id,
        title: post.title,
        body: post.body
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
    async get ({ commit, state }, postId) {

      const response = await graphqlClient.query({
        query: gql`
          query post($id: ID!) {
            post(id: $id) {
              id
              title
              body
            }
          }
        `,
        variables: {
          id: postId
        },
      });

      const postIdx = state.data.findIndex(post => post.id == response.data.post.id)
      if (postIdx >= 0)
        commit('UPDATE_POST', { post: response.data.post, postIdx })
      else
        commit('ADD_POST', response.data.post)
    },
    async getAll ({ commit }) {
      commit('CLEAR_DATA')

      const response = await graphqlClient.query({
        query: gql`
          query($options: PageQueryOptions) {
            posts(options: $options) {
              data {
                id
                title
                body
              }
              meta {
                totalCount
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

      //TODO: For some reason I get the answer false from response.loading
      await response.data.posts.data.forEach(post => commit('ADD_POST', post))
      commit('IS_LOADING', true)
    },
  },
}