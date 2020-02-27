const authService = require('./authService');

module.exports = serviceLocator => {
	const authServicce = serviceLocator.get('authService');
	const authController = {};
	authController.login = (res, req, next) => {
		authService.login(req.body.username, req.body.password, (err, result) => {
			if (err) {
				return res.status(401).send({
					ok: false,
					error: 'Invalid username/password'
				});
			}
			res.status(200).send({ ok: true, token: result });
		});
	};

	authController.checkToken = (req, res, next) => {
		authService.checkToken(req.query.token, (err, result) => {
			if (err) {
				return res.status(401).send({
					of: false,
					error: 'Token is invalid or expired'
				});
			}
			res.status(200).send({ of: 'true', user: result });
		});
	};

	return authController;
};
