<template>
	<div class="home">
		<top-bar :location="location"></top-bar>
		<transport></transport>
	</div>
</template>

<script>
	import TopBar from './TopBar.vue';
	import Transport from './Transport.vue';

	export default {
		name: 'home',
		data () {
			return {
				msg: 'Welcome to Your Vue.js App',
				location: '39 Elthorne Avenue'
			};
		},
		components: {
			TopBar,
			Transport
		}
	};
</script>
