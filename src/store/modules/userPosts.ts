import { PostsInterface } from './postsTypes'

import gql from 'graphql-tag'
import graphqlClient from '@/utils/graphql'

const state: PostsInterface = {
  data: [],
  links: {
    first: null,
    prev: null,
    next: null,
    last: null
  },
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

    UPDATE_LINKS (state, payload) {
      Object.keys(payload).forEach(link => {
        if (payload[link] === null) {
          state.links[link] = null
          return
        }
        state.links[link] = {
          page: payload[link].page,
          limit: payload[link].limit
        }
      })
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
    async getAll ({ commit }, option) {
      if (!option.userId) return

      commit('CLEAR_DATA')

      const data = {
        query: gql`
          query(
            $id: ID!
            $options: PageQueryOptions
          ) {
            user(id: $id) {
              posts(options: $options) {
                data {
                  id
                  title
                  body
                }
                links {
                  first {
                    page
                    limit
                  }
                  prev {
                    page
                    limit
                  }
                  next {
                    page
                    limit
                  }
                  last {
                    page
                    limit
                  }
                }
              }
            }
          }
        `,
        variables: {
          id: option.userId,
          options: {
            paginate: {
              page: 1,
              limit: 5
            }
          }
        },
      }

      if (option.paginate !== undefined)
        data.variables.options.paginate = {
          page: option.paginate.page,
          limit: option.paginate.limit
        }

      const response = await graphqlClient.query(data);
      const posts = response.data.user.posts

      //TODO: For some reason I get the answer false from response.loading
      await posts.data.forEach(post => commit('ADD_POST', post))
      commit('UPDATE_LINKS', posts.links)
      commit('IS_LOADING', true)
    },
  },
}