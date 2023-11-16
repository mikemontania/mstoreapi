const { Router } = require('express');
const adminController = require('../controllers/admin.controller');
const auth = require('../middlewares/authenticate.middleware');
const multiparty = require('connect-multiparty');
const path = multiparty({ uploadDir: './uploads/productos' });
const router = Router();

router.post('/registro_admin', adminController.registroAdmin);
router.post('/login_admin', adminController.loginAdmin);
router.get('/listar_etiquetas_admin', auth.auth, adminController.listarEtiquetasAdmin);
router.delete('/eliminar_etiqueta_admin/:id', auth.auth, adminController.eliminarEtiquetaAdmin);
router.post('/agregar_etiqueta_admin', auth.auth, adminController.agregarEtiquetaAdmin);
router.post('/registro_producto_admin', [auth.auth, path], adminController.registroProductoAdmin);
router.get('/listar_productos_admin', auth.auth, adminController.listarProductosAdmin);
router.get('/listar_variedades_productos_admin', auth.auth, adminController.listarVariedadesProductosAdmin);

router.get('/obtener_producto_admin/:id', auth.auth, adminController.obtenerProductoAdmin);
router.get('/listar_etiquetas_producto_admin/:id', auth.auth, adminController.listarEtiquetasProductoAdmin);
router.delete('/eliminar_etiqueta_producto_admin/:id', auth.auth, adminController.eliminarEtiquetaProductoAdmin);
router.post('/agregar_etiqueta_producto_admin', auth.auth, adminController.agregarEtiquetaProductoAdmin);
router.put('/actualizar_producto_admin/:id', [auth.auth, path], adminController.actualizarProductoAdmin);
router.get('/listar_variedades_admin/:id', auth.auth, adminController.listarVariedadesAdmin);
router.put('/actualizar_producto_variedades_admin/:id', auth.auth, adminController.actualizarProductoVariedadesAdmin);
router.delete('/eliminar_variedad_admin/:id', auth.auth, adminController.eliminarVariedadAdmin);
router.post('/agregar_nueva_variedad_admin', auth.auth, adminController.agregarNuevaVariedadAdmin);

router.get('/listar_inventario_producto_admin/:id', auth.auth, adminController.listarInventarioProductoAdmin);
router.post('/registro_inventario_producto_admin', auth.auth, adminController.registroInventarioProductoAdmin);
router.put('/agregar_imagen_galeria_admin/:id', [auth.auth, path], adminController.agregarImagenGaleriaAdmin);
router.put('/eliminar_imagen_galeria_admin/:id', auth.auth, adminController.eliminarImagenGaleriaAdmin);
router.get('/verificar_token', auth.auth, adminController.verificarToken);
router.get('/cambiar_vs_producto_admin/:id/:estado', auth.auth, adminController.cambiarVsProductoAdmin);

router.get('/obtener_config_admin', adminController.obtenerConfigAdmin);
router.put('/actualizar_config_admin', auth.auth, adminController.actualizarConfigAdmin);
router.post('/pedido_compra_cliente', auth.auth, adminController.pedidoCompraCliente);

router.get('/obtener_portada/:img', adminController.obtenerPortada);
router.get('/obtener_ventas_admin', auth.auth, adminController.obtenerVentasAdmin);
router.get('/obtener_detalles_ordenes_cliente/:id', auth.auth, adminController.obtenerDetallesOrdenesCliente);
router.put('/marcar_finalizado_orden/:id', auth.auth, adminController.marcarFinalizadoOrden);
router.delete('/eliminar_orden_admin/:id', auth.auth, adminController.eliminarOrdenAdmin);
router.put('/marcar_envio_orden/:id', auth.auth, adminController.marcarEnvioOrden);
router.put('/confirmar_pago_orden/:id', auth.auth, adminController.confirmarPagoOrden);
router.post('/registro_compra_manual_cliente', auth.auth, adminController.registroCompraManualCliente);

module.exports = router;