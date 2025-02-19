import ApiErrors from '../exeptions/api-error.js'

import TokenService from '../service/token-service.js'
export default function (req, res, next) {
	try {
		const autorizationHeader = req.headers.authorization

		if (!autorizationHeader) {
			return next(ApiErrors.UnauthorizedError())
		}

		const accessToken = autorizationHeader.split(' ')[1]

		if (!accessToken) {
			return next(ApiErrors.UnauthorizedError())
		}

		const userData = TokenService.validateAccessToken(accessToken)

		if (!userData) {
			return next(ApiErrors.UnauthorizedError())
		}

		req.user = userData
		next()
	} catch (err) {
		return next(ApiErrors.UnauthorizedError())
	}
}
