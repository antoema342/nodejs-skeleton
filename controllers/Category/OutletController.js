import ResponseHelper from '../../helpers/ResponseHelper'
import Helper from '../../helpers/Helper'
import OutletCategoryModel from '../../models/OutletCategoryModel';
import OutletModel from '../../models/OutletModel';
import AuthenticateApp from '../.../../../helpers/AuthenticateApp'

class OutletController {
    parseData(req, res, next) {
        req.data = {}
        req.parameter = {}
        req.parameter.categoryDetailId = req.params.categoryDetailId;
        req.data.idToken = req.get('idToken');
        return next()
    }
    static async getBillings(outletId){
        try{
            let outletBillings = await OutletModel.getBilling(outletId)
            let outletBiling = []
            for(let i=0;i<outletBillings.data[0].length;i++){
                outletBiling.push({
                    BILLINGINFORMATION_ID: Helper.parseNormalUID(new Buffer(outletBillings.data[0][i].BILLINGINFORMATION_ID,'ascii').toString('hex')),
                    OUTLET_ID: Helper.parseNormalUID(new Buffer(outletBillings.data[0][i].OUTLET_ID,'ascii').toString('hex')),
                    BILLINGINFORMATION_ACCOUNT_NAME: outletBillings.data[0][i].BILLINGINFORMATION_ACCOUNT_NAME,
                    BILLINGINFORMATION_CODE_BANK: outletBillings.data[0][i].BILLINGINFORMATION_CODE_BANK,
                    BILLINGINFORMATION_BANK_NAME: outletBillings.data[0][i].BILLINGINFORMATION_BANK_NAME,
                    BILLINGINFORMATION_ACCOUNT_NUMBER: outletBillings.data[0][i].BILLINGINFORMATION_ACCOUNT_NUMBER,
                    BILLINGINFORMATION_BANK_BRANCH: outletBillings.data[0][i].BILLINGINFORMATION_BANK_BRANCH,
                    BILLINGINFORMATION_BANK_ADDRESS: outletBillings.data[0][i].BILLINGINFORMATION_BANK_ADDRESS,
                    BILLINGINFORMATION_IS_ACTIVE: outletBillings.data[0][i].BILLINGINFORMATION_IS_ACTIVE,
                    BILLINGINFORMATION_CREATED_DATE: outletBillings.data[0][i].BILLINGINFORMATION_CREATED_DATE,
                    BILLINGINFORMATION_LAST_UPDATED_DATE: outletBillings.data[0][i].BILLINGINFORMATION_LAST_UPDATED_DATE
                })

            }
            return outletBiling
        }
        catch(err){
            console.log(err)
        }
    }
    static async getPaymentMethod(outletId){
        try{
            let outletPayments = await OutletModel.getPayment(outletId)
            let outletPayment = []
            for(let i=0;i<outletPayments.data[0].length;i++){
                outletPayment.push({
                    CASHLESSPAYMENTMETHOD_ID: Helper.parseNormalUID(new Buffer(outletPayments.data[0][i].CASHLESSPAYMENTMETHOD_ID,'ascii').toString('hex')),
                    OUTLET_ID: Helper.parseNormalUID(new Buffer(outletPayments.data[0][i].CASHLESSPAYMENTMETHOD_ID,'ascii').toString('hex')),
                    CASHLESSPAYMENTMETHOD_NAME: outletPayments.data[0][i].CASHLESSPAYMENTMETHOD_NAME,
                    CASHLESSPAYMENTMETHOD_IS_ACTIVE: outletPayments.data[0][i].CASHLESSPAYMENTMETHOD_IS_ACTIVE,
                    CASHLESSPAYMENTMETHOD_CREATED_DATE: outletPayments.data[0][i].CASHLESSPAYMENTMETHOD_CREATED_DATE,
                    CASHLESSPAYMENTMETHOD_LAST_UPDATED_DATE: outletPayments.data[0][i].CASHLESSPAYMENTMETHOD_LAST_UPDATED_DATE 
                })

            }
            return outletPayment
        }
        catch(err){
            console.log(err)
        }
    }
    static async getOutletSetting(outletId){
        try{
            let outletSettings = await OutletModel.get(outletId)
            let outletSetting = []
            for(let i = 0 ; i<outletSettings.data[0].length;i++){
                outletSetting.push({
                    SETTING_ID: Helper.parseNormalUID(new Buffer(outletSettings.data[0][i].SETTING_ID,'ascii').toString('hex')),
                    OUTLET_ID: Helper.parseNormalUID(new Buffer(outletSettings.data[0][i].OUTLET_ID,'ascii').toString('hex')),
                    ACCOUNT_ID: Helper.parseNormalUID(new Buffer(outletSettings.data[0][i].ACCOUNT_ID,'ascii').toString('hex')),
                    SETTING_KEY: outletSettings.data[0][i].SETTING_KEY,
                    SETTING_VALUE: outletSettings.data[0][i].SETTING_VALUE,
                    SETTING_CREATED_DATE: outletSettings.data[0][i].SETTING_CREATED_DATE,
                    SETTING_CREATED_BY: outletSettings.data[0][i].SETTING_CREATED_BY,
                    SETTING_LAST_UPDATED_DATE: outletSettings.data[0][i].SETTING_LAST_UPDATED_DATE,
                    SETTING_LAST_UPDATED_BY:outletSettings.data[0][i].SETTING_LAST_UPDATED_BY,
                    SETTING_IS_DELETED: outletSettings.data[0][i].SETTING_IS_DELETED,
                    SETTING_DELETED_DATE: outletSettings.data[0][i].SETTING_DELETED_DATE,
                    SETTING_DELETED_BY: outletSettings.data[0][i].SETTING_DELETED_BY
                })
            }
            return outletSetting
        }
        catch(err){
            console.log(err)
        }
    }
    static async getOutletDetail(outletId){
        try{
            let normalId= Helper.parseNormalUID(new Buffer(outletId,'ascii').toString('hex'))
            let juga = []
            let outletDetails = await OutletModel.getDetail(normalId)
            let outletDetail = []
            let out;
            for(let i =0;i<outletDetails.data[0].length;i++ ){
                out={
                    OUTLET_ID: Helper.parseNormalUID(new Buffer(outletDetails.data[0][i].OUTLET_ID,'ascii').toString('hex')),
                    BUSINESS_ID: Helper.parseNormalUID(new Buffer(outletDetails.data[0][i].BUSINESS_ID,'ascii').toString('hex')),
                    OUTLET_NAME: outletDetails.data[0][i].OUTLET_NAME,
                    OUTLET_ADDRESS: outletDetails.data[0][i].OUTLET_ADDRESS,
                    OUTLET_CITY: outletDetails.data[0][i].OUTLET_CITY,
                    OUTLET_PROVINCE: outletDetails.data[0][i].OUTLET_PROVINCE,
                    OUTLET_COUNTRY: outletDetails.data[0][i].OUTLET_COUNTRY,
                    OUTLET_ZIP: outletDetails.data[0][i].OUTLET_ZIP,
                    OUTLET_PHONE: outletDetails.data[0][i].OUTLET_PHONE,
                    OUTLET_LATITUDE: outletDetails.data[0][i].OUTLET_LATITUDE,
                    OUTLET_LONGITUDE: outletDetails.data[0][i].OUTLET_LONGITUDE,
                    OUTLET_LOGO_URL: outletDetails.data[0][i].OUTLET_LOGO_URL,
                    OUTLET_IMAGE_URL: outletDetails.data[0][i].OUTLET_IMAGE_URL,
                    OUTLET_WEBSITE_URL: outletDetails.data[0][i].OUTLET_WEBSITE_URL,
                    OUTLET_IS_ACTIVE: outletDetails.data[0][i].OUTLET_IS_ACTIVE,
                    OUTLET_CREATED_DATE: outletDetails.data[0][i].OUTLET_CREATED_DATE,
                    OUTLET_CREATED_BY: outletDetails.data[0][i].OUTLET_CREATED_BY,
                    OUTLET_LAST_UPDATED_DATE: outletDetails.data[0][i].OUTLET_LAST_UPDATED_DATE,
                    OUTLET_LAST_UPDATED_BY: outletDetails.data[0][i].OUTLET_LAST_UPDATED_BY,
                    OUTLET_IS_DELETED: outletDetails.data[0][i].OUTLET_IS_DELETED,
                    OUTLET_DELETED_DATE: outletDetails.data[0][i].OUTLET_DELETED_DATE,
                    OUTLET_DELETED_BY: outletDetails.data[0][i].OUTLET_DELETED_BY,
                    DEVICE_ID: outletDetails.data[0][i].DEVICE_ID,
                    OUTLET_TOKEN: outletDetails.data[0][i].OUTLET_TOKEN,
                    OUTLET_ACTIVATION_DATE: outletDetails.data[0][i].OUTLET_ACTIVATION_DATE,
                    OUTLET_OPEN_HOUR: outletDetails.data[0][i].OUTLET_OPEN_HOUR,
                    OUTLET_CLOSED_HOUR: outletDetails.data[0][i].OUTLET_CLOSED_HOUR,
                    OUTLET_OPERATIONAL_DAYS: outletDetails.data[0][i].OUTLET_OPERATIONAL_DAYS,
                    OUTLET_SO_PREFIX: outletDetails.data[0][i].OUTLET_SO_PREFIX,
                    OUTLET_SETTINGS: await OutletController.getOutletSetting(normalId),
                    OUTLET_PAYMENTMETHODS: await OutletController.getPaymentMethod(normalId),
                    OUTLET_BILLING_INFORMATION: await OutletController.getBillings(normalId)
                }
            }
            return out;
        }
        catch(err){
            console.log(err)
        }
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
                let city = req.query.city;
                let lat = req.query.lat;
                let lng = req.query.lng;
                let offset = req.query.offset;
                let limit = req.query.limit;
                let outletName = req.query.outletName;
                let preOrder = req.query.preOrder;
            let juga = []
            let outletDetails = await OutletCategoryModel.get(req.parameter.categoryDetailId,city,lat,lng,offset,limit,outletName,preOrder);
            let records=[]
            for(let i=0;i<outletDetails.data[0].length;i++){
                console.log('smpe sini')
                let normalId= Helper.parseNormalUID(new Buffer(outletDetails.data[0][i].OUTLET_ID,'ascii').toString('hex'))
                records.push(
                    {
                        OUTLET_ID: Helper.parseNormalUID(new Buffer(outletDetails.data[0][i].OUTLET_ID,'ascii').toString('hex')),
                        BUSINESS_ID: Helper.parseNormalUID(new Buffer(outletDetails.data[0][i].BUSINESS_ID,'ascii').toString('hex')),
                        OUTLET_NAME: outletDetails.data[0][i].OUTLET_NAME,
                        OUTLET_ADDRESS: outletDetails.data[0][i].OUTLET_ADDRESS,
                        OUTLET_CITY: outletDetails.data[0][i].OUTLET_CITY,
                        OUTLET_PROVINCE: outletDetails.data[0][i].OUTLET_PROVINCE,
                        OUTLET_COUNTRY: outletDetails.data[0][i].OUTLET_COUNTRY,
                        OUTLET_ZIP: outletDetails.data[0][i].OUTLET_ZIP,
                        OUTLET_PHONE: outletDetails.data[0][i].OUTLET_PHONE,
                        OUTLET_LATITUDE: outletDetails.data[0][i].OUTLET_LATITUDE,
                        OUTLET_LONGITUDE: outletDetails.data[0][i].OUTLET_LONGITUDE,
                        OUTLET_LOGO_URL: outletDetails.data[0][i].OUTLET_LOGO_URL,
                        OUTLET_IMAGE_URL: outletDetails.data[0][i].OUTLET_IMAGE_URL,
                        OUTLET_WEBSITE_URL: outletDetails.data[0][i].OUTLET_WEBSITE_URL,
                        OUTLET_IS_ACTIVE: outletDetails.data[0][i].OUTLET_IS_ACTIVE,
                        OUTLET_CREATED_DATE: outletDetails.data[0][i].OUTLET_CREATED_DATE,
                        OUTLET_CREATED_BY: outletDetails.data[0][i].OUTLET_CREATED_BY,
                        OUTLET_LAST_UPDATED_DATE: outletDetails.data[0][i].OUTLET_LAST_UPDATED_DATE,
                        OUTLET_LAST_UPDATED_BY: outletDetails.data[0][i].OUTLET_LAST_UPDATED_BY,
                        OUTLET_IS_DELETED: outletDetails.data[0][i].OUTLET_IS_DELETED,
                        OUTLET_DELETED_DATE: outletDetails.data[0][i].OUTLET_DELETED_DATE,
                        OUTLET_DELETED_BY: outletDetails.data[0][i].OUTLET_DELETED_BY,
                        DEVICE_ID: outletDetails.data[0][i].DEVICE_ID,
                        OUTLET_TOKEN: outletDetails.data[0][i].OUTLET_TOKEN,
                        OUTLET_ACTIVATION_DATE: outletDetails.data[0][i].OUTLET_ACTIVATION_DATE,
                        OUTLET_OPEN_HOUR: outletDetails.data[0][i].OUTLET_OPEN_HOUR,
                        OUTLET_CLOSED_HOUR: outletDetails.data[0][i].OUTLET_CLOSED_HOUR,
                        OUTLET_OPERATIONAL_DAYS: outletDetails.data[0][i].OUTLET_OPERATIONAL_DAYS,
                        OUTLET_SO_PREFIX: outletDetails.data[0][i].OUTLET_SO_PREFIX,
                        OUTLET_SETTINGS: await OutletController.getOutletSetting(normalId),
                        OUTLET_PAYMENTMETHODS: await OutletController.getPaymentMethod(normalId),
                        OUTLET_BILLING_INFORMATION: await OutletController.getBillings(normalId)
                    
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
export default new OutletController()