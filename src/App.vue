<template>
  <!-- <nav>
    <router-link to="/tic-tac-toe">TicTacToe</router-link>
    <router-link to="/gobblet">Gobblet</router-link>
  </nav> -->
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
    --gobblet-player-1: #d2315a;
    --gobblet-player-2: #3f88e1;
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
  margin-top: 10px;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: var(--third-color);
  margin: 5px 10px;
}

nav a.router-link-exact-active {
  color: var(--secondary-color);
}
</style>
