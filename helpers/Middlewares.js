import jwt from 'jsonwebtoken'
import appconfig from '../configs/app.config.json'
class Middlewares {
    verifyToken(byPass = false) {
        return (req, res, next) => {
            let token = req.headers['authorization'];
            if (token) {
                token = token.replace('Bearer ','')
            }
            jwt.verify(token, appconfig.secretKey, (err, decoded) => {
                if (err) {
                    res.sendStatus(403)
                } else {
                    if (byPass == true) {
                        if (decoded.isAdmin == true) {
                            req.token = decoded
                            return next()
                        } else {
                            res.sendStatus(403)
                            ResponseHelper.response(res, 403, null)
                        }
                    } else {
                        req.token = decoded
                        return next()
                    }
                }
            })
        }

    }
}
export default new Middlewares()