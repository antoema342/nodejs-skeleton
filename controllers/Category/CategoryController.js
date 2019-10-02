import ResponseHelper from '../../helpers/ResponseHelper'
import Helper from '../../helpers/Helper'
import CategoryModel from '../../models/CategoryModel'
import AuthenticateApp from '../.../../../helpers/AuthenticateApp'

class CategoryController {
    parseData(req, res, next) {
        req.data = {}
        req.parameter = {}
        req.data.idToken = req.get('idToken');
        return next()
    }
    async process(req, res, next) {
        try {
            let error={
                'message': 'Token Not Found'
            }
            if(!req.data.idToken){
                ResponseHelper.response(res, 403, error)
            }
            else{
            let where = {
                INTERN_BUSINESS_CATEGORY_IS_ACTIVE: 1
            }
            let juga = []
            let categories = await CategoryModel.readAll(where, juga, 10, 0);
            let records=[]
            for(let j=0;j<categories.data.length;j++){
                records.push({
                    categoryUID: Helper.parseNormalUID(new Buffer(categories.data[j].INTERN_BUSINESS_CATEGORY_UID, 'ascii').toString('hex')),
                    categoryName: categories.data[j].INTERN_BUSINESS_CATEGORY_NAME,
                    categoryIsActive: categories.data[j].INTERN_BUSINESS_CATEGORY_IS_ACTIVE,
                    categoryCreatedBy: categories.data[j].INTERN_BUSINESS_CATEGORY_CREATED_BY,
                    categoryLastUpdatedBy: categories.data[j].INTERN_BUSINESS_CATEGORY_LAST_UPDATED_BY,
                    categoryDeletedBy: categories.data[j].INTERN_BUSINESS_CATEGORY_DELETED_BY,
                    categoryCreatedDate: categories.data[j].INTERN_BUSINESS_CATEGORY_CREATED_DATE,
                    categoryLastUpdateDate: categories.data[j].INTERN_BUSINESS_CATEGORY_LAST_UPDATE_DATE,
                    categoryDeletedDate: categories.data[j].INTERN_BUSINESS_CATEGORY_DELETED_DATE,
                })
            }
            ResponseHelper.response(res, 200, records)
        }

        }
        catch (err) {
            console.log(err)
        }
    }

    handler() {
        return [
            AuthenticateApp.parseToken,
            AuthenticateApp.process,
            this.parseData,
            this.process
        ]
    }
}
export default new CategoryController()