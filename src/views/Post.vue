<template>
  <section class="p-6" v-if="loading">
    <h4 class="font-medium text-xl pb-3">{{ post.title }}</h4>
    <p>{{ post.body }}</p>
  </section>
  <section v-else class="p-6">loading...</section>
</template>

<script lang="ts">
import { useStore } from 'vuex'
import { PostInterface } from '@/store/modules/postsTypes'
import { computed, defineComponent, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
export default defineComponent({
  name: 'post',
  setup: () => {
    const loading = ref(false)
    const store = useStore()
    const router = useRouter()
    const postId = computed(() => router.currentRoute.value.params.id)
    const getPost = computed(() => store.getters['posts/get'])
    const post = reactive<PostInterface>({
      id: '',
      title: '',
      body: ''
    })

    store.dispatch('posts/get', postId.value).then(() => {
      const gettedPost: PostInterface = getPost.value(postId.value)

      post.title = gettedPost.title
      post.body = gettedPost.body
      loading.value = true
    })

    return { loading, post }
  }
})
</script>
