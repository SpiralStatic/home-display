<template>
	<el-menu theme="dark" class="navbar" :default-active="activeIndex" mode="horizontal" @select="handleSelect">
		<el-menu-item index="1">{{ location }}</el-menu-item>
		<el-submenu index="2">
			<template slot="title">Workspace</template>
			<el-menu-item index="2-1">item one</el-menu-item>
			<el-menu-item index="2-2">item two</el-menu-item>
			<el-menu-item index="2-3">item three</el-menu-item>
		</el-submenu>
		<el-menu-item index="3" class="last-item">
			<a href="https://vuejs.org/" class="remove-link-styling">
				<span>Powered By</span>
				<img src="../assets/images/logo.png" class="vue-logo">
			</a>
		</el-menu-item>
	</el-menu>
</template>

<script>
	export default {
		name: 'topbar',
		data () {
			return {
				activeIndex: '1',
				location: '39 Elthorne Avenue'
			};
		},
		methods: {
			handleSelect (key, keyPath) {
				console.log(key, keyPath);
			}
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
