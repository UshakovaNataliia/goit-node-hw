const express = require('express');
const morgan = require('morgan');
const path = require('path');
const { contactsRouter } = require('./contacts/contactRouter');
const mongoose = require('mongoose')
require('dotenv').config({ path: path.join(__dirname, "../.env") });
exports.CrudServer = class {
    constructor() {
        this.app = null
    }
    async start() {
        this.initServer();
        await this.initDataBase();
        this.initMiddlewares();
        this.initRoutes();
        this.initErrorHandler();
        this.startListening();
    }
    initServer() {
        this.app = express()
    }
    async initDataBase() {
        try {
            await mongoose.connect(process.env.MONGODB_URL,
                {
                    useNewUrlParser: true,
                    useUnifiedTopology: true,
                    useFindAndModify: false
                })
            console.log('Database connection successful');
        } catch (error) {
            console.log(error.message);
            process.exit(1)
        }
    }
    initMiddlewares() {
        this.app.use(express.json())
        this.app.use(morgan('tiny'))
    }
    initRoutes() {
        this.app.use('/contacts', contactsRouter)
    }
    initErrorHandler() {
        this.app.use((err, req, res, next) => {
            const statusCode = err.status || 500
            return res.status(statusCode).send(err.message)
        })
    }
    startListening() {
        const { PORT } = process.env
        this.app.listen(PORT, () => {
            console.log("Server started at port ", PORT);
        })
    }
}