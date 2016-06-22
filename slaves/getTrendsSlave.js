import config from '../config/configPublic.json'
import superagent from 'superagent';

function getTrendsSlave(localization) {
	let url = config.serviceURL + "api/trends/" + localization;

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

export default getTrendsSlave;
