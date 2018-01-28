const WeatherUtilities = {
	methods: {
		getWeatherIcon: function (weatherCode) {
			if (!weatherCode) return 'el-icon-fa-adjust';

			switch (weatherCode) {
				case '01d':
					return 'el-icon-fa-sun-o';
				case '01n':
					return 'el-icon-fa-moon-o';
				case '02d':
				case '02n':
				case '03d':
				case '03n':
				case '04d':
				case '04n':
					return 'el-icon-fa-cloud';
				case '09d':
				case '09n':
					return 'el-icon-fa-tint';
				case '10d':
				case '10n':
					return 'el-icon-fa-shower';
				case '11d':
				case '11n':
					return 'el-icon-fa-bolt';
				case '13d':
				case '13n':
					return 'el-icon-fa-snowflake-o';
				case '50d':
				case '50n':
					return 'el-icon-fa-low-vision';
				default:
					return 'el-icon-fa-adjust';
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
