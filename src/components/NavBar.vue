<template>
	<div>
		<nav
			class="navbar is-primary"
			role="navigation"
			aria-label="main-navigation"
		>
			<router-link class="navbar-item" :to="{ name: 'register' }"
				>Register</router-link
			>
			<router-link class="navbar-item" :to="{ name: 'home' }">Home</router-link>
			<router-link class="navbar-item" :to="{ name: 'about' }"
				>About</router-link
			>
			<router-link class="navbar-item" :to="{ name: 'game' }">Game</router-link>
			<router-link class="navbar-item" :to="{ name: 'rankings' }"
				>Rankings</router-link
			>
		</nav>
	</div>
</template>
