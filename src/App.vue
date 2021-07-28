<template>
  <router-view />

  <div
    class="fixed inset-0 flex flex-wrap justify-center items-center"
    v-if="errorWindow.isActive"
  >
    <div class="absolute inset-0 bg-black opacity-25"></div>

    <div class="relative">
      <span class="text-2xl text-white">
        {{ errorWindow.message.statusCode }}
      </span>
      <p class="text-white">{{ errorWindow.message.name }}</p>
    </div>

    <button
      class="absolute top-10 right-10 cursor-pointer text-2xl text-white"
      @click="clearErrorWindow"
    >
      close
    </button>
  </div>
</template>

<script lang="ts">
import { useStore } from 'vuex'
import { computed, defineComponent } from 'vue'
export default defineComponent({
  name: 'App',
  setup: () => {
    const store = useStore()

    const clearErrorWindow = () => store.getters.clearErrorWindow
    return {
      errorWindow: computed(() => store.state.errorWindow),
      clearErrorWindow
    }
  }
})
</script>

<style lang="postcss">
html,
body {
  height: 100%;
}

#app {
  display: flex;
  flex-direction: column;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: var(--main-font-size);
  background: var(--main-bg-color);
  min-height: 100%;
}
</style>
