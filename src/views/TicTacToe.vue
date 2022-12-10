<template>
    <div class="tic-tac-toe-view">
        <div class="row" v-for="(row, rowIndex) in gridGame" :key="rowIndex">
            <div class="column" :class="'column-'+rowIndex+'-'+columnIndex" v-for="(column, columnIndex) in row" :key="columnIndex" @click="play(rowIndex,columnIndex)">
                <img v-if="(column=='0')" src="@/assets/croix.png" />
                <img v-else-if="(column=='1')" src="@/assets/rond.png" />
            </div>
        </div>
        <div class="players">
            <PlayerBadge v-for="(player, index) in players" :key="index" :playerName="players[index].name" :playerScore="players[index].score" :active="(currentPlayer == index)" ></PlayerBadge>
        </div>
    </div>
    <GameModal v-if="showModal" :title="resultMessage" @closeModal="closeModal()"></GameModal>
</template>

<script>
import User from '../models/user.js';
import GameModal from '@/components/GameModal.vue';
import PlayerBadge from '@/components/PlayerBadge.vue';

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
            resultMessage: ""
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
    components: { GameModal, PlayerBadge }
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

</style>