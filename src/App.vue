<template>
	<div id="app">
        <!--<div class="app-wrapper">-->
            <div class="header">
                <img alt="Dragons of Mulogar" src="./assets/logo.png">
            </div>
            <HelloWorld msg="Welcome to Your Vue.js App"/>
        <!--</div>-->
	</div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue';

export default {
    name: 'app',

    // internal state is function, to save memory?
    data: () => ({
        isStarted: false,
    }),

    components: {
        HelloWorld,
    },
};
</script>

<style lang="scss">
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
