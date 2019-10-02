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
        return 'OUTLET'
    }
    schema() {
        return {
            OUTLET_ID: {
                primaryKey: true,
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4
            },
            BUSINESS_ID: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4
            },
            OUTLET_NAME:{
                type: Sequelize.STRING,
                allowNull: true
            },
            OUTLET_ADDRESS:{
                type: Sequelize.STRING,
                allowNull: true
            },
            OUTLET_CITY:{
                type: Sequelize.STRING,
                allowNull: true
            },
            OUTLET_PROVINCE:{
                type: Sequelize.STRING,
                allowNull: true
            },
            OUTLET_COUNTRY:{
                type: Sequelize.STRING,
                allowNull: true
            },
            OUTLET_ZIP:{
                type: Sequelize.STRING,
                allowNull: true
            },
            OUTLET_PHONE:{
                type: Sequelize.STRING,
                allowNull: true
            },
            OUTLET_LATITUDE:{
                type: Sequelize.STRING,
                allowNull: true
            },
            OUTLET_LONGITUDE:{
                type: Sequelize.STRING,
                allowNull: true
            },
            OUTLET_LOGO_URL:{
                type: Sequelize.STRING,
                allowNull: true
            },
            OUTLET_IMAGE_URL:{
                type: Sequelize.STRING,
                allowNull: true
            },
            OUTLET_WEBSITE_URL:{
                type: Sequelize.STRING,
                allowNull: true
            },
            OUTLET_IS_ACTIVE:{
                type: Sequelize.TINYINT,
                allowNull: true
            },
            OUTLET_CREATED_DATE:{
                type: Sequelize.DATE,
                allowNull: true
            },
            OUTLET_CREATED_BY:{
                type: Sequelize.STRING,
                allowNull: true
            },
            OUTLET_LAST_UPDATED_DATE:{
                type: Sequelize.DATE,
                allowNull: true
            },
            OUTLET_LAST_UPDATED_BY:{
                type: Sequelize.STRING,
                allowNull: true
            },
            OUTLET_IS_DELETED:{
                type: Sequelize.TINYINT,
                allowNull: true
            },
            OUTLET_DELETED_DATE:{
                type: Sequelize.DATE,
                allowNull: true
            },
            OUTLET_DELETED_BY:{
                type: Sequelize.STRING,
                allowNull: true
            },
            DEVICE_ID:{
                type: Sequelize.STRING,
                allowNull: true
            },
            OUTLET_TOKEN:{
                type: Sequelize.INTEGER,
                allowNull: true
            },
            OUTLET_ACTIVATION_DATE:{
                type: Sequelize.DATE,
                allowNull: true
            },
            OUTLET_OPEN_HOUR:{
                type: Sequelize.STRING,
                allowNull: true
            },
            OUTLET_CLOSED_HOUR:{
                type: Sequelize.STRING,
                allowNull: true
            },
            OUTLET_OPERATIONAL_DAYS:{
                type: Sequelize.STRING,
                allowNull: true
            },
            OUTLET_SO_PREFIX:{
                type: Sequelize.STRING,
                allowNull: true
            },
        }
    }
    generate(instance) {
        let options = {
            freezeTableName: true,
            timestamps: false
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
    async get(outletId) {
        try {
            let results = await sequelize.query("SELECT * FROM meeber_pos_v2_library.SETTING WHERE OUTLET_ID = UNHEX(REPLACE('"+outletId+"','-',''))")
            return this.res(true, results)
        } catch(error) {
            console.log('[ERROR - DELETE] '+error.message)
            return this.res(false, error.message)
        }
    }
    async getPayment(outletId) {
        try {
            let results = await sequelize.query("SELECT * FROM meeber_pos_v2_library.CASHLESSPAYMENTMETHOD WHERE OUTLET_ID = UNHEX(REPLACE('"+outletId+"','-',''))")
            return this.res(true, results)
        } catch(error) {
            console.log('[ERROR - DELETE] '+error.message)
            return this.res(false, error.message)
        }
    }
    async getBilling(outletId) {
        try {
            let results = await sequelize.query("SELECT * FROM meeber_pos_v2_library.OUTLETBILLINGINFORMATION WHERE OUTLET_ID = UNHEX(REPLACE('"+outletId+"','-',''))")
            return this.res(true, results)
        } catch(error) {
            console.log('[ERROR - DELETE] '+error.message)
            return this.res(false, error.message)
        }
    }
    async getDetail(outletId) {
        try {
            let results = await sequelize.query("SELECT * FROM OUTLET WHERE OUTLET_ID =UNHEX(REPLACE('"+outletId+"','-',''))")
            return this.res(true, results)
        } catch(error) {
            console.log('[ERROR - DELETE] '+error.message)
            return this.res(false, error.message)
        }
    }
}
export default new OutletCategoryModel()
