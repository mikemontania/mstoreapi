'use strict'

const express = require('express');
var CuponController = require('../controllers/cupon.controller');

const router = express.Router();
const auth = require('../middlewares/authenticate.middleware');

router.post('/registro_cupon_admin', auth.auth, CuponController.registroCuponAdmin);
router.get('/listar_cupones_admin', auth.auth, CuponController.listarCuponesAdmin);
router.get('/obtener_cupon_admin/:id', auth.auth, CuponController.obtenerCuponAdmin);
router.put('/actualizar_cupon_admin/:id', auth.auth, CuponController.actualizarCuponAdmin);
router.delete('/eliminar_cupon_admin/:id', auth.auth, CuponController.eliminarCuponAdmin);
router.get('/validar_cupon_admin/:cupon', auth.auth, CuponController.validarCuponAdmin);


module.exports = router;