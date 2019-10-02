import Sequelize from 'sequelize'
import dbConfig from '../configs/db.config.json'

import Event from '../models/Event'
import CategoryModel from '../models/CategoryModel';
import CategoryDetailModel from '../models/CategoryDetailModel';
import OutletCategoryModel from '../models/OutletCategoryModel';
import OutletModel from '../models/OutletModel';

let instance = null
export default class DBConnection {
    constructor() {
        if (!instance) {
            instance = this
        }
        let env = process.env.NODE_ENV || 'localhost'
        let config = dbConfig[env]
        const sequelize = new Sequelize(config.database, config.username, config.password, config)
        var dburl =  config.dialect+'://'+config.username+'@'+config.host+'/'+config.database
        console.log('[DB] connected', dburl)
        console.log(process.env.NODE_ENV)

        // Model schema initialization goes here...
        this.sequelize = sequelize
        this.event = Event.generate(this.sequelize)
        this.CategoryModel = CategoryModel.generate(this.sequelize)
        this.CategoryDetailModel = CategoryDetailModel.generate(this.sequelize)
        this.OutletCategoryModel = OutletCategoryModel.generate(this.sequelize)
        this.OutletModel = OutletModel.generate(this.sequelize)

        // Association schema goes here...

        return instance
    }
}