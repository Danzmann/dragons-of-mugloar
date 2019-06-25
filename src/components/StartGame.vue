<template>
    <div class="start-game-wrapper">
        <span>Are you ready to start?</span>

        <div v-on:click="beginGame()" class="start-game-buttons">
            <a href="#" class="yellow-btn">Start</a>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
    name: 'start',

    methods: {
        ...mapActions(['startGame', 'getAddsList']),

        async beginGame() {
            await this.startGame();
            this.getAddsList();
        },
    },
};

</script>

<style lang="scss">
    .start-game-wrapper {

        background-image: url('../assets/scroll-background-1.png');

        height: 600px;
        width: 520px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        span {
            font-size: 30px;
            font-weight: 600;
        }

        .start-game-buttons {

            margin-top: 50px;

            width: 100%;
            display: flex;
            justify-content: center;
        }
    }
</style>
