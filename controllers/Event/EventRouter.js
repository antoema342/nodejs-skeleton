import express from 'express'
import ReadAllEventController from './ReadAllEventController'
import ReadOneEventController from './ReadOneEventController';
import UpdateEventController from './UpdateEventController';
import InsertEventController from './InsertEventController';
import DeleteEventController from './DeleteEventController';


class EventRouter {
    get router() {
        const router = express.Router()
        router.get('/', ReadAllEventController.handler())
        router.get('/:eventId', ReadOneEventController.handler())
        router.post('/', InsertEventController.handler())
        router.put('/:eventId', UpdateEventController.handler())
        router.delete('/:eventId', DeleteEventController.handler())
        return router
    }
}
export default new EventRouter()