import express from 'express'
import http from 'http'
import bodyParser from 'body-parser'
import logger from 'morgan'
import jwt from 'jsonwebtoken'
import dbConfig from './configs/db.config.json'
import appConfig from './configs/app.config.json'
import DBConnection from './db/DBConnection'
import EventRouter from './controllers/Event/EventRouter.js'
import CategoryRouter from './controllers/Category/CategoryRouter'
import cors from 'cors'
const app = express()
app.use(bodyParser.json({limit: '10mb'}))
app.use(logger('dev'))
app.use(cors())

const db = new DBConnection()

app.use(appConfig.middleURL+'/event', EventRouter.router)
app.use(appConfig.middleURL+'/category', CategoryRouter.router)

const server = http.createServer(app)
db.sequelize.sync().then(() => {
    server.listen(appConfig.port, () => {
        console.log('['+appConfig.name+'] service listening on port', appConfig.port)
    })
})