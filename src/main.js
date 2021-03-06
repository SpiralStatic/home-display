// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import Element from 'element-ui';
import VueResource from 'vue-resource';
import Moment from 'vue-moment';
import 'vue-awesome/icons';
import Icon from 'vue-awesome/components/Icon';

Vue.config.productionTip = false;

Vue.use(VueResource);
Vue.use(Element);
Vue.use(Moment);
Vue.component('icon', Icon);

/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	template: '<App/>',
	components: { App }
});

import 'element-ui/lib/theme-chalk/index.css';
