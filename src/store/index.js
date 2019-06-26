import Vuex from 'vuex';
import Vue from 'vue';
import axios from 'axios';

export const API_URL = 'https://dragonsofmugloar.com/api/v2';

Vue.use(Vuex);

const initialPlayerState = {
    gameId: 0,
    lives: 0,
    gold: 0,
    level: 0,
    score: 0,
    highScore: 0,
    turn: 0,
};

export default new Vuex.Store({
    state: {
        playerInfo: initialPlayerState,
        adsList: [],
        selectedAd: -1,
    },
    mutations: {
        START_GAME: (state, info) => { state.playerInfo = info; },
        END_GAME: (state) => {
            state.playerInfo = initialPlayerState;
            state.selectedAd = -1;
        },
        SET_PLAYER_INFO: (state, info) => { state.playerInfo = { ...state.playerInfo, ...info }; },
        // For some reason, some tasks come as 'encrypted', not sure why but have to
        // filter these out
        GET_ADD_LIST: (state, list) => { state.adsList = list.filter(item => !item.encrypted); },
        SELECT_AD: (state, index) => { state.selectedAd = index; },
        SOLVED_ADD: (state, payload) => {
            const { adId, response } = payload;
            state.playerInfo = { ...state.playerInfo, ...response };
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
            try {
                let response = await axios.post(`${API_URL}/${context.state.playerInfo.gameId}/solve/${adId}/`);
                if (response.data.success) {
                    response = response.data;
                    context.commit('SOLVED_ADD', { adId, response });
                    context.dispatch('getAddsList');
                    resolve(true);
                } else {
                    context.commit('FAILED_ADD', adId);
                    context.dispatch('getAddsList');
                    resolve(false);
                }
            } catch (requestError) {
                reject(requestError);
                if (requestError.response.data.error === 'No ad by this ID exists') {
                    context.dispatch('getAddsList');
                }
            }
        }),
    },
    getters: {
        /**
         * @getter getDifficultyLevel will return the difficulty level in a scale from
         * 1 to 12 based on my own assumption of the pre-defined strings
         * @param index index of the ad in the adsList state
         */
        getDifficultyLevel: state => (index) => {
            const writtenLevels = [
                'piece of cake',
                'walk in the park',
                'quite likely',
                'sure thing',
                'hmmm....',
                'rather detrimental',
                'gamble',
                'risky',
                'playing with fire',
                'suicide mission',
                'impossible',
            ];
            return writtenLevels.indexOf(state.adsList[index].probability.toLowerCase()) + 1;
        },
    },
});
