import Vue from 'vue';
import VueRouter from 'vue-router';

import About from '../views/About.vue';
import Game from '../views/Game.vue';
import Rankings from '../views/Rankings.vue';
import RegisterUser from '../views/RegisterUser.vue';

Vue.use(VueRouter);

const routes = [
	{
		path: '/',
		component: About,
	},
	{
		path: '/about',
		name: 'about',
		component: About,
	},
	{
		path: '/game',
		name: 'game',
		component: Game,
	},
	{
		path: '/rankings',
		name: 'rankings',
		component: Rankings,
	},
	{
		path: '/register',
		name: 'register',
		component: RegisterUser,
	},
	{
		path: '*',
		component: About,
	},
];

const router = new VueRouter({
	mode: 'history',
	linkExactActiveClass: 'is-active',
	routes,
});

export default router;
