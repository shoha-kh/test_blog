<template>
  <section class="posts " v-if="posts.loading">
    <article v-for="(post, index) in posts.data" :key="index">
      <h4>{{ post.title }}</h4>
      <p>{{ post.body }}</p>

      <router-link :to="{ path: `/post/${post.id}` }">More...</router-link>
    </article>
  </section>
</template>

<script lang="ts">
import { useStore } from 'vuex'
import { PostsInterface } from '@/store/modules/postTypes'
import { computed, defineComponent } from 'vue'
export default defineComponent({
  name: 'Home',
  setup: () => {
    const store = useStore()
    const posts = computed((): PostsInterface[] => store.state.posts)

    store.dispatch('posts/getAll')
    store.dispatch('posts/get', 1)

    return { posts }
  }
})
</script>
