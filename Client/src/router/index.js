import Vue from 'vue';
import VueRouter from 'vue-router';

import About from '../views/About.vue';
import Game from '../views/Game.vue';
import Rankings from '../views/Rankings.vue';
import Dashboard from '../views/Dashboard.vue';


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
		meta: { requiresAuth: true }
	},
	{
		path: '/dashboard',
		name: 'dashboard',
		component: Dashboard,
		meta: { requiresAuth: true }
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

router.beforeEach((to, from, next) => {
	const loggedIn = localStorage.getItem('user');
	if (to.matched.some(record => record.meta.requiresAuth) && !loggedIn) next('/');
	else next();

});

export default router;
