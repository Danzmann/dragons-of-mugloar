import Vue from 'vue';
import VueSweetalert2 from 'vue-sweetalert2';
import App from './App.vue';
import store from './store';

Vue.config.productionTip = false;
Vue.use(VueSweetalert2);

new Vue({
    store,
    render: h => h(App),
}).$mount('#app');
