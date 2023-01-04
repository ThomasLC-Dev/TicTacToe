<template>
    <div class="page">
        <nav>
            <router-link to="/rules">Règles</router-link>
            <router-link to="/tic-tac-toe">TicTacToe</router-link>
            <router-link to="/gobblet">Gobblet</router-link>
        </nav>
        <router-view/>
        <GameModal v-if="noPlayersName" title="Nom des joueurs" @closeModal="updatePlayersName">
            <form>
                <input placeholder="Nom du joueur 1" v-model="playerName1" />
                <input placeholder="Nom du joueur 2" v-model="playerName2"/>
            </form>
        </GameModal>
    </div>
</template>

<script>
import GameModal from './components/GameModal.vue';

export default{
    name: 'App',
    data(){
        return{
            noPlayersName: false,
            playerName1: "",
            playerName2: ""
        }
    },
    created() {
        this.$store.state.players.forEach(player => {
            if (player.name == "") {
                this.noPlayersName = true;
            }
        })
    },
    methods:{
        updatePlayersName(){
            if(this.playerName1 != "" && this.playerName2 != ""){
                this.$store.commit('changePlayerName', {index: 0, name: this.playerName1});
                this.$store.commit('changePlayerName', {index: 1, name: this.playerName2});
                this.noPlayersName = false;
            }
        }
    },
    components: {
        GameModal
    }
}
</script>

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
    --color-player-1: #d2315a;
    --color-player-2: #3f88e1;
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
