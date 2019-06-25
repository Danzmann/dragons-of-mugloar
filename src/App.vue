<template>
	<div id="app">
        <div class="header">
            <img alt="Dragons of Mulogar" src="./assets/logo.png">
        </div>
        <StartGame v-if='playerInfo.gameId === 0'/>
        <MainGame v-if='playerInfo.gameId !== 0'/>
	</div>
</template>

<script>
import { mapState } from 'vuex';
import MainGame from './components/MainGame.vue';
import StartGame from './components/StartGame.vue';

export default {
    name: 'app',

    computed: {
        ...mapState([
            'playerInfo',
        ]),
    },

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
