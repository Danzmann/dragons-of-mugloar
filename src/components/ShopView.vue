<template>
    <div class="scroll-wrapper">
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
                            toast: true,
                            timer: 3000,
                            position: 'bottom-end',
                            showConfirmButton: false,
                        },
                    );
                } else {
                    this.$swal(
                        {
                            title: 'Oopsie',
                            text: 'You do not have enough gold!',
                            type: 'error',
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
@import '../styles/scroll-wrapper.scss';

</style>
