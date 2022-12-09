<template>
  <nav>
    <router-link to="/tic-tac-toe">TicTacToe</router-link>
  </nav>
  <router-view/>
</template>

<style>
*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

:root{
    --primary-color: #2c3e50;
    --secondary-color: #e8cc13;
    --third-color: #1f7a54;
}

body{
    background-color: var(--primary-color);
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #FFF;
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
