<template>
	<div class="main-game-wrapper">
		<AdsView />
        
        <ShopView />
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

<style scoped>
	h3 {
		margin: 40px 0 0;
	}
	ul {
		list-style-type: none;
		padding: 0;
	}
	li {
		display: inline-block;
		margin: 0 10px;
	}
	a {
		color: #42b983;
	}
</style>
