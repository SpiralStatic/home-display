<template>
	<el-row class="transport">
		<el-col :span="24">
			<el-card>
				<div>
					<span>Transport</span>
					<div class="bottom clearfix">
						<el-button type="text" class="button" v-on:click="getTubeData()">Get Quote</el-button>
						<span>{{ quote }}</span>
					</div>
				</div>
			</el-card>
		</el-col>
	</el-row>
</template>

<script>
export default {
	name: 'transport',
	data () {
		return {
			quote: ''
		};
	},
	methods: {
		getTubeData () {
			this.$http
				.get('http://localhost:3001/api/random-quote', (data) => {
					this.quote = data;
				})
				.error((err) => console.log(err));
		}
	}
};
</script>
