<template>
    <div class="adds-wrapper">
        <div class="ads-scrolling-container">
            <div class="details-wrapper">
                <span>Reward: </span>
                <div class="tooltip-wrapper">
                    <span class="cursive">{{adsList[selectedAd].reward}}</span>
                    <span class="tooltip">{{adsList[selectedAd].reward}}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'AdsView',
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
        height: 100%;
        padding: 17px;
        overflow-y: auto;
        overflow-x: hidden;

        // generalize
        .details-wrapper {
            display: flex;
            span {
                margin-left: 10px;
            }
        }
    }
}

</style>
