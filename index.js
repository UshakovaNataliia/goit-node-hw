const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const contactsRoutes = require('./routes/contactsRoutes');

const PORT = 8080 || process.env.port;

class Server {
    start() {
        this.server = express();
        this.initMiddlewares();
        this.initRoutes();
        this.listen();
    }
    initMiddlewares() {
        this.server.use(express.json());
        this.server.use(morgan('dev'));
        this.server.use(cors());
    }
    initRoutes() {
        this.server.use('/api/contacts', contactsRoutes);
    }
    listen() {
        this.server.listen(PORT, () => {
            console.log(`Server is listening on port:`, PORT);
        });
    }
}

const server = new Server();
server.start();
