import EventModel from '../../models/Event'
import ResponseHelper from '../../helpers/ResponseHelper'

class ReadAllEventController {
    parseData(req, res, next) {
        req.data = {}
        req.parameter = {}
        req.parameter.limit = req.query.limit
        req.parameter.offset = req.query.offset
        req.parameter.country = req.query.country
        return next()
    }

    async process(req, res, next) {
        let where = {
            isActive: true
        }
        if (req.parameter.country) {
            where.country = req.parameter.country
        }
        let include = []
        let result = await EventModel.readAll(where, include, req.parameter.limit, req.parameter.offset)
        if (result.resolved == true) {
            ResponseHelper.response(res, 200, result.data)
        } else {
            ResponseHelper.response(res, 404, result.data)
        }
    }

    handler() {
        return [
            this.parseData,
            this.process
        ]
    }
}
export default new ReadAllEventController()