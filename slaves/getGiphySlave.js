import superagent from 'superagent';

function getGiphySlave(trend) {
	let url = "http://api.giphy.com/v1/gifs/translate?api_key=dc6zaTOxFJmzC&s=";

	url += trend;
	return new Promise((resolve, reject) => {
		superagent.get(url)
		.set('Accept', 'application/json')
		.end((error, res) => {
			if (error) {
				var err = res && res.text ? JSON.parse(res.text) : {
					code: 400,
					message: 'Bad request',
					informations: 'Internal error'
				};
				reject(err);
			}
			resolve(JSON.parse(res.text));
		});
	});
}

export default getGiphySlave;
