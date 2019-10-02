import express from 'express'
import CategoryController from './CategoryController';
import CategoryDetailController from './CategoryDetailController';
import OutletController from './OutletController';

class CategoryRouter {
    get router() {
        const router = express.Router()
        router.get('/', CategoryController.handler())
        router.get('/sub/:categoryId', CategoryDetailController.handler())
        router.get('/sub/:categoryId/outlet/:categoryDetailId', OutletController.handler())
        return router
    }
}
export default new CategoryRouter()