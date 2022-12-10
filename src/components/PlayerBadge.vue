<template>
    <div class="player-badge" :class="(active) ? 'current-user' : ''">
        <span class="player-score">{{playerScore}}</span>
        <img src="https://as2.ftcdn.net/v2/jpg/03/35/34/35/1000_F_335343515_Frb5IFI9YnwHwYzP84ibjcMeCZFV1Cs6.jpg"/>
        <span class="player-name">{{playerName}}</span>
    </div>
</template>

<script>

export default{
    name: "PlayerBadge",
    props: {
        playerName: String,
        playerScore: Number,
        active: Boolean
    }
}

</script>

<style>
.player-badge {
    display: flex;
    flex-direction: column;
    position: relative;
    transition: all 0.2s ease-in;
}

.player-badge.player-badge.current-user {
    transform: scale(1.1);
}

.player-badge.current-user img {
    box-shadow: 0 0 20px 5px #fff
}

.player-badge img {
    max-width: 100px;
    width: 90%;
    border-radius: 50%;
    border: 5px solid var(--third-color);
    transition: all 0.2s ease-in;
}

.player-score {
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

.player-name {
    font-weight: bold;
    margin-top: 10px;
    text-align: center;
    margin-left: -10px;
}
</style>