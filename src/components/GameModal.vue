<template>
    <div class="backdrop-modal">
        <div class="modal">
            <h2>{{title}}</h2>
            <slot />
            <button @click="close()">Continuer</button>
        </div>
    </div>
</template>

<script>
export default{
    name: "GameModal",
    props: {
        title: String
    },
    methods: {
        close(){
            this.$emit("closeModal");
        }
    }
}
</script>

<style>

.backdrop-modal{
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.3);
}

.modal{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    max-width: 400px;
    width: 90%;
    background-color: var(--third-color);
    border-radius: 10px;
    padding: 20px;
}

.modal h2{
    font-size: 2em;
}

.modal button{
    font-size: 1.2em;
    border: none;
    background-color: var(--secondary-color);
    color: #FFF;
    padding: 7px 20px;
    border-radius: 10px;
    margin-top: 20px;
    cursor: pointer;
}

.modal form{
    display: flex;
    flex-direction: column;
}

.modal input{
    width: 80%;
    margin: 7px auto;
    padding: 5px;
    font-size: 1em;
}
</style>