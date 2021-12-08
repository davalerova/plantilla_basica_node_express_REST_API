const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    this.usersPath = '/api/users';

    // Conectar a la base de datos
    this.conectarDB();

    // Middlewares
    this.middlewares();
    // Rutas
    this.routes();
  }

  async conectarDB() {
    await dbConnection();
  }

  middlewares() {
    // Cors
    this.app.use(cors());

    // Lectura y parseo del Body
    this.app.use(express.json());

    // Directorio público
    this.app.use(express.static('public'));
  }

  routes() {
    this.app.use(this.usersPath, require('../routes/user.routes'));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Rest server corriendo en http://localhost:${this.port}`);
    });
  }
}

module.exports = Server;
