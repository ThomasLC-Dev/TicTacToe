<template>
    <div class="gobblet-view">
        <div class="row" v-for="(row, rowIndex) in gridGame" :key="rowIndex">
            <div class="column" :class="'column-'+rowIndex+'-'+columnIndex" v-for="(column, columnIndex) in row" :key="columnIndex" @click="play(rowIndex,columnIndex)">
                <div v-if="(column[column.length-1]!=null)" class="gobblet" :class="((column[column.length-1].playerId==0) ? 'gobblet-player-1' : 'gobblet-player-2') + ((currentGridGobblet.r == rowIndex && currentGridGobblet.c == columnIndex) ? ' gobblet-selected' : '')" :style="'width: ' + column[column.length-1].gobblet.size*22.5 + '%; height:' + column[column.length-1].gobblet.size*22.5 + '%'" @click="selectGridGobblet(rowIndex, columnIndex)">{{column[column.length-1].gobblet.name}}</div>
            </div>
        </div>
        <div class="players">
            <PlayerBadge v-for="(player, index) in players" :key="index" :playerName="player.name" :playerScore="player.score" :active="(currentPlayer == index) ? true : false" ></PlayerBadge>
        </div>
        <div class="select-goblet">
            <div v-for="(playerGobbletStack, index) in playersGobblets[currentPlayer]" :key="index" class="stack" :class="(this.currentPlayerGobbletStack==index) ? 'stack-selected' : ''" :style="'background-color: ' + ((currentPlayer == 0) ? 'var(--gobblet-player-1)' : 'var(--gobblet-player-2)') + ';'" @click="selectPlayerGobbletStack(index)"><span v-if="(playerGobbletStack.length!=0)">{{playerGobbletStack[playerGobbletStack.length-1].name}}</span></div>
        </div>
    </div>
    <GameModal v-if="showModal" :title="resultMessage" @closeModal="closeModal()"></GameModal>
</template>

<script>
import User from '../models/user.js';
import Gobblet from '../models/gobblet.js';
import GameModal from '@/components/GameModal.vue';
import PlayerBadge from '@/components/PlayerBadge.vue';

export default{
    name: "GobbletView",
    data() {
        return {
            gridGame: [
                [
                    [], [], [], []
                ],
                [
                    [], [], [], []
                ],
                [
                    [], [], [], []
                ],
                [
                    [], [], [], []
                ]
            ],
            players: [new User("Player 1", 0), new User("Player 2", 0)],
            playersGobblets: [
                [
                    [new Gobblet(1, "S"), new Gobblet(2, "M"), new Gobblet(3, "L"), new Gobblet(4, "XL")],
                    [new Gobblet(1, "S"), new Gobblet(2, "M"), new Gobblet(3, "L"), new Gobblet(4, "XL")],
                    [new Gobblet(1, "S"), new Gobblet(2, "M"), new Gobblet(3, "L"), new Gobblet(4, "XL")],
                ],
                [
                    [new Gobblet(1, "S"), new Gobblet(2, "M"), new Gobblet(3, "L"), new Gobblet(4, "XL")],
                    [new Gobblet(1, "S"), new Gobblet(2, "M"), new Gobblet(3, "L"), new Gobblet(4, "XL")],
                    [new Gobblet(1, "S"), new Gobblet(2, "M"), new Gobblet(3, "L"), new Gobblet(4, "XL")],
                ]
            ],
            currentPlayer: 0,
            currentPlayerGobbletStack: -1,
            currentGridGobblet: {r: -1, c: -1},
            winGrids: [
                [{ r: 1, c: 1 }, { r: 2, c: 1 }, { r: 3, c: 1 }, { r: 4, c: 1}],
                [{ r: 1, c: 2 }, { r: 2, c: 2 }, { r: 3, c: 2 }, { r: 4, c: 2}],
                [{ r: 1, c: 3 }, { r: 2, c: 3 }, { r: 3, c: 3 }, { r: 4, c: 3}],
                [{ r: 1, c: 4 }, { r: 2, c: 4 }, { r: 3, c: 4 }, { r: 4, c: 4}],
                [{ r: 1, c: 1 }, { r: 1, c: 2 }, { r: 1, c: 3 }, { r: 1, c: 4}],
                [{ r: 2, c: 1 }, { r: 2, c: 2 }, { r: 2, c: 3 }, { r: 2, c: 4}],
                [{ r: 3, c: 1 }, { r: 3, c: 2 }, { r: 3, c: 3 }, { r: 3, c: 4}],
                [{ r: 4, c: 1 }, { r: 4, c: 2 }, { r: 4, c: 3 }, { r: 4, c: 4}],
                [{ r: 1, c: 1 }, { r: 2, c: 2 }, { r: 3, c: 3 }, { r: 4, c: 4}],
                [{ r: 1, c: 4 }, { r: 2, c: 3 }, { r: 3, c: 2 }, { r: 4, c: 1}],
            ],
            showModal: false,
            resultMessage: ""
        };
    },
    methods: {
        selectPlayerGobbletStack(stackIndex){
            if(this.playersGobblets[this.currentPlayer][stackIndex].length == 0) return;
            if(this.currentGridGobblet != {r: -1, c: -1}) this.currentGridGobblet = {r: -1, c: -1};
            this.currentPlayerGobbletStack = stackIndex;
        },
        selectGridGobblet(rowIndex, columnIndex){
            if(rowIndex == this.currentGridGobblet.r && columnIndex == this.currentGridGobblet.c){
                this.currentGridGobblet = {r: -1, c: -1};
                return;
            }    
            if(this.currentGridGobblet.r != -1 && this.currentGridGobblet.c != -1) return;
            if(this.gridGame[rowIndex][columnIndex][this.gridGame[rowIndex][columnIndex].length-1].playerId != this.currentPlayer) return;
            if(this.currentPlayerGobbletStack != -1) this.currentPlayerGobbletStack = -1;
            this.currentGridGobblet = {r: rowIndex, c: columnIndex};
        },
        play(rowIndex, columnIndex) {
            if(this.currentPlayerGobbletStack == -1 && this.currentGridGobblet.r == -1 && this.currentGridGobblet.c == -1) return;
            if(this.gridGame[rowIndex][columnIndex].length != 0){
                if(this.currentPlayerGobbletStack != -1){
                    if(this.gridGame[rowIndex][columnIndex][this.gridGame[rowIndex][columnIndex].length-1].gobblet.size >= this.playersGobblets[this.currentPlayer][this.currentPlayerGobbletStack][this.playersGobblets[this.currentPlayer][this.currentPlayerGobbletStack].length-1].size){
                        return;
                    }
                }
                else{
                    if(this.gridGame[rowIndex][columnIndex][this.gridGame[rowIndex][columnIndex].length-1].gobblet.size >= this.gridGame[this.currentGridGobblet.r][this.currentGridGobblet.c][this.gridGame[this.currentGridGobblet.r][this.currentGridGobblet.c].length-1].gobblet.size){
                        return;
                    }
                    else if(rowIndex == this.currentGridGobblet.r && columnIndex == this.currentGridGobblet.c){
                        return;
                    }
                }
            }

            if(this.currentPlayerGobbletStack != -1){
                this.gridGame[rowIndex][columnIndex].push({ playerId: this.currentPlayer, gobblet: this.playersGobblets[this.currentPlayer][this.currentPlayerGobbletStack][this.playersGobblets[this.currentPlayer][this.currentPlayerGobbletStack].length-1]});
                this.playersGobblets[this.currentPlayer][this.currentPlayerGobbletStack].pop();
                this.currentPlayerGobbletStack = -1;
            }
            else{
                this.gridGame[rowIndex][columnIndex].push({ playerId: this.currentPlayer, gobblet: this.gridGame[this.currentGridGobblet.r][this.currentGridGobblet.c][this.gridGame[this.currentGridGobblet.r][this.currentGridGobblet.c].length-1].gobblet});
                this.gridGame[this.currentGridGobblet.r][this.currentGridGobblet.c].pop();
                this.currentGridGobblet = {r: -1, c: -1};
            }
            if (this.checkGrid()) {
                this.players[this.currentPlayer].score++;
                this.endGame(this.currentPlayer);
            }
            else {
                this.currentPlayer = (this.currentPlayer == 0) ? 1 : 0;
            }
        },
        checkGrid() {
            let isWin = false;
            this.winGrids.forEach(winGrid => {
                if (isWin)
                    return;
                let lastValueIsWin = true;
                winGrid.forEach(gridCase => {
                    if (lastValueIsWin == true) {
                        if (this.gridGame[gridCase.r - 1][gridCase.c - 1].length != 0 && this.gridGame[gridCase.r - 1][gridCase.c - 1][this.gridGame[gridCase.r - 1][gridCase.c - 1].length-1].playerId == this.currentPlayer) {
                            lastValueIsWin = true;
                        }
                        else {
                            lastValueIsWin = false;
                        }
                    }
                });
                isWin = lastValueIsWin;
            });
            console.log(isWin);
            return isWin;
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
            this.gridGame = [[[], [], [], []],[[], [], [], []],[[], [], [], []],[[], [], [], []]];
            this.playersGobblets = [
                [
                    [new Gobblet(1, "S"), new Gobblet(2, "M"), new Gobblet(3, "L"), new Gobblet(4, "XL")],
                    [new Gobblet(1, "S"), new Gobblet(2, "M"), new Gobblet(3, "L"), new Gobblet(4, "XL")],
                    [new Gobblet(1, "S"), new Gobblet(2, "M"), new Gobblet(3, "L"), new Gobblet(4, "XL")],
                ],
                [
                    [new Gobblet(1, "S"), new Gobblet(2, "M"), new Gobblet(3, "L"), new Gobblet(4, "XL")],
                    [new Gobblet(1, "S"), new Gobblet(2, "M"), new Gobblet(3, "L"), new Gobblet(4, "XL")],
                    [new Gobblet(1, "S"), new Gobblet(2, "M"), new Gobblet(3, "L"), new Gobblet(4, "XL")],
                ]
            ];
        }
    },
    components: { GameModal, PlayerBadge }
}

</script>

<style scoped>
.row{
    max-width: 440px;
    width: 90vw;
    max-height: 110px;
    height: 22.5vw;
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

.gobblet{
    width: 90%;
    height: 90%;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.2em;
}

.column .gobblet-player-1{
    background-color: var(--gobblet-player-1);
}

.column .gobblet-player-2{
    background-color: var(--gobblet-player-2);
}

.column-0-0, .column-1-0, .column-2-0, .column-3-0{
    border-left: none;
}

.column-0-3, .column-1-3, .column-2-3, .column-3-3{
    border-right: none;
}

.column-0-0, .column-0-1, .column-0-2, .column-0-3{
    border-top: none;
}

.column-3-0, .column-3-1, .column-3-2, .column-3-3{
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

.select-goblet{
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    max-width: 400px;
    width: 90%;
    margin: 20px auto 0;
}

.select-goblet .stack{
    width: 80px;
    height: 80px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.stack-selected, .gobblet-selected{
    border: 2px solid #FFF;
}

</style>