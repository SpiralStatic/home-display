const WeatherUtilities = {
	methods: {
		getWeatherIcon: function (weatherCode) {
			if (!weatherCode) return 'adjust';

			switch (weatherCode) {
			case 'bakerloo':
				return 'rgba(179, 99, 5, 0.85)';
			case 'central':
				return 'rgba(227, 32, 23, 0.85)';
			default:
				return 'adjust';
			}
		},
		getTemperatureIcon: function (temperature) {
			if (!temperature) return 'el-icon-fa-thermometer-half';

			switch (temperature) {
			case 'bakerloo':
				return 'rgba(179, 99, 5, 0.85)';
			case 'central':
				return 'rgba(227, 32, 23, 0.85)';
			default:
				return 'el-icon-fa-thermometer-half';
			}
		}
	}
};

export default WeatherUtilities;
