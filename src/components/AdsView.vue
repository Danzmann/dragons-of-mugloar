<template>
    <div class="scroll-wrapper">
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
@import '../styles/scroll-wrapper.scss';

</style>
