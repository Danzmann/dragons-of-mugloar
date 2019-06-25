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
                                    <span class="cursive">{{this.tipForSelectedAd}}</span>
                                    <span class="tooltip">{{this.tipForSelectedAd}}</span>
                                </div>
                            </div>
                            <div class="button-wrapper" v-on:click="solveTask(adsList[selectedAd].adId)">
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
import {
    mapState,
    mapActions,
    mapGetters,
    mapMutations,
} from 'vuex';
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
        ...mapGetters([
            'getDifficultyLevel',
        ]),
    },

    data() {
        return {
            tipForSelectedAd: '',
        };
    },

    methods: {
        ...mapActions(['solveAdd']),
        ...mapMutations({
            endGame: 'END_GAME',
        }),

        /**
         * @method solveTask will dispatch action solveAd to attempt the specified task by Id,
         * gives feedback to user with sweetalert depending on successfull realization of task
         * @param adId id of ad to be solved
         */
        async solveTask(adId) {
            const success = await this.solveAdd(adId);
            if (success) {
                this.$swal({
                    title: 'Success',
                    text: 'Mission completed successfully\n',
                    type: 'success',
                    toast: true,
                    position: 'bottom-end',
                    timer: 3000,
                    showConfirmButton: false,
                });
            } else if (this.playerInfo.lives === 0) {
                this.$swal({
                    title: 'Nooooooooo',
                    text: 'You are dead :(',
                    type: 'error',
                });
                this.endGame();
            } else {
                this.$swal({
                    title: 'Noooooo',
                    text: 'You have failed this task\n',
                    type: 'error',
                });
            }
        },

        /**
         * @method generateTip will generate a tip according to the risk of task and remaining
         * lives, updates local data 'tipForSelectedAd' for showing tip (needed local variable
         * as tip is used twice for cursive span and tooltip translation)
         * @param risk Risk of specified task
         */
        generateTip(risk) {
            const tips = {
                highRiskLowLife: [
                    'Are you insane? You have one life left and you want to do this???',
                    'You sir have only one life left, for this task, pray for the Gods of Mugloar or you will meet them personally',
                ],
                highRisk: [
                    'You enjoy playing with one life huh?',
                    'As The Great Soldier of Gordocht once said \'Great man are forged by doing the impossible missions\', and then he died',
                ],
                mediumRisk: [
                    'It may be a good idea',
                    'Why not',
                ],
                lowRisk: [
                    'If it pays well... go for it',
                    'Looks easy enough, it\'s worth it',
                ],
                veryLowRisk: [
                    'It\'s worth doing this task is it pays well enough... That is, 1 gold or more',
                    'Pffffffff, child\'s play',
                    'My son can do this task... And he isn\'t even born yet',
                ],
            };

            let selectedTipsArray = tips.mediumRisk;
            const { lives } = this.playerInfo;

            if (risk > 4 && lives === 1) {
                selectedTipsArray = tips.highRiskLowLife;
            } else if (risk > 4 && lives === 2) {
                selectedTipsArray = tips.highRisk;
            } else if (risk > 2 && lives > 2) {
                selectedTipsArray = tips.mediumRisk;
            } else if ((risk > 1 && lives <= 3 && lives >= 2) || (risk > 4 && lives > 3)) {
                selectedTipsArray = tips.lowRisk;
            } else {
                selectedTipsArray = tips.veryLowRisk;
            }
            this.tipForSelectedAd = selectedTipsArray[Math.floor(Math.random() * selectedTipsArray.length)];
        },
    },

    watch: {
        /**
         * @function selectedAd will watch for changes of another ad selected and generate tip
         */
        selectedAd(newValue, oldValue) {
            if (newValue !== oldValue) {
                this.generateTip(this.getDifficultyLevel(newValue));
            }
        },
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
