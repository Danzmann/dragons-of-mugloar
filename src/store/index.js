import Vuex from 'vuex';
import Vue from 'vue';
import axios from 'axios';

const API_URL = 'https://dragonsofmugloar.com/api/v2';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        playerInfo: {
            gameId: 0,
            lives: 0,
            gold: 0,
            level: 0,
            score: 0,
            highScore: 0,
            turn: 0,
        },
        adsList: [],
        selectedAd: -1,
    },
    mutations: {
        START_GAME: (state, info) => { state.playerInfo = info; },
        GET_ADD_LIST: (state, list) => { state.adsList = list; },
        SOLVED_ADD: (state, adId, reward) => {
            state.playerInfo = { ...state.playerInfo, ...reward };
            state.adsList = state.adsList.filter(item => (item.adId !== adId));
        },
        FAILED_ADD: (state, adId) => {
            state.playerInfo.lives -= 1;
            state.adsList = state.adsList.filter(item => (item.adId !== adId));
        },
    },
    actions: {
        /**
         * @function startGame http request for starting new game, added to actions
         * for code organizational purposes (called only once)
         */
        startGame: context => new Promise(async (resolve, reject) => {
            const response = await axios.post(`${API_URL}/game/start`);

            try {
                context.commit('START_GAME', response.data);
                resolve();
            } catch (requestError) {
                reject(requestError);
            }
        }),

        /**
         * @function getAddsList http request for getting task lists (ads) for game
         */
        getAddsList: context => new Promise(async (resolve, reject) => {
            const response = await axios.get(`${API_URL}/${context.state.playerInfo.gameId}/messages`);

            try {
                context.commit('GET_ADD_LIST', response.data);
                resolve();
            } catch (requestError) {
                reject(requestError);
            }
        }),

        /**
         * @function solveAdd http post request will attempt to solve requested ad by it's Id
         * @param adId id of ad to be solved
         */
        solveAdd: (context, adId) => new Promise(async (resolve, reject) => {
            let response = await axios.post(`${API_URL}/${context.state.playerInfo.gameId}/solve/${adId}/`);

            try {
                if (response.data.success) {
                    // Deletes keys that do not belong in playerInfo state object
                    response = delete response.message;
                    response = delete response.success;
                    context.commit('SOLVED_ADD', adId, response.data);
                } else {
                    context.commit('FAILED_ADD', adId);
                }
                resolve();
            } catch (requestError) {
                reject(requestError);
            }
        }),
    },
    getters: {
        
    },
});
