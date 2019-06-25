<template>
    <div class="shop-wrapper">
        <div class="ads-scrolling-container" v-if="itemList.length > 0">
            <div class="ad-wrapper" v-for="(item, index) in itemList" v-bind:key="index">
                <div class="details-wrapper">
                    <div class="tooltip-wrapper">
                        <span class="cursive">{{'* '+itemList[index].name}}</span>
                        <span class="tooltip">{{itemList[index].name}}</span>
                    </div>
                </div>
                <div class="details-wrapper">
                    <span>Price: </span>
                    <span class="cursive">{{itemList[index].cost}}</span>
                </div>
                <div class="button-wrapper" v-on:click="buyItem(itemList[index].id)">
                    <a href="#" class="yellow-btn">Buy</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { mapState, mapMutations } from 'vuex';
import { API_URL } from '../store';

export default {
    name: 'ShopView',

    data() {
        return {
            itemList: [],
        };
    },

    mounted() {
        this.loadShopItems();
    },

    computed: {
        ...mapState(['playerInfo']),
    },

    methods: {
        ...mapMutations({ setInfo: 'SET_PLAYER_INFO' }),
        async loadShopItems() {
            const response = await axios.get(`${API_URL}/${this.playerInfo.gameId}/shop`);

            try {
                this.itemList = response.data;
            } catch (responseError) {
                console.error(responseError);
                this.$swal({
                    title: 'Oooppss',
                    text: 'An Unexpected error has occured \nThe gods of Mugloar are not happy today!',
                    type: 'error',
                });
            }
        },

        async buyItem(itemId) {
            const response = await axios.post(`${API_URL}/${this.playerInfo.gameId}/shop/buy/${itemId}`);

            try {
                if (response.data.shoppingSuccess) {
                    this.setInfo(response.data);
                    this.$swal(
                        {
                            title: 'Success',
                            text: 'Item purchased successfully',
                            type: 'success',
                        },
                    );
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
    },
};
</script>

<style scoped lang="scss">
@import '../styles/utilities.scss';

.shop-wrapper {
    background-image: url('../assets/scroll-background-2.png');
    background-repeat: no-repeat;
    background-size: cover;
    height: 600px;
    width: 450px;
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
