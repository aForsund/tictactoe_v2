import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import About from '../views/About.vue';
import Game from '../views/Game.vue';
import Rankings from '../views/Rankings.vue';
import RegisterUser from '../views/RegisterUser.vue';

Vue.use(VueRouter);

const routes = [
	{
		path: '/',
		name: 'home',
		component: Home,
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
];

const router = new VueRouter({
	mode: 'history',
	routes,
});

export default router;
