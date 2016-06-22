import ApplicationStore from '../stores/ApplicationStore';
import getTrendsSlave from '../slaves/getTrendsSlave';
import getGiphySlave from '../slaves/getGiphySlave';

function getTrendsAction(context, payload) {
	let trends = [];
	let localization = payload.label === 'Home' ? 'FR' : payload.label;

	return new Promise((resolve, reject) => {
		return getTrendsSlave(localization).then((res) => {
			resolve(res.trends);
		}).catch((error) => {
			reject(error);
		});
	}).then((result) => {
		let promiseMap = result.map((trend) => {
			return new Promise((resolve, reject) => {
				return getGiphySlave(trend).then((res) => {
					trends.push({trend: trend, giphy: res.data});
					resolve();
				});
			});
		});
		return Promise.all(promiseMap);
	}).then(() => {
		context.dispatch('GET_TRENDS_ACTION', {trends: trends});
	}).catch((error) => {
		console.log(error);
		payload = {data: error};
		context.dispatch('ERROR_ACTION', payload);
	});
}

export default getTrendsAction;
