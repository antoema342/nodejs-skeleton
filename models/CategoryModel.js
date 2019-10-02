import Sequelize from 'sequelize'
import BaseModel from './BaseModel'
import async from 'async'
import Helper from '../helpers/Helper'
const sequelize = new Sequelize('meeber_pos_v2_category', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
  });

class CategoryModel extends BaseModel {
    tableName() {
        return 'INTERN_BUSINESS_CATEGORY'
    }
    schema() {
        return {
            INTERN_BUSINESS_CATEGORY_UID: {
                primaryKey: true,
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4
            },
            INTERN_BUSINESS_CATEGORY_NAME:{
                type: Sequelize.STRING,
                allowNull: true
            },
            INTERN_BUSINESS_CATEGORY_IS_ACTIVE:{
                type: Sequelize.TINYINT,
                allowNull: true
            },
            INTERN_BUSINESS_CATEGORY_CREATED_BY:{
                type: Sequelize.STRING,
                allowNull: true
            },
            INTERN_BUSINESS_CATEGORY_LAST_UPDATED_BY:{
                type: Sequelize.STRING,
                allowNull: true
            },
            INTERN_BUSINESS_CATEGORY_DELETED_BY:{
                type: Sequelize.STRING,
                allowNull: true
            },
            INTERN_BUSINESS_CATEGORY_CREATED_DATE:{
                type: Sequelize.DATE,
                allowNull: true
            },
            INTERN_BUSINESS_CATEGORY_LAST_UPDATE_DATE:{
                type: Sequelize.DATE,
                allowNull: true
            },
            INTERN_BUSINESS_CATEGORY_DELETED_DATE:{
                type: Sequelize.DATE,
                allowNull: true,
            }
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
                // order: [
                //     ['createdAt', 'DESC']
                // ],
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
    async get(conditions = null) {
        try {
            let results = await sequelize.query("SELECT * FROM db_belajar_go.INTERN_BUSINESS_CATEGORY")
            return this.res(true, results)
        } catch(error) {
            console.log('[ERROR - DELETE] '+error.message)
            return this.res(false, error.message)
        }
    }
}
export default new CategoryModel()
