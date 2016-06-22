function throwNotFoundAction(context, payload) {
	let error = {
		data: {
			informations: "Page not found",
			message: "Bad request",
			code: 404
		}
	};
	context.dispatch('ERROR_ACTION', error);
}

export default throwNotFoundAction;
