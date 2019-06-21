import Vuex from 'vuex';
import Vue from 'vue';
import axios from 'axios';

const API_URL = 'https://dragonsofmugloar.com/api/v2/';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        playerInfo: {
            id: 0,
            lives: 0,
            gold: 0,
            level: 0,
            score: 0,
            highScore: 0,
            turn: 0,
        },
    },
    mutations: {
        START_GAME: (state, info) => { state.playerInfo = info; },
    },
    actions: {
        /**
         * @function startGame http request for starting new game, added to actions
         * for code organizational purposes (called only once)
         */
        startGame: context => new Promise(async (resolve, reject) => {
            const response = await axios.post(`${API_URL}game/start`);

            try {
                context.commit('START_GAME', response.data);
                resolve();
            } catch (requestError) {
                reject(requestError);
            }
        }),
    },
    getters: {

    },
});
