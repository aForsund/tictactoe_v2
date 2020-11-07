module.exports = {
	outputDir: ('../Server/public'),
	devServer: {
		proxy: {
			'': {
				target: 'http://localhost:3000',
			},
		},
	},
};
