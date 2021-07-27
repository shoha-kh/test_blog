<template>
  <section class="wrapper">
    <header class="header"></header>

    <main class="main">
      <section class="sidebar">
        <nav class="sidebar_users-list"></nav>
      </section>
      <section class="contain">
        <router-view />
      </section>
    </main>
  </section>

  <footer class="footer"></footer>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'Wrapper'
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
