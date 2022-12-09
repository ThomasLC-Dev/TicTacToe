<template>
    <div class="tic-tac-toe-view">
        <div class="row" v-for="(row, rowIndex) in gridGame" :key="rowIndex">
            <div class="column" :class="'column-'+rowIndex+'-'+columnIndex" v-for="(column, columnIndex) in row" :key="columnIndex" @click="play(rowIndex,columnIndex)">
                <img v-if="(column=='0')" src="@/assets/croix.png" />
                <img v-else-if="(column=='1')" src="@/assets/rond.png" />
            </div>
        </div>
        <div class="players">
            <div class="player-badge" :class="(currentPlayer == index) ? 'current-user' : ''" v-for="(player, index) in players" :key="index">
                <span class="player-score">{{player.score}}</span>
                <img src="https://as2.ftcdn.net/v2/jpg/03/35/34/35/1000_F_335343515_Frb5IFI9YnwHwYzP84ibjcMeCZFV1Cs6.jpg"/>
                <span class="player-name">{{player.name}}</span>
            </div>
        </div>
    </div>
    <GameModal v-if="showModal" :title="resultMessage" @closeModal="closeModal()"></GameModal>
</template>

<script>
import User from '../models/user.js';
import GameModal from '@/components/GameModal.vue';

export default{
    name: "TicTacToeView",
    data() {
        return {
            gridGame: [["", "", ""], ["", "", ""], ["", "", ""]],
            players: [new User("Player 1", 0), new User("Player 2", 0)],
            currentPlayer: 0,
            winGrids: [
                [{ r: 1, c: 1 }, { r: 2, c: 1 }, { r: 3, c: 1 }],
                [{ r: 1, c: 2 }, { r: 2, c: 2 }, { r: 3, c: 2 }],
                [{ r: 1, c: 3 }, { r: 2, c: 3 }, { r: 3, c: 3 }],
                [{ r: 1, c: 1 }, { r: 1, c: 2 }, { r: 1, c: 3 }],
                [{ r: 2, c: 1 }, { r: 2, c: 2 }, { r: 2, c: 3 }],
                [{ r: 3, c: 1 }, { r: 3, c: 2 }, { r: 3, c: 3 }],
                [{ r: 1, c: 1 }, { r: 2, c: 2 }, { r: 3, c: 3 }],
                [{ r: 1, c: 3 }, { r: 2, c: 2 }, { r: 3, c: 1 }],
            ],
            showModal: false,
            resultMessage: "Player 1 Win"
        };
    },
    methods: {
        play(rowIndex, columnIndex) {
            if(this.gridGame[rowIndex][columnIndex] != "") return;
            this.gridGame[rowIndex][columnIndex] = "" + this.currentPlayer;
            if (this.checkGrid("" + this.currentPlayer)) {
                console.log(this.players[this.currentPlayer].name + " win !");
                this.players[this.currentPlayer].score++;
                this.endGame(this.currentPlayer);
            }
            else if (this.checkNullGame()) {
                this.endGame(-1);
            }
            else {
                this.currentPlayer = (this.currentPlayer == 0) ? 1 : 0;
            }
        },
        checkGrid(symbolCheck) {
            let isWin = false;
            this.winGrids.forEach(winGrid => {
                if (isWin)
                    return;
                let lastValueIsWin = true;
                winGrid.forEach(gridCase => {
                    if (lastValueIsWin == true) {
                        if (this.gridGame[gridCase.r - 1][gridCase.c - 1] == symbolCheck) {
                            lastValueIsWin = true;
                        }
                        else {
                            lastValueIsWin = false;
                        }
                    }
                });
                isWin = lastValueIsWin;
            });
            return isWin;
        },
        checkNullGame() {
            let filledCases = 0;
            this.gridGame.forEach(row => {
                row.forEach(column => {
                    if (column != "")
                        filledCases++;
                });
            });
            return filledCases == 9;
        },
        endGame(winPlayer) {
            if (winPlayer != -1) {
                this.resultMessage = this.players[this.currentPlayer].name + " a gagné !";
            }
            else {
                this.resultMessage = "Partie nulle";
                this.currentPlayer = (this.currentPlayer == 0) ? 1 : 0;
            }
            this.showModal = true;
        },
        closeModal(){
            this.showModal = false;
            this.gridGame = [["", "", ""], ["", "", ""], ["", "", ""]];
        }
    },
    components: { GameModal }
}

</script>

<style scoped>
.row{
    max-width: 450px;
    width: 90vw;
    max-height: 150px;
    height: 30vw;
    display: flex;
    flex-direction: row;
    margin: auto;
}

.column{
    border: 3px solid #FFF;
    flex: 1;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.column img{
    width: 90%;
}

.column-0-0, .column-1-0, .column-2-0{
    border-left: none;
}

.column-0-2, .column-1-2, .column-2-2{
    border-right: none;
}

.column-0-0, .column-0-1, .column-0-2{
    border-top: none;
}

.column-2-0, .column-2-1, .column-2-2{
    border-bottom: none;
}

.players{
    max-width: 450px;
    width: 90vw;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    margin: 40px auto 0;
}

.player-badge{
    display: flex;
    flex-direction: column;
    position: relative;
    transition: all 0.2s ease-in;
}

.player-badge.player-badge.current-user{
    transform: scale(1.1);
}

.player-badge.current-user img{
    box-shadow:0 0 20px 5px #fff
}

.player-badge img{
    max-width: 100px;
    width: 90%;
    border-radius: 50%;
    border: 5px solid var(--third-color);
    transition: all 0.2s ease-in;
}

.player-score{
    position: absolute;
    right: 0;
    width: 30px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1em;
    background-color: var(--secondary-color);
    border-radius: 50%;
}

.player-name{
    font-weight: bold;
    margin-top: 10px;
    text-align: center;
    margin-left: -10px;
}
</style>