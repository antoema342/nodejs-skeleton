import EventModel from '../../models/Event'
import ResponseHelper from '../../helpers/ResponseHelper'

class InsertEventController {
    parseData(req, res, next) {
        console.log(req.body)
        return next()
    }

    async process(req, res, next) {
        let result = await EventModel.create(req.body)
        if (result.resolved == true) {
            ResponseHelper.response(res, 201, result.data)
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
export default new InsertEventController()