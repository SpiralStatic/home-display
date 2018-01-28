<template>
	<el-row class="transport">
		<el-col :span="24">
			<el-card class="card-style">
				<div slot="header">
					<el-row type="flex" justify="space-between">
						<el-col :span="6"></el-col>
						<el-col :span="6">
							<strong class="transport-title">Transport</strong>
						</el-col>
						<el-col :span="6">
							<el-row type="flex">
								<el-select v-model="selectedRoutes" multiple filterable collapse-tags placeholder="Select Routes" id="selected_routes">
									<el-option-group :label="selectedGroups.tube" v-if="transportData.length > 0">
										<el-option v-for="tube in transportData" :key="tube.id" v-if="tube.modeName === 'tube'"
											:label="tube.name"
											:value="tube.id">
										</el-option>
									</el-option-group>
									<el-option-group :label="selectedGroups.custom" v-if="transportData.length > 0">
										<el-option v-for="customRoute in transportData" :key="customRoute.id" v-if="customRoute.modeName !== 'tube'"
											:label="customRoute.name"
											:value="customRoute.id">
										</el-option>
									</el-option-group>
								</el-select>
								<el-button type="primary" icon="el-icon-plus"  @click="addRouteDialogVisible = true"></el-button>
							</el-row>
						</el-col>
					</el-row>
  				</div>
				<div v-for="route in transportData" :key="route.id" v-if="selectedRoutes.indexOf(route.id) !== -1">
					<el-button-group class="tube-styling">
						<el-button class="first-item" :style="{ 'box-shadow': `0 8px 0 -4px ${getRouteColor(route.id)} inset, 0 -8px 0 -4px ${getRouteColor(route.id)} inset` }">{{ route.name }}</el-button>
						<el-popover placement="bottom" width="600" popper-class="further-info"
							:disabled="route.lineStatuses[0].statusSeverity === 10"
							:content="route.lineStatuses[0].reason">
							<el-button slot="reference" class="second-item" :style="{ 'box-shadow': `0 8px 0 -4px ${getRouteColor(route.id)} inset, 0 -8px 0 -4px ${getRouteColor(route.id)} inset` }">{{ route.lineStatuses[0].reason }}</el-button>
						</el-popover>						
						<el-button :type="getStatusColor(route.lineStatuses[0].statusSeverity)" class="third-item" >{{ route.lineStatuses[0].statusSeverityDescription }}</el-button>
					</el-button-group>
  				</div>
			</el-card>
		</el-col>

		<el-dialog title="Add custom route/s" :visible.sync="addRouteDialogVisible">
			<el-autocomplete
				v-model="routeToSearch"
				:fetch-suggestions="fetchRouteData"
				placeholder="Enter a valid route"
				@select="selectedRoute"
				valueKey="name">
				<template slot="prepend">New Route:</template>
			</el-autocomplete>

			<div v-for="(customRoute, key, index) in transportData" :key="customRoute.id" id="custom_routes" v-if="customRoute.modeName !== 'tube'">
				<el-button-group class="route-styling">
					<el-button class="first-item" :style="{ 'background-color': getRouteColor(customRoute.modeName) }">{{ capitalise(customRoute.modeName) }}</el-button>	
					<el-button class="second-item" :style="{ 'background-color': getRouteColor(customRoute.modeName) }">{{ customRoute.name }}</el-button>
					<el-button class="third-item" icon="el-icon-delete" @click="transportData.splice(index, 1)"></el-button>
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
	import getRouteColor from '../mixins/GetRouteColor';
	import capitalise from '../mixins/Capitalise';

	export default {
		name: 'Transport',
		data () {
			return {
				addRouteDialogVisible: false,
				routeToSearch: '',
				selectedGroups: {
					tube: 'Tube Lines',
					custom: 'Custom'
				},
				selectedRoutes: [],
				transportData: []
			};
		},
		mixins: [getRouteColor, capitalise],
		methods: {
			fetchRouteData: debounce(function (searchTerm, callback) {
				if (!searchTerm) return;

				this.$http
					.get('https://api.tfl.gov.uk/Line/' + searchTerm)
					.then((response) => {
						console.log(response);
						callback(response.data);
					},
					(err) => console.log(err));
			}, 2000),
			getRoute (route) {
				return this.$http
					.get('https://api.tfl.gov.uk/Line/' + route)
					.then((response) => {
						return response.data;
					},
					(err) => console.log(err));
			},
			getStatusColor (status) {
				if (!status) return '';

				switch (status) {
					case 10:
						return 'success';
					case 5:
					case 9:
						return 'warning';
					case 20:
						return 'danger';
				}
			},
			getTubeData () {
				this.$http
					.get('https://api.tfl.gov.uk/Line/Mode/tube/Status?detail=true')
					.then((response) => {
						this.transportData = response.data;
						this.transportData.map((tube) => {
							this.selectedRoutes.push(tube.id);
						});
					},
					(err) => console.log(err));
			},
			selectedRoute (route) {
				this.$http
					.get('https://api.tfl.gov.uk/Line/' + route.id + '/Status?detail=true')
					.then((response) => {
						this.transportData.push(response.data[0]);
						this.selectedRoutes.push(response.data[0].id);
					},
					(err) => console.log(err));
			}
		},
		beforeDestroy () {
			clearInterval(this.routeUpdater);
		},
		created () {
			this.getTubeData();
		},
		mounted () {
			// Update selected Routes with new information
			this.routeUpdater = setInterval(() => {
				this.selectedRoutes.map((value) => {
					const toUpdate = this.transportData.findIndex((current) => {
						return current === value;
					});

					this.getRoute(value)
						.then((response) => {
							this.transportData[toUpdate] = response;
						});
				});
			}, (5 * 60000));
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
			background-color: rgba(255, 255, 255, 1);

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
