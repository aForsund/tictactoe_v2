module.exports = {
	outputDir: ('../Server/public'),
	devServer: {
		proxy: {
			'': {
				target: '',
			},
		},
	},
};
