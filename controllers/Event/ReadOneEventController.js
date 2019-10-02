import EventModel from '../../models/Event'
import ResponseHelper from '../../helpers/ResponseHelper'

class ReadOneEventController {
    parseData(req, res, next) {
        req.data = {}
        req.data.eventId = req.params.eventId
        return next()
    }

    async process(req, res, next) {
        let where = {
            id: req.data.eventId
        }
        let include = []
        let result = await EventModel.readOne(where, include)
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
export default new ReadOneEventController()