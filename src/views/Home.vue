<template>
  <section class="p-6" v-if="posts.loading">
    <article class="pb-3 mb-6" v-for="(post, index) in posts.data" :key="index">
      <h4 class="font-medium text-xl pb-3">{{ post.title }}</h4>
      <p>{{ post.body }}</p>

      <router-link class="text-purple-500" :to="{ path: `/post/${post.id}` }"
        >More...</router-link
      >
    </article>

    <div class="flex">
      <button
        v-if="links.first"
        class="btn"
        @click="
          updatePosts({
            page: links.first.page,
            limit: links.first.limit
          })
        "
      >
        first
      </button>
      <button
        v-if="links.prev"
        class="btn"
        @click="
          updatePosts({
            page: links.prev.page,
            limit: links.prev.limit
          })
        "
      >
        prev
      </button>
      <button
        v-if="links.next"
        class="btn"
        @click="
          updatePosts({
            page: links.next.page,
            limit: links.next.limit
          })
        "
      >
        next
      </button>
      <button
        v-if="links.last"
        class="btn"
        @click="
          updatePosts({
            page: links.last.page,
            limit: links.last.limit
          })
        "
      >
        last
      </button>
    </div>
  </section>
  <section v-else class="p-6">loading...</section>
</template>

<script lang="ts">
import { useStore } from 'vuex'
import { PostsInterface } from '@/store/modules/postsTypes'
import { computed, defineComponent, watch } from 'vue'
export default defineComponent({
  name: 'Home',
  setup: () => {
    const store = useStore()
    const posts = computed((): PostsInterface[] => store.state.posts)
    const links = computed(() => store.state.posts.links)

    store.dispatch('posts/getAll')

    const updatePosts = option => store.dispatch('posts/getAll', option)

    return { posts, links, updatePosts }
  }
})
</script>

<style lang="postcss">
.btn {
  @apply px-3 py-2 mr-2 bg-gray-300;
}
</style>
