'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
require('dotenv').config();


const createToken = (user) => {
    var payload = {
        sub: user.id,
        nombres: user.nombres,
        apellidos: user.apellidos,
        email: user.email,
        role: user.rol,
        iat: moment().unix(),
        exp: moment().add(1, 'day').unix()
    }

    return jwt.encode(payload, process.env.JWT_SECRET);
}

module.exports = createToken;