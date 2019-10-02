'use strict';

import ResponseHelper from '../helpers/ResponseHelper'
import appToken from '../configs/app.token.json';

class AuthenticateApp {
	parseToken(req, res, next) {
		req.token = {};
		req.token.idToken = req.get('idToken') || req.get('appToken') || '';
		req.token.accessToken = req.get('accessToken');
		if(next) return next();
	}

	async process(req, res, next) {
		try{
		let isAppToken = appToken[req.token.idToken];
		let method = req.body.method || req.method;
		if(!isAppToken)
			return ResponseHelper.response(res, 403, 'Invalid Id Token')
		if(isAppToken) {
			if(method === 'POST') {
				let url = req.body.originalUrl;
				console.log(req.body)
				if(	url.includes('/validate-qr-quickservice-checkin')	||
					url.includes('/customer-redemptions') 								||
					url.includes('/claims') ||
					url.includes('/claim')	||
					url.includes('/cekvoucher')
					)
					return next();
				else
				return ResponseHelper.response(res, 403, 'Unauthorized Access')
			} else if(method === 'GET') {
				return next();
			} else
				return ResponseHelper.response(res, 403, 'Unauthorized Access')
		}
		if(next) return next();
	}
	catch(err){
		console.log(err)
	}
	}

	async complete(req, res) {
		return ResponseHelper.response(res, 200, 'OK')
	}

	handler() {
		return [
			this.parseToken,
			this.process,
			this.complete
		];
	}
}
export default new AuthenticateApp()

// module.exports = AuthenticateApp;