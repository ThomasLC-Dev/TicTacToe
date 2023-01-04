<template>
    <div class="gobblet-view">
        <div class="row" v-for="(row, rowIndex) in gridGame" :key="rowIndex">
            <div class="column" :class="'column-'+rowIndex+'-'+columnIndex" v-for="(column, columnIndex) in row" :key="columnIndex" @click="play(rowIndex,columnIndex)">
                <Transition>
                    <div v-if="(column[column.length-1]!=null)" class="gobblet" :class="((column[column.length-1].playerId==0) ? 'gobblet-player-1' : 'gobblet-player-2') + ((currentGridGobblet.r == rowIndex && currentGridGobblet.c == columnIndex) ? ' gobblet-selected' : '')" :style="'width: ' + column[column.length-1].gobblet.size*22.5 + '%; height:' + column[column.length-1].gobblet.size*22.5 + '%'" @click="selectGridGobblet(rowIndex, columnIndex)">{{column[column.length-1].gobblet.name}}</div>
                </Transition>
            </div>
        </div>
        <div class="players">
            <PlayerBadge v-for="(player, index) in players" :key="index" :playerName="player.name" :playerScore="player.score" :active="(currentPlayer == index) ? true : false" ></PlayerBadge>
        </div>
        <div class="select-goblet">
            <div v-for="(playerGobbletStack, index) in playersGobblets[currentPlayer]" :key="index" class="stack" :class="(this.currentPlayerGobbletStack==index) ? 'stack-selected' : ''" :style="'background-color: ' + ((currentPlayer == 0) ? 'var(--color-player-1)' : 'var(--color-player-2)') + ';'" @click="selectPlayerGobbletStack(index)"><span v-if="(playerGobbletStack.length!=0)">{{playerGobbletStack[playerGobbletStack.length-1].name}}</span></div>
        </div>
    </div>
    <GameModal v-if="showModal" :title="resultMessage" @closeModal="closeModal()"></GameModal>
</template>

<script>
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
            players: this.$store.state.players,
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
            // All wins configurations
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
        /*
        * Function call when a gobblet stack is selected
        */
        selectPlayerGobbletStack(stackIndex){
            if(this.playersGobblets[this.currentPlayer][stackIndex].length == 0) return;
            if(this.currentGridGobblet != {r: -1, c: -1}) this.currentGridGobblet = {r: -1, c: -1};
            this.currentPlayerGobbletStack = stackIndex;
        },
        /*
        * Function call when a gobblet already in the grid is selected
        */
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
        /*
        * Function call when a case is clicked
        */
        play(rowIndex, columnIndex) {
            if(this.currentPlayerGobbletStack == -1 && this.currentGridGobblet.r == -1 && this.currentGridGobblet.c == -1) return;
            // Check if the destination case already have gobblet
            if(this.gridGame[rowIndex][columnIndex].length != 0){
                // If the player want to add a neww gobblet from a stack
                if(this.currentPlayerGobbletStack != -1){
                    // Check if the size of the already placed gobblet is greater than the stack gobblet
                    if(this.gridGame[rowIndex][columnIndex][this.gridGame[rowIndex][columnIndex].length-1].gobblet.size >= this.playersGobblets[this.currentPlayer][this.currentPlayerGobbletStack][this.playersGobblets[this.currentPlayer][this.currentPlayerGobbletStack].length-1].size){
                        return;
                    }
                }
                // If the player want to move a gobblet already in the grid
                else{
                    // Check if the size of the already placed gobblet is greater than the selected player gobblet
                    if(this.gridGame[rowIndex][columnIndex][this.gridGame[rowIndex][columnIndex].length-1].gobblet.size >= this.gridGame[this.currentGridGobblet.r][this.currentGridGobblet.c][this.gridGame[this.currentGridGobblet.r][this.currentGridGobblet.c].length-1].gobblet.size){
                        return;
                    }
                    // Check if the selected player gobblet case is the same of the cliked case
                    else if(rowIndex == this.currentGridGobblet.r && columnIndex == this.currentGridGobblet.c){
                        return;
                    }
                }
            }

            // Player want to add a new gobblet to the grid
            if(this.currentPlayerGobbletStack != -1){
                this.gridGame[rowIndex][columnIndex].push({ playerId: this.currentPlayer, gobblet: this.playersGobblets[this.currentPlayer][this.currentPlayerGobbletStack][this.playersGobblets[this.currentPlayer][this.currentPlayerGobbletStack].length-1]});
                this.playersGobblets[this.currentPlayer][this.currentPlayerGobbletStack].pop();
                this.currentPlayerGobbletStack = -1;
            }
            // Player want to move an already placed gobblet
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
        /*
        * Function to check if a player have win the game
        * //TODO : Change the win check implementation to remove the duplicate code
        */
        checkGrid() {
            let isWin = false;
            this.winGrids.forEach(winGrid => {
                if (isWin)
                    return;
                // Use to store the last check case value (if it's win or not)
                let lastValueIsWin = true;
                winGrid.forEach(gridCase => {
                    if (lastValueIsWin == true) {
                        // Check if the current win configuration case is win and if the player who placed the last gobblet on the case is the current user 
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

            if(!isWin){
                this.currentPlayer = (this.currentPlayer == 0) ? 1 : 0;
                this.winGrids.forEach(winGrid => {
                    if (isWin)
                        return;
                    // Use to store the last check case value (if it's win or not)
                    let lastValueIsWin = true;
                    winGrid.forEach(gridCase => {
                        if (lastValueIsWin == true) {
                            // Check if the current win configuration case is win and if the player who placed the last gobblet on the case is the current user 
                            if (this.gridGame[gridCase.r - 1][gridCase.c - 1].length != 0 && this.gridGame[gridCase.r - 1][gridCase.c - 1][this.gridGame[gridCase.r - 1][gridCase.c - 1].length - 1].playerId == this.currentPlayer) {
                                lastValueIsWin = true;
                            }
                            else {
                                lastValueIsWin = false;
                            }
                        }
                    });
                    isWin = lastValueIsWin;
                });
            }

            if(!isWin){
                this.currentPlayer = (this.currentPlayer == 0) ? 1 : 0;
            }
            return isWin;
        },
        /*
        * Function call when the game is finished (Show the modal)
        */
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
        /*
        * Function call when the modal is closed (Reset the data)
        */
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
    margin: 0 auto;
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
    background-color: var(--color-player-1);
}

.column .gobblet-player-2{
    background-color: var(--color-player-2);
}

.v-enter-active, .v-leave-active {
    transition: all 0.5s ease;
}

.v-enter-from, .v-leave-to {
    opacity: 0;
}

.v-enter-to, .v-leave-from {
    opacity: 1;
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