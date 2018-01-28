const WeatherUtilities = {
	methods: {
		getWeatherIcon: function (weatherCode) {
			if (!weatherCode) return 'adjust';

			switch (weatherCode) {
				case '01d':
					return 'sun-o';
				case '01n':
					return 'moon-o';
				case '02d':
				case '02n':
				case '03d':
				case '03n':
				case '04d':
				case '04n':
					return 'cloud';
				case '09d':
				case '09n':
					return 'tint';
				case '10d':
				case '10n':
					return 'shower';
				case '11d':
				case '11n':
					return 'bolt';
				case '13d':
				case '13n':
					return 'snowflake-o';
				case '50d':
				case '50n':
					return 'low-vision';
				default:
					return 'adjust';
			}
		},
		getTemperatureIcon: function (temperature) {
			if (!temperature) return 'thermometer-half';

			switch (temperature) {
				case temperature > 25:
					return 'thermometer-full';
				case temperature > 20:
					return 'thermometer-three-quarters';
				case temperature > 10:
					return 'thermometer-half';
				case temperature > 5:
					return 'thermometer-quarter';
				case temperature > 0:
					return 'thermometer-empty';
				default:
					return 'thermometer-half';
			}
		}
	}
};

export default WeatherUtilities;
