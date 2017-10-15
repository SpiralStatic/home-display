<template>
	<el-row class="transport">
		<el-col :span="24">
			<el-card class="card-style">
				<div slot="header" class="clearfix">
    				<span>Transport / Tube</span>
  				</div>
				<div v-for="tubeLine in tubeData" :key="tubeLine.id">
					<el-button-group class="tube-styling">
						<el-button class="first-item" :style="{ 'background-color': getTubeColor(tubeLine.id) }">{{ tubeLine.name }}</el-button>
						<el-popover
							placement="bottom"
							width="600"
							popper-class="further-info"
							:disabled="tubeLine.lineStatuses[0].statusSeverity === 10"
							:content="tubeLine.lineStatuses[0].reason">
							<el-button slot="reference" class="second-item" :style="{ 'background-color': getTubeColor(tubeLine.id)}">{{ tubeLine.lineStatuses[0].reason }}</el-button>
						</el-popover>						
						<el-button :type="getStatusColor(tubeLine.lineStatuses[0].statusSeverity)" class="third-item">{{ tubeLine.lineStatuses[0].statusSeverityDescription }}</el-button>
					</el-button-group>
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
			tubeData: ''
		};
	},
	methods: {
		getTubeData () {
			this.$http
				.get('https://api.tfl.gov.uk/Line/Mode/tube/Status?detail=true')
				.then((response) => {
					this.tubeData = response.data;
				},
				(err) => console.log(err));
		},
		getTubeColor (tubeLine) {
			if (!tubeLine) return '';

			switch (tubeLine) {
			case 'bakerloo':
				return 'rgba(179, 99, 5, 0.85)';
			case 'central':
				return 'rgba(227, 32, 23, 0.85)';
			case 'circle':
				return 'rgba(255, 211, 0, 0.85)';
			case 'district':
				return 'rgba(0, 120, 42, 0.85)';
			case 'hammersmith-city':
				return 'rgba(243, 169, 187, 0.85)';
			case 'jubilee':
				return 'rgba(160, 165, 169, 0.85)';
			case 'metropolitan':
				return 'rgba(155, 0, 86, 0.85)';
			case 'northern':
				return 'rgba(0, 0, 0, 0.85)';
			case 'piccadilly':
				return 'rgba(0 ,54, 136, 0.85)';
			case 'victoria':
				return 'rgba(0, 152, 212, 0.85)';
			case 'waterloo-city':
				return 'rgba(149, 205, 186, 0.85)';
			}
		},
		getStatusColor (status) {
			if (!status) return '';

			switch (status) {
			case 10:
				return 'success';
			case 5:
				return 'warning';
			case 20:
				return 'danger';
			}
		}
	},
	created () {
		this.getTubeData();
	}
};
</script>

<style lang="scss" scoped>
	.transport {
		margin-bottom: 2em;
		
		.card-style {
			background-color: rgba(255, 255, 255, 0.7);
			.tube-styling {
				width: 100%;

				.el-button {
					color: black;
					min-height: 3em;
					margin: 0.2em 0;
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
				}

				.first-item {
					width: 15%;
				}
				.second-item {
					width: 70%;
				}
				.third-item {
					width: 15%;
				}
			}
		}
}
</style>
