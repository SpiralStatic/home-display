const Capitalise = {
	methods: {
		capitalise: function (input) {
			if (!input) return '';
			input = input.toString();
			return input.charAt(0).toUpperCase() + input.slice(1);
		}
	}
};

export default Capitalise;
