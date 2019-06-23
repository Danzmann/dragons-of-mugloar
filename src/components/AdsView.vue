<template>
    <div class="adds-wrapper">
        <div class="ads-scrolling-container" v-if="adsList.length > 0">
            <div class="ad-wrapper" v-for="(ad, index) in adsList" v-bind:key="index" v-on:click="selectAd(index)">
                <div class="details-wrapper">
                    <div class="tooltip-wrapper">
                        <span class="cursive">{{'* '+adsList[index].message}}</span>
                        <span class="tooltip">{{adsList[index].message}}</span>
                    </div>
                </div>
                <div class="details-wrapper">
                    <span>Risk: </span>
                    <span class="cursive">{{'X '.repeat(getDifficultyLevel(index))}}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex';

export default {
    name: 'AdsView',

    data() {
        return {
            selectedAd: -1,
        };
    },

    computed: {
        ...mapState([
            'adsList',
        ]),
        ...mapGetters([
            'getDifficultyLevel',
        ]),
    },

    methods: {
        ...mapMutations({
            selectAd: 'SELECT_AD',
        }),
    },
};
</script>

<style scoped lang="scss">
@import '../styles/utilities.scss';

.adds-wrapper {
    background-image: url('../assets/scroll-background-2.png');
    background-repeat: no-repeat;
    background-size: cover;
    height: 600px;
    width: 450px;
    overflow: hidden;

    .ads-scrolling-container {
        height: calc(100% - 220px);
        padding: 30px;
        padding-right: 0;
        margin-top: 75px;
        overflow-y: auto;
        overflow-x: hidden;

        display: flex;
        flex-direction: column;

        .ad-wrapper {
            cursor: pointer;
            width: calc(100% - 50px);
            margin-top: 10px;
            margin-bottom: 5px;
            display: flex;
            flex-direction: column;
            border-top: 1px solid black;
            // generalize
            .details-wrapper {
                margin-top: 5px;
                display: flex;
                align-items: center;
                span {
                    margin-left: 10px;
                }
            }
        }
    }
}

</style>
