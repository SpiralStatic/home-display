<template>
	<el-row class="transport">
		<el-col v-for="day in limit(days, 0, 6)" :key="day.id" :span="4">
			<el-card class="card-style">
				<span>{{ day }}</span>
			</el-card>
		</el-col>
	</el-row>
</template>

<script>
export default {
	name: 'calender',
	data () {
		return {
			days: [
				1, 2, 3, 4, 5, 6, 7
			]
		};
	},
	methods: {
		limit: function (array, start, limit) {
			return array.slice(start, limit);
		}
	}
};
</script>

<style lang="scss" scoped>
	.card-style {
		margin: 0.2rem;
	}
</style>
