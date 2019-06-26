<template>
    <div class="window-wrapper">
        <div class="main-game-wrapper">
            <AdsView />
            <div class="info-wrapper">
                <div class="player-header-info">
                    <div class="title-wrapper">
                        <span
                            v-bind:class="{ active : !this.switchReputationStatus }"
                            v-on:click="switchPlayerStats"
                        >
                            Player Status
                        </span>
                        <span
                            v-bind:class="{ active : this.switchReputationStatus }"
                            v-on:click="switchPlayerStats"
                        >
                            Player Reputation
                        </span>
                    </div>
                    <table v-if="!this.switchReputationStatus" class="player-info">
                        <tbody>
                            <tr class="handwritten-border">
                                <td class="lined thin"> Lives </td>
                                <td class="lined thin"> {{playerInfo.lives}} </td>
                            </tr>
                            <tr class="handwritten-border">
                                <td class="lined thin"> Gold </td>
                                <td class="lined thin"> {{playerInfo.gold}} </td>
                            </tr>
                            <tr class="handwritten-border">
                                <td class="lined thin"> Score </td>
                                <td class="lined thin"> {{playerInfo.score}} </td>
                            </tr>
                            <tr class="handwritten-border">
                                <td class="lined thin"> Turn </td>
                                <td class="lined thin"> {{playerInfo.turn}} </td>
                            </tr>
                            <tr class="handwritten-border">
                                <td class="lined thin"> Level </td>
                                <td class="lined thin"> {{playerInfo.level}} </td>
                            </tr>
                        </tbody>
                    </table>
                    <table v-if="this.switchReputationStatus" class="player-info">
                        <tbody>
                            <tr class="handwritten-border">
                                <td class="lined thin"> Underworld </td>
                                <td class="lined thin">{{repUnderworld}}</td>
                            </tr>
                            <tr class="handwritten-border">
                                <td class="lined thin"> State </td>
                                <td class="lined thin">{{repState}}</td>
                            </tr>
                            <tr class="handwritten-border">
                                <td class="lined thin"> People </td>
                                <td class="lined thin">{{repPeople}}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <GameAdCard />
            </div>
            <ShopView />
        </div>
        <div class="footer">
            <span>Copyright</span>
            <br/>
            <span>Assets by:</span>
            <a href="https://pngtree.com/">Background graphics from pngtree.com</a>
            <br/>
            <p>
            'Dragons of Mugloar' intellectual property and logo property of Big Bank AS,
            used only under purpose of accomplishing specified task on
            <a href="https://www.dragonsofmugloar.com/">dragonsofmugloar</a>
            requested by BigBank for application to front-end developer position
            </p>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { mapState } from 'vuex';
import { API_URL } from '../store';
import AdsView from './AdsView.vue';
import ShopView from './ShopView.vue';
import GameAdCard from './GameAdCard.vue';

export default {
    name: 'MainGame',

    computed: {
        ...mapState([
            'playerInfo',
            'selectedAd',
            'adsList',
        ]),
    },

    data() {
        return {
            // When true, will replace player stats parchment card with reputation
            // and vice versa
            switchReputationStatus: false,
            repUnderworld: 0,
            repState: 0,
            repPeople: 0,
        };
    },

    methods: {
        /**
         * @method switchPlayerStats switch between 'Player Status' or 'Player Reputation' in the
         * player info card, on switching between status to reputation, run reputation investigation
         * from the API
         */
        async switchPlayerStats(event) {
            if (!event.target.classList.contains('active')) {
                this.switchReputationStatus = !this.switchReputationStatus;
                if (this.switchReputationStatus) {
                    const {
                        data: {
                            underworld,
                            state,
                            people,
                        },
                    } = await axios.post(`${API_URL}/${this.playerInfo.gameId}/investigate/reputation/`);

                    this.repUnderworld = underworld;
                    this.repState = state;
                    this.repPeople = people;
                }
            }
        },
    },

    components: {
        AdsView,
        ShopView,
        GameAdCard,
    },
};
</script>

<style scoped lang="scss">
    @import '../styles/utilities.scss';

    .window-wrapper {
        .main-game-wrapper {
            max-width: 1300px;
            min-width: 1000px;
            height: 600px;
            display: flex;
            flex-direction: row;
            justify-content: space-between;

            .info-wrapper {
                min-width: 200px;
                display: flex;
                flex-direction: column;
                justify-content: space-evenly;
                align-items: center;
                .player-header-info {
                    display: flex;
                    flex-direction: column;
                    align-items: center;

                    .title-wrapper {
                        margin-top: 15px;
                        margin-bottom: 2px;
                        display: flex;
                        align-items: center;
                        span {
                            // margin: top right bottom left
                            margin: 8px 5px 0 5px;
                            font-weight: 600;
                            font-size: 17px;
                            cursor: pointer;
                            color: grey;
                        }

                        span.active {
                            font-size: 20px;
                            cursor: initial;
                            color: initial;
                        }
                    }

                    .player-info {
                        td {
                            min-width: 100px;
                            padding-left: 10px;
                        }
                        font-size: 17px;
                    }

                    margin-left: 30px;
                    margin-right: 30px;
                    min-width: 320px;
                    min-height: 220px;
                    background-image: url('../assets/parchment-background-1.png');
                    background-size: cover;
                }

            }
        }
        .footer {
            margin-top: 10px;
            text-align: center;
            font-size: 12px;
            height: 50px;
        }
    }
</style>
