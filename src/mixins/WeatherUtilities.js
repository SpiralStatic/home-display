const WeatherUtilities = {
	methods: {
		getWeatherIcon: function (weatherCode) {
			if (!weatherCode) return 'adjust';

			switch (weatherCode) {
				case '01d':
					return 'sun-o';
				case '01n':
					return 'moon-o';
				default:
					return 'adjust';
			}
		},
		getTemperatureIcon: function (temperature) {
			if (!temperature) return 'el-icon-fa-thermometer-half';

			switch (temperature) {
				case temperature > 25:
					return 'el-icon-fa-thermometer-full';
				case temperature > 20:
					return 'el-icon-fa-thermometer-three-quarters';
				case temperature > 10:
					return 'el-icon-fa-thermometer-half';
				case temperature > 5:
					return 'el-icon-fa-thermometer-quarter';
				case temperature > 0:
					return 'el-icon-fa-thermometer-empty';
				default:
					return 'el-icon-fa-thermometer-half';
			}
		}
	}
};

export default WeatherUtilities;
