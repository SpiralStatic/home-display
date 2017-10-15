<template>
	<el-row class="transport">
		<el-col :span="24">
			<el-card class="card-style">
				<div slot="header">
					<el-row type="flex" justify="space-between">
						<el-col :span="6"></el-col>
						<el-col :span="6">
							<span class="transport-title">Transport / Tube</span>
						</el-col>
						<el-col :span="6">
							<el-row type="flex">
								<el-select v-model="selectedRoutes" multiple filterable placeholder="Select Routes" id="selected_routes">
									<el-option-group :label="selectedGroups.tube" v-if="tubeData.length > 0">
										<el-option v-for="tubeLine in tubeData" :key="tubeLine.id"
											:label="tubeLine.name"
											:value="tubeLine.id">
										</el-option>
									</el-option-group>
									<el-option-group :label="selectedGroups.custom" v-if="customData.length > 0">
										<el-option v-for="customRoute in customData" :key="customRoute.id"
											:label="customRoute.name"
											:value="customRoute.id">
										</el-option>
									</el-option-group>
								</el-select>
								<el-button type="primary" icon="plus" class="add-route-btn" @click="addRouteDialogVisible = true"></el-button>
							</el-row>
						</el-col>
					</el-row>
  				</div>
				<div v-for="tubeLine in tubeData" :key="tubeLine.id" v-if="selectedRoutes.indexOf(tubeLine.id) !== -1">
					<el-button-group class="tube-styling">
						<el-button class="first-item" :style="{ 'background-color': getTubeColor(tubeLine.id) }">{{ tubeLine.name }}</el-button>
						<el-popover placement="bottom" width="600" popper-class="further-info"
							:disabled="tubeLine.lineStatuses[0].statusSeverity === 10"
							:content="tubeLine.lineStatuses[0].reason">
							<el-button slot="reference" class="second-item" :style="{ 'background-color': getTubeColor(tubeLine.id) }">{{ tubeLine.lineStatuses[0].reason }}</el-button>
						</el-popover>						
						<el-button :type="getStatusColor(tubeLine.lineStatuses[0].statusSeverity)" class="third-item">{{ tubeLine.lineStatuses[0].statusSeverityDescription }}</el-button>
					</el-button-group>
  				</div>
			</el-card>
		</el-col>

		<el-dialog title="Add custom route/s" :visible.sync="addRouteDialogVisible" size="large">
			<el-autocomplete
				v-model="routeToSearch"
				:fetch-suggestions="getRouteData"
				placeholder="Enter a valid route"
				@select="selectedRoute"
				:props="routeProperties">
				<template slot="prepend">New Route:</template>
			</el-autocomplete>

			<div v-for="(customRoute, key, index) in customData" :key="customRoute.id" id="custom_routes">
				<el-button-group class="route-styling">
					<el-button class="first-item" :style="{ 'background-color': getTubeColor(customRoute.modeName) }">{{ capitalise(customRoute.modeName) }}</el-button>	
					<el-button class="second-item" :style="{ 'background-color': getTubeColor(customRoute.modeName) }">{{ customRoute.name }}</el-button>
					<el-button class="third-item" icon="delete" @click="customData.splice(index, 1)"></el-button>
				</el-button-group>
			</div>

			<span slot="footer" class="dialog-footer">
				<el-button type="primary" @click="addRouteDialogVisible = false">Confirm</el-button>
			</span>
		</el-dialog>
	</el-row>
</template>

<script>
	const debounce = require('debounce');

	export default {
		name: 'transport',
		data () {
			return {
				tubeData: [],
				selectedRoutes: [],
				selectedGroups: {
					tube: 'Tube Lines',
					custom: 'Custom'
				},
				customData: [],
				addRouteDialogVisible: false,
				routeToSearch: '',
				routeProperties: {
					label: 'name'
				}
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
				default:
					return 'rgba(208, 26, 30, 0.85)';
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
			},
			getRouteData: debounce(function (searchTerm, callback) {
				this.$http
					.get('https://api.tfl.gov.uk/Line/' + searchTerm)
					.then((response) => {
						callback(response.data);
					},
					(err) => console.log(err));
			}, 2000),
			selectedRoute (route) {
				this.customData.push(route);
			},
			capitalise (input) {
				if (!input) return '';
				input = input.toString();
				return input.charAt(0).toUpperCase() + input.slice(1);
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
		
		.transport-title {
			line-height: 33px;
		}

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

		.last-item {
			float: right
		}
	}
</style>

<style lang="scss">
	@import '~@/assets/scss/_variables';

	#selected_routes {
		span {
			display: none;
		}
	}

	.el-button--primary.add-route-btn {
		background-color: $primary-color;
		border-color: $secondary-color;
	}

	.further-info {
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		color: #2c3e50;
		font-size: 1.1rem;
	}

	#custom_routes {
		margin: 2%;

		.route-styling {
			width: 100%;

			.first-item {
				width: 45%;
			}
			.second-item {
				width: 45%;
			}
			.third-item {
				width: 10%;
			}
		}
	}
</style>
