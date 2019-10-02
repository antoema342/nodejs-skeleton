import EventModel from '../../models/Event'
import ResponseHelper from '../../helpers/ResponseHelper'

class DeleteEventController {
    parseData(req, res, next) {
        req.parameter = {}
        req.parameter.eventId = req.params.eventId
        return next()
    }

    async process(req, res, next) {
        let where = {
            id: req.parameter.eventId
        }
        let result = await EventModel.delete(where)
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
export default new DeleteEventController()