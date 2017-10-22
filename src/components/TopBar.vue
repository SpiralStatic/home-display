<template>
	<el-menu theme="dark" class="navbar" :default-active="activeIndex" mode="horizontal" @select="handleSelect">
		<el-menu-item index="1">{{ location }}</el-menu-item>
		<el-submenu index="2">
			<template slot="title">Users</template>
			<el-menu-item index="2-1">Chris</el-menu-item>
			<el-menu-item index="2-2">Laura</el-menu-item>
			<el-menu-item index="2-3">Rebecca</el-menu-item>
			<el-menu-item index="2-4">Serban</el-menu-item>
		</el-submenu>
		<el-menu-item index="5" class="last-item">
			<a href="https://vuejs.org/" class="remove-link-styling">
				<span>Powered By</span>
				<img src="../assets/images/logo.png" class="vue-logo">
			</a>
		</el-menu-item>
		<el-menu-item index="4" class="last-item">
			<span>{{ dateTime | moment("HH:mm - DD/MM/YYYY") }}</span>
		</el-menu-item>
		<el-menu-item index="3" class="last-item">
			<weather-widget />
		</el-menu-item>
	</el-menu>
</template>

<script>
	import WeatherWidget from './WeatherWidget';

	export default {
		name: 'TopBar',
		components: {
			'weather-widget': WeatherWidget
		},
		data () {
			return {
				activeIndex: '1',
				dateTime: new Date(),
				location: '39 Elthorne Avenue'
			};
		},
		methods: {
			handleSelect (key, keyPath) {
				console.log(key, keyPath);
			},
			updateDateTime () {
				this.dateTime = new Date();
			}
		},
		mounted () {
			setInterval(this.updateDateTime, 60000);
		}
	};
</script>

<style lang="scss" scoped>
	.navbar {
		margin-bottom: 2em;

		.last-item {
			float: right;
		}

		.vue-logo {
			height: 30px;
		}

		.remove-link-styling {
			color: inherit;
			text-decoration: inherit;
		}
	}
</style>
