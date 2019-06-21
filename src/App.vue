<template>
	<div id="app">
        <div class="header">
            <img alt="Dragons of Mulogar" src="./assets/logo.png">
        </div>
        <StartGame v-if='!this.isStarted' v-on:game-start="isStarted = true"/>
        <MainGame v-if='this.isStarted' msg="Welcome to Your Vue.js App"/>
	</div>
</template>

<script>
import MainGame from './components/MainGame.vue';
import StartGame from './components/StartGame.vue';

export default {
    name: 'app',

    // internal state is function, to save memory?
    data: () => ({
        isStarted: false,
    }),

    components: {
        MainGame,
        StartGame,
    },
};
</script>

<style lang="scss">
@import './styles/buttons.scss';
html {
    height: calc(100% - 16px);
    body {
        height: 100%;
        #app {
            height: 100%;

            font-family: "MedievalSharp";
            background-image: linear-gradient(
                    rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)
                ), url('./assets/background.jpg');
            background-size: cover;

            .header {
                text-align: center;
                color: #2c3e50;
            }

            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: center;
        }
    }
}
</style>
