const express = require('express');
const bodyparser = require('body-parser');
const { populateDB } = require('./dbinit')
const { dbConnection } = require('./dbconfig');
const cliente_routes = require('./routes/cliente.route');
const admin_routes = require('./routes/admin.route');
const cupon_routes = require('./routes/cupon.route');
require('dotenv').config();

// Base de datos
const dbSetup = async () => {
    //crea conexion
    await dbConnection();
    //inserta registros
    await populateDB();
}
dbSetup();

const app = express()

const server = require('http').createServer(app);
const io = require('socket.io')(server, {
    cors: { origin: '*' }
});

io.on('connection', (socket) => {
    socket.on('delete-carrito', function (data) {
        io.emit('new-carrito', data);
        console.log(data);
    });

    socket.on('add-carrito-add', function (data) {
        io.emit('new-carrito-add', data);
        console.log(data);
    });

});


app.use(bodyparser.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyparser.json({ limit: '50mb', extended: true }));


app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    res.header('Allow', 'GET, PUT, POST, DELETE, OPTIONS');
    next();
});

app.use('/api', cliente_routes);
app.use('/api', admin_routes);
app.use('/api', cupon_routes);


server.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en puerto ' + process.env.PORT);
});

