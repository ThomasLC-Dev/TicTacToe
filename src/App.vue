<template>
    <div class="page">
        <nav>
            <router-link to="/tic-tac-toe">TicTacToe</router-link>
            <router-link to="/gobblet">Gobblet</router-link>
            <router-link to="/rules">Règles</router-link>
        </nav>
        <router-view/>
    </div>
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

.page{
    display: flex;
    flex-direction: row;
    height: 100vh;
    padding-top: 10px;
}

nav + *{
    margin: 0 auto;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #FFF;
}

nav {
    display: flex;
    flex-direction: column;
    padding: 30px;
    margin: auto 10px;
}

nav a {
  font-weight: bold;
  color: var(--third-color);
  margin: 5px 10px;
  text-decoration: none;
}

nav a.router-link-exact-active {
  color: var(--secondary-color);
}

@media(max-width: 1200px) {
    .page{
        flex-direction: column;
    }

    nav{
        flex-direction: row;
        margin: 0 auto;
        padding-top: 10px;
    }
}
</style>
