<template>
    <div class="window-wrapper">
        <div class="main-game-wrapper">
            <AdsView />
            <div class="info-wrapper">
                <div class="player-header-info">
                    <h2>Player Status</h2>
                    <table class="player-info">
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
                </div>
                <div class="ad-info">
                    <div class="ad-info-header">
                        <h3 v-if="selectedAd === -1">Choose an ad in the list on the left</h3>
                        <!-- Wrapper for tooltip of cursive writting (in case of
                        difficulty in reading), tooltip with regular text appears on mouse hover -->
                        <div class="tooltip-wrapper" v-if="selectedAd >= 0">
                            <h3 class="cursive">{{adsList[selectedAd].message}}</h3>
                            <h3 class="tooltip">{{adsList[selectedAd].message}}</h3>
                        </div>
                        <div class="ad-details" v-if="selectedAd >= 0">
                            <div class="details-wrapper">
                                <span>Reward: </span>
                                <div class="tooltip-wrapper">
                                    <span class="cursive">{{adsList[selectedAd].reward}}</span>
                                    <span class="tooltip">{{adsList[selectedAd].reward}}</span>
                                </div>
                            </div>
                            <div class="details-wrapper">
                                <span>Expires in: </span>
                                <div class="tooltip-wrapper">
                                    <span class="cursive">{{adsList[selectedAd].expiresIn}}</span>
                                    <span class="tooltip">{{adsList[selectedAd].expiresIn}}</span>
                                </div>
                            </div>
                            <div class="details-wrapper">
                                <span>Risk: </span>
                                <div class="tooltip-wrapper">
                                    <span class="cursive">{{adsList[selectedAd].probability}}</span>
                                    <span class="tooltip">{{adsList[selectedAd].probability}}</span>
                                </div>
                            </div>
                            <div class="details-wrapper">
                                <span>Tip: </span>
                                <div class="tooltip-wrapper">
                                    <!--<span class="cursive">{{adsList[selectedAd].probability}}</span>-->
                                    <!--<span class="tooltip">{{adsList[selectedAd].probability}}</span>-->
                                </div>
                            </div>
                            <div class="button-wrapper" v-on:click="solveAdd(adsList[selectedAd].adId)">
                                <a href="#" class="yellow-btn">Solve task</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ShopView />
        </div>
        <div class="footer">
            <span>Assets by:</span>
            <a href="https://pngtree.com/">Graphics from pngtree.com</a>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import AdsView from './AdsView.vue';
import ShopView from './ShopView.vue';

export default {
    name: 'MainGame',
    props: {
        msg: String,
    },

    computed: {
        ...mapState([
            'playerInfo',
            'selectedAd',
            'adsList',
        ]),
    },

    mounted() {
        //console.log(this.playerInfo);
    },

    methods: {
        ...mapActions(['solveAdd']),
    },

    components: {
        AdsView,
        ShopView,
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
                // generalize
                .player-header-info {
                    display: flex;
                    flex-direction: column;
                    align-items: center;

                    h2 {
                        margin-bottom: 5px;
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
                // generalize
                .ad-info {
                    margin-left: 50px;
                    margin-right: 40px;
                    min-width: 390px;
                    min-height: 270px;
                    background-image: url('../assets/parchment-background-1.png');
                    background-size: cover;
                    padding: 15px;

                    .ad-info-header {
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                    }

                    .ad-details {
                        margin-top: 10px;
                        display: flex;
                        flex-direction: column;
                        align-items: left;
                        justify-content: flex-start;
                        width: 90%;

                        // generalize
                        .details-wrapper {
                            display: flex;
                            align-items: center;
                            span {
                                margin-left: 10px;
                            }
                        }

                        .button-wrapper {
                            margin-top: 5px;
                        }
                    }
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
