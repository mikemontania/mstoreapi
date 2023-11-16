const { Router } = require('express');
const clienteController = require('../controllers/cliente.controller');
const router = Router();
const auth = require('../middlewares/authenticate.middleware');
router.post('/registro_cliente_tienda', clienteController.registroClienteTienda);
router.get('/listar_clientes_tienda', auth.auth, clienteController.listarClientesTienda);

router.get('/listar_productos_destacados_publico', clienteController.listarProductosDestacadosPublico);
router.get('/listar_productos_nuevos_publico', clienteController.listarProductosNuevosPublico);
router.post('/registro_cliente', clienteController.registroCliente);
router.post('/login_cliente', clienteController.loginCliente);
router.get('/obtener_cliente_guest/:id', auth.auth, clienteController.obtenerClienteGuest);
router.put('/actualizar_perfil_cliente_guest/:id', auth.auth, clienteController.actualizarPerfilClienteGuest);
router.post('/registro_direccion_cliente', auth.auth, clienteController.registroDireccionCliente);
router.get('/obtener_direccion_todos_cliente/:id', auth.auth, clienteController.obtenerDireccionTodosCliente);
router.put('/cambiar_direccion_principal_cliente/:id/:cliente', auth.auth, clienteController.cambiarDireccionPrincipalCliente);
router.get('/eliminar_direccion_cliente/:id', auth.auth, clienteController.eliminarDireccionCliente);

router.get('/listar_productos_publico', clienteController.listarProductosPublico);
router.get('/obtener_variedades_productos_cliente/:id', clienteController.obtenerVariedadesProductosCliente);
router.get('/obtener_productos_slug_publico/:slug', clienteController.obtenerProductosSlugPublico);
router.get('/listar_productos_recomendados_publico/:categoria', clienteController.listarProductosRecomendadosPublico);

router.post('/agregar_carrito_cliente', auth.auth, clienteController.agregarCarritoCliente);
router.get('/obtener_carrito_cliente/:id', auth.auth, clienteController.obtenerCarritoCliente);
router.delete('/eliminar_carrito_cliente/:id', auth.auth, clienteController.eliminarCarritoCliente);
router.get('/obtener_ordenes_cliente/:id', auth.auth, clienteController.obtenerOrdenesCliente);
router.get('/obtener_detalles_ordenes_cliente/:id', auth.auth, clienteController.obtenerDetallesOrdenesCliente);
router.post('/emitir_review_producto_cliente', auth.auth, clienteController.emitirReviewProductoCliente);
router.get('/obtener_review_producto_cliente/:id', clienteController.obtenerReviewProductoCliente);
router.get('/obtener_reviews_producto_publico/:id', clienteController.obtenerReviewsProductoPublico);
router.post('/comprobar_carrito_cliente', auth.auth, clienteController.comprobarCarritoCliente);
router.get('/consultarIDPago/:id', auth.auth, clienteController.consultarIDPago);
router.post('/registro_compra_cliente', auth.auth, clienteController.registroCompraCliente);
router.get('/obtener_reviews_cliente/:id', auth.auth, clienteController.obtenerReviewsCliente);
router.post('/enviar_mensaje_contacto', clienteController.enviarMensajeContacto);


module.exports = router;