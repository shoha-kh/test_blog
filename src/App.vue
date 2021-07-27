<template>
  <router-view />
</template>

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
