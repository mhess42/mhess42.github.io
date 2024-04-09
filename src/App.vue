<template>
  <router-view/>
</template>

<style>
@font-face {
  font-family: code;
  src: url('@/assets/fonts/Monocode-Regular-V01.02b.ttf');
}

@font-face {
  font-family: ubuntu;
  src: url('@/assets/fonts/UbuntuMono-Regular.ttf');
}

@font-face {
  font-family: dogica;
  src: url('@/assets/fonts/dogicapixel.ttf');
}

* {
  overscroll-behavior: none;
  overflow: hidden;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
