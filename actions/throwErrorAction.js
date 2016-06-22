function throwErrorAction(context, payload) {
	let error = {
		data: {
			informations: payload.msg,
			code: payload.code || 404,
			message: 'Bad request'
		}
	};
	context.dispatch('ERROR_ACTION', error);
}

export default throwErrorAction;
