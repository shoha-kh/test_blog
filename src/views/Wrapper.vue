<template>
  <section class="wrapper">
    <header class="header h-20 bg-purple-300"></header>

    <main class="container max-w-7xl mx-auto flex">
      <section class="w-full max-w-xs p-6">
        <article>
          <h4 class="text-xs">Links:</h4>
          <nav class="list-none text-base mb-6">
            <li>
              <router-link :to="{ name: 'Home' }">Home</router-link>
            </li>
          </nav>
        </article>
        <article>
          <h6 class="text-xs">User list:</h6>
          <nav class="list-none text-base" v-if="users.loading">
            <li v-for="(user, index) in users.data" :key="index">
              <router-link
                class="cursor-pointer"
                :to="{ path: `/user/${user.id}` }"
                >{{ user.name }}</router-link
              >
            </li>
          </nav>
          <span v-else>Loading...</span>
        </article>
      </section>
      <section class="contain">
        <router-view />
      </section>
    </main>
  </section>

  <footer class="footer h-20 bg-gray-300"></footer>
</template>

<script lang="ts">
import { useStore } from 'vuex'
import { UsersInterface } from '@/store/modules/usersTypes'
import { computed, defineComponent } from 'vue'
export default defineComponent({
  name: 'Wrapper',
  setup: () => {
    const store = useStore()
    const users = computed((): UsersInterface[] => store.state.users)

    store.dispatch('users/getAll')

    return { users }
  }
})
</script>

<style lang="postcss">
.wrapper {
  flex: 1 0 auto;
}
.footer {
  flex-shrink: 0;
}
</style>
