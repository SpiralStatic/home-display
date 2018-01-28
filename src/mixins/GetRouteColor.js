const GetRouteColor = {
	data() {
		return {
			routeColor: 'rgba(208, 26, 30, 0.85)'
		};
	},
	methods: {
		getRouteColor: function (route) {
			if (!route) return '';

			switch (route) {
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
		}
	}
};

export default GetRouteColor;
