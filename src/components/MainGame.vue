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
import { mapState } from 'vuex';
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
        ]),
    },

    components: {
        AdsView,
        ShopView,
    },
};
</script>

<style scoped lang="scss">
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
                    min-width: 300px;
                    min-height: 220px;
                    background-image: url('../assets/parchment-background-1.png');
                    background-size: cover;
                }
                .ad-info {
                    margin-left: 30px;
                    margin-right: 30px;
                    min-width: 300px;
                    min-height: 300px;
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
