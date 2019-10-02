import Sequelize from 'sequelize'
import BaseModel from './BaseModel'
import async from 'async'
import Helper from '../helpers/Helper'
const sequelize = new Sequelize('meeber_pos_v2_auth', 'root', 'passwordroot5758', {
    host: '43.245.184.30',
    dialect: 'mysql'
  });

class OutletCategoryModel extends BaseModel {
    tableName() {
        return 'OUTLET_BUSINESS_CATEGORY'
    }
    schema() {
        return {
            OUTLET_BUSINESS_CATEGORY_DETAIL_ID: {
                primaryKey: true,
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4
            },
            OUTLET_ID: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4
            },
            INTERN_BUSINESS_CATEGORY_DETAIL_UID: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4
            },
            OUTLET_BUSINESS_CATEGORY_CREATED_DATE:{
                type: Sequelize.DATE,
                allowNull: true
            },
            OUTLET_BUSINESS_CATEGORY_LAST_UPDATE_DATE:{
                type: Sequelize.DATE,
                allowNull: true
            }
        }
    }
    generate(instance) {
        let options = {
            freezeTableName: true
        }
        this.instance = instance.define(this.tableName(), this.schema(), options)
        return instance
    }



    // CRUD methods goes here...
    async readAll(conditions = null, assoc=[], limit=10, offset=0) {
        try {
            let results = await this.instance.findAll({
                where: conditions,
                order: [
                    ['createdAt', 'DESC']
                ],
                include: assoc,
                limit: limit,
                offset: offset
            })
            return this.res(true, results)
        } catch(error) {
            console.log('[ERROR - READ ALL] '+error.message)
            return this.res(false, error.message)
        }
    }

    async readOne(conditions = null, assoc=[]) {
        try {
            let results = await this.instance.find({
                where: conditions,
                include: assoc
            })
            if (results == null) {
                return this.res(false, null)
            } else {
                return this.res(true, results)
            }
        } catch(error) {
            console.log('[ERROR - READ ONE] '+error.message)
            return this.res(false, error.message)
        }
    }

    async create(data, conditions = null, assoc=[]) {
        try {
            data.isActive = true
            let results = await this.instance.create(data)
            return this.res(true, results)
        } catch(error) {
            console.log('[ERROR - UPDATE] '+error.message)
            return this.res(false, error.message)
        }
    }

    async update(data, conditions = null, assoc=[]) {
        try {
            let results = await this.instance.update(data, {
                where: conditions,
                returning: true
            })
            return this.res(true, results)
        } catch(error) {
            console.log('[ERROR - UPDATE] '+error.message)
            return this.res(false, error.message)
        }
    }

    async delete(conditions = null) {
        try {
            let results = await this.instance.destroy({
                where: conditions,
            })
            return this.res(true, results)
        } catch(error) {
            console.log('[ERROR - DELETE] '+error.message)
            return this.res(false, error.message)
        }
    }
    async get(categoryDetailId,city=null,lat=null,lng=null,offset=0,limit=20,outletName=null,preOrder=false) {
        try {
            console.log(preOrder)
            let query = "SELECT OUTLET.* ";
            if(lat!=null){
                query += ",(";
                query += 6371 ;
                query += "*";
                query += "acos(cos(radians("+lat+"))";
                query += "*";
                query += "cos(radians(OUTLET.OUTLET_LATITUDE))";
                query += "*";
                query += "cos(radians(OUTLET.OUTLET_LONGITUDE) - ";
                query += "radians("+lng+")) + ";
                query += "sin(radians("+lat+"))";
                query += "*";
                query += "sin(radians(OUTLET.OUTLET_LATITUDE ))";
                query += ")";
                query += ")";
                query += " AS distance ";
            }
            query +="FROM OUTLET_BUSINESS_CATEGORY RIGHT JOIN OUTLET ON OUTLET_BUSINESS_CATEGORY.OUTLET_ID = OUTLET.OUTLET_ID";
            if(preOrder!=false){
                query += ' INNER JOIN meeber_pos_v2_library.SETTING ON meeber_pos_v2_library.SETTING.OUTLET_ID = meeber_pos_v2_auth.OUTLET.OUTLET_ID'
			    query += ' INNER JOIN meeber_pos_v2_library.OUTLETBILLINGINFORMATION ON meeber_pos_v2_library.OUTLETBILLINGINFORMATION.OUTLET_ID = meeber_pos_v2_auth.OUTLET.OUTLET_ID'

            }
            query += " WHERE OUTLET_BUSINESS_CATEGORY.INTERN_BUSINESS_CATEGORY_DETAIL_UID = UNHEX(REPLACE('"+categoryDetailId+"','-',''))";
            if(city!=null){
                query += "AND OUTLET.OUTLET_CITY LIKE '%"+city+"%'";
            }
            if(preOrder!=false) {
                query += " AND ( meeber_pos_v2_library.SETTING.SETTING_KEY = 'allowPreOrder'";
                query += ' AND meeber_pos_v2_library.SETTING.SETTING_VALUE = 1 )';
                query += ' AND meeber_pos_v2_library.OUTLETBILLINGINFORMATION.BILLINGINFORMATION_IS_ACTIVE = 1';
            }
    
            if(outletName!=null){
                query += "AND OUTLET.OUTLET_NAME LIKE '%"+outletName+"%'";
            }
            if(lat!=null){
                query +=" HAVING distance < 25 ORDER BY distance ASC ";
            }
            else if(lat==null){
                query += " ORDER BY OUTLET.OUTLET_NAME ASC";
            }
            query += " LIMIT "+limit+" OFFSET "+offset;
            
            console.log(query)
            let results = await sequelize.query(query);
            return this.res(true, results)
        } catch(error) {
            console.log('[ERROR - DELETE] '+error.message)
            return this.res(false, error.message)
        }
    }
}
export default new OutletCategoryModel()
