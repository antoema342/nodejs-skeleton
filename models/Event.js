import Sequelize from 'sequelize'
import BaseModel from './BaseModel'
import async from 'async'
import Helper from '../helpers/Helper'

class Event extends BaseModel {
    tableName() {
        return 'event'
    }
    schema() {
        return {
            id: {
                primaryKey: true,
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4
            },
            title:{
                type: Sequelize.STRING,
                allowNull: false,
            },
            cover:{
                type: Sequelize.STRING,
                allowNull: true
            },
            description:{
                type: Sequelize.TEXT,
                allowNull: true 
            },
            date:{
                type: Sequelize.STRING,
                allowNull: false,
            },
            startHour: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            endHour: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            location:{
                type: Sequelize.STRING,
                allowNull: false,
            },
            isActive:{
                type: Sequelize.BOOLEAN,
                defaultValue: true
            },
            country:{
                type: Sequelize.STRING,
                allowNull: true
            }
        }
    }
    generate(instance) {
        this.instance = instance.define(this.tableName(), this.schema())
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
}
export default new Event()
