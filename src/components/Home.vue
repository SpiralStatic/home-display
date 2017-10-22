<template>
	<div class="home">
		<top-bar :location="location"></top-bar>
		<transport></transport>
		<calender></calender>
	</div>
</template>

<script>
	import TopBar from './TopBar.vue';
	import Transport from './Transport.vue';
	import Calender from './Calender.vue';

	export default {
		name: 'Home',
		data () {
			return {
				msg: 'Welcome to Your Vue.js App',
				location: '39 Elthorne Avenue'
			};
		},
		components: {
			TopBar,
			Transport,
			Calender
		}
	};
</script>
