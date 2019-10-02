import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import appconfig from '../configs/app.config.json'
class Helper {
    generateHash(password) {
        return bcrypt.hashSync(password, 10)
    }
    isValidPassword(password, hash) {
        return bcrypt.compareSync(password, hash)
    }
    createTokenJWT(data) {
        let options = { expiresIn: appconfig.ttl }
        // data = data.dataValues
        var payload = data
        return jwt.sign(payload, appconfig.secretKey, options)
    }
    decodeTokenJWT(token) {
        let options = { expiresIn: appconfig.ttl }
        // data = data.dataValues
        var token = token
        return jwt.verify(token, appconfig.secretKey, options)
    }
    parseNormalUID(uuid){
        let uuidbin=uuid;
        let normaluuid=uuidbin.substring(0,8)+'-'+uuidbin.substring(12, 8)+'-'+uuidbin.substring(16, 12)+'-'+uuidbin.substring(20, 16)+'-'+uuidbin.substring(20);
        // console.log(normaluuid);
        return normaluuid;
    }
}
export default new Helper()