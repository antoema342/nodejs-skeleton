import ResponseHelper from '../../helpers/ResponseHelper'
import Helper from '../../helpers/Helper'
import CategoryDetailModel from '../../models/CategoryDetailModel'
import AuthenticateApp from '../.../../../helpers/AuthenticateApp'
const uuidParse = require('uuid-parse');

class CategoryDetailController {
    parseData(req, res, next) {
        req.data = {}
        req.parameter = {}
        req.parameter.categoryId = req.params.categoryId;
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
                let bytes=uuidParse.parse(req.parameter.categoryId)
                console.log(bytes)
                console.log("UNHEX(REPLACE("+req.parameter.categoryId+","+"'-',"+"''"+"))")
            let where = {
                INTERN_BUSINESS_CATEGORY_UID: "HEX("+"'"+req.parameter.categoryId+"'"+")",
                // INTERN_BUSINESS_CATEGORY_UID : "UNHEX(REPLACE("+req.parameter.categoryId+","+"'-',"+"''"+"))",
                INTERN_BUSINESS_CATEGORY_DETAIL_IS_ACTIVE: 1
            }
            let juga = []
            let details = await CategoryDetailModel.get(req.parameter.categoryId);
            let records=[]
            for(let j=0;j<details.data[0].length;j++){
                records.push({
                    
                    categoryDatailUID: Helper.parseNormalUID(new Buffer(details.data[0][j].INTERN_BUSINESS_CATEGORY_DETAIL_UID, 'ascii').toString('hex')),
                    categoryUID: Helper.parseNormalUID(new Buffer(details.data[0][j].INTERN_BUSINESS_CATEGORY_UID, 'ascii').toString('hex')),
                    categoryDetailName: details.data[0][j].INTERN_BUSINESS_CATEGORY_DETAIL_NAME,
                    categoryDetailIsActive: details.data[0][j].INTERN_BUSINESS_CATEGORY_DETAIL_IS_ACTIVE,
                    categoryDetailCreatedBy: details.data[0][j].INTERN_BUSINESS_CATEGORY_DETAIL_CREATED_BY,
                    categoryDetailLastUpdatedBy: details.data[0][j].INTERN_BUSINESS_CATEGORY_DETAIL_LAST_UPDATE_BY,
                    categoryDetailDeletedBy: details.data[0][j].INTERN_BUSINESS_CATEGORY_DETAIL_DELETED_BY,
                    categoryDetailCreatedDate: details.data[0][j].INTERN_BUSINESS_CATEGORY_DETAIL_CREATED_DATE,
                    categoryDetailLastUpdateDate: details.data[0][j].INTERN_BUSINESS_CATEGORY_DETAIL_LAST_UPDATE_DATE,
                    categoryDetailDeletedDate: details.data[0][j].INTERN_BUSINESS_CATEGORY_DETAIL_DELETED_DATE,
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
export default new CategoryDetailController()