require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3001;
const mysql = require('mysql2');
const DATABASE_URL = process.env.DATABASE_URL;

// Rutas
const userRoutes = require('./routes/user.routes');

// Crear conexión a la base de datos en la nube.
// Recordar para esto crear un archivo .env que almacene los datos de la db.
const connection = mysql.createConnection(DATABASE_URL);
console.log("DB connected!");

// Middlewares
app.use(express.json());
app.use(cors());

userRoutes(app, connection);


app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});