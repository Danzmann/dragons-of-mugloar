<template>
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
                <div class="button-wrapper"
                    v-on:click="solveTask(adsList[selectedAd].adId)">
                    <a href="#" class="yellow-btn">Solve task</a>
                </div>
            </div>
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

export default {
    name: 'GameAdCard',

    data() {
        return {
            tipForSelectedAd: '',
            lockSolveAdTimer: null,
        };
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
            if (this.lockSolveAdTimer) {
                return;
            }
            // Lock to avoid accidental multiple clicks
            this.lockSolveAdTimer = setTimeout(() => { this.lockSolveAdTimer = null; }, 800);

            try {
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
            } catch (responseError) {
                console.error(responseError);
                this.$swal({
                    title: 'Oooppss',
                    text: 'An Unexpected error has occured \nThe gods of Mugloar are not happy today!',
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
                lowLives: [
                    'Looks easy but you only have one life chap',
                    'With one life, look for the easiest task \'till you can buy a healing potion, you never know when you can slip on a puddle and break your neck',
                ],
                lowLivesHighGold: [
                    'Chap, buy yourself some healing potion first',
                    'You got yourself one life left, enough to buy healing potion, and you\'re still going for this thing? You got a deathwish buddy',
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

            if (risk > 5 && lives === 1) {
                selectedTipsArray = tips.highRiskLowLife;
            } else if (lives === 1 && this.playerInfo.gold >= 50) {
                selectedTipsArray = tips.lowLivesHighGold;
            } else if (risk > 4 && lives === 2) {
                selectedTipsArray = tips.highRisk;
            } else if (risk > 2 && lives > 2) {
                selectedTipsArray = tips.mediumRisk;
            } else if (lives === 1) {
                selectedTipsArray = tips.lowLives;
            } else if ((risk > 1 && lives <= 3 && lives >= 2) || (risk > 4 && lives > 3)) {
                selectedTipsArray = tips.lowRisk;
            } else {
                selectedTipsArray = tips.veryLowRisk;
            }
            this.tipForSelectedAd = selectedTipsArray[
                Math.floor(Math.random() * selectedTipsArray.length)
            ];
        },
    },

    watch: {
        /**
         * @watcher selectedAd will watch for changes of another ad selected and generate tip
         */
        selectedAd(newValue, oldValue) {
            if (newValue !== oldValue) {
                this.generateTip(this.getDifficultyLevel(newValue));
            }
        },
        /**
         * @watcher adsList will watch for changes in ads list, as it is reloaded after every
         * attempt to solve ad
         */
        adsList(newValue, oldValue) {
            if (newValue.length !== oldValue.length) {
                this.generateTip(this.getDifficultyLevel(this.selectedAd));
            }
        },
    },
};
</script>

<style lang="scss">
@import '../styles/utilities.scss';

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
</style>