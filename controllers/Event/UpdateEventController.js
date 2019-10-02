import EventModel from '../../models/Event'
import ResponseHelper from '../../helpers/ResponseHelper'

class UpdateEventController {
    parseData(req, res, next) {
        console.log('aiueo')
        req.data = {}
        req.data.title = req.body.title
        req.data.cover = req.body.cover
        req.data.description = req.body.description
        req.data.price = req.body.price
        req.data.location = req.body.location
        req.data.date = req.body.date
        req.data.startHour = req.body.startHour
        req.data.endHour = req.body.endHour
        req.data.country = req.body.country

        req.parameter = {}
        req.parameter.eventId = req.params.eventId

        return next()
    }

    async process(req, res, next) {
        let where = {
            id: req.parameter.eventId
        }
        let result = await EventModel.update(req.data, where)
        if (result.resolved == true) {
            ResponseHelper.response(res, 200, result.data[1][0])
        } else {
            ResponseHelper.response(res, 500, result.data)
        }
    }

    handler() {
        return [
            this.parseData,
            this.process
        ]
    }
}
export default new UpdateEventController()