<template>
	<div>
		<icon :name="weatherIcon" scale="2" class="icon" aria-hidden="true"></icon>{{ this.weatherInfo }}
		<icon :name="temperatureIcon" scale="2" class="icon" aria-hidden="true"></icon>{{ this.temperature }}&#8451;
	</div>
</template>

<script>
	import WeatherUtilities from '../mixins/WeatherUtilities';
	import capitalise from '../mixins/Capitalise';

	export default {
		name: 'WeatherWidget',
		props: {
			location: {
				type: String,
				default () { return 'London'; }
			}
		},
		data () {
			return {
				temperature: 0,
				temperatureIcon: 'thermometer-half',
				weatherIcon: 'adjust',
				weatherInfo: ''
			};
		},
		mixins: [WeatherUtilities, capitalise],
		methods: {
			updateWeatherInfo () {
				this.$http
					.get('https://api.openweathermap.org/data/2.5/weather?q=London&units=metric&APPID=92604d237d411e160e679a1ead711349')
					.then((response) => {
						console.log(response.data);
						this.weatherInfo = this.capitalise(response.data.weather[0].description);
						this.weatherIcon = this.getWeatherIcon(response.data.weather[0].icon);
						this.temperature = response.data.main.temp;
						this.temperatureIcon = this.getTemperatureIcon(response.data.main.temp);
					},
					(err) => console.log(err));
			}
		},
		beforeDestroy () {
			clearInterval(this.weatherUpdater);
		},
		mounted () {
			this.weatherUpdater = setInterval(this.updateWeatherInfo, (30 * 60000));
			this.updateWeatherInfo();
		}
	};
</script>

<style lang="scss" scoped>
</style>
