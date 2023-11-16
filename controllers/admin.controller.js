const Admin = require('../models/admin.models');
const Cliente = require('../models/cliente.models');
const Carrito = require('../models/carrito.models');
const Variedad = require('../models/variedad.models');
const Venta = require('../models/venta.models');
const Dventa = require('../models/dventa.models');
const Config = require('../models/config.models');
const Contacto = require('../models/contacto.models');
const Etiqueta = require('../models/etiqueta.models');
const Direccion = require('../models/direccion.models');
const ProductoEtiqueta = require('../models/productoEtiqueta.models');
const Producto = require('../models/producto.models');
const bcrypt = require('bcrypt-nodejs');
const createToken = require('../helpers/jwt');



const fs = require('fs');
const handlebars = require('handlebars');
const ejs = require('ejs');
const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
const path = require('path');



const registroAdmin = async (req, res) => {
    try {
        const data = req.body;
        // Verificar si el admin ya existe por el correo electrónico
        const existing = await Admin.findOne({ where: { email: data.email } });

        if (!existing) {
            if (data.password) {
                // Hash de la contraseña antes de almacenarla en la base de datos
                const hashedPassword = bcrypt.hashSync(data.password);
                // Crear el admin con la contraseña hasheada
                const reg = await Admin.create({
                    ...data,
                    password: hashedPassword,
                });

                res.status(200).send({ data: reg });
            } else {
                res.status(400).send({ message: 'No se proporcionó una contraseña', data: undefined });
            }
        } else {
            res.status(400).send({ message: 'El correo ya existe en la base de datos', data: undefined });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Error del servidor', data: undefined });
    }
}
const loginAdmin = async function (req, res) {
    var data = req.body;

    const admin = await Admin.findOne({ email: data.email });

    if (!admin) {
        res.status(200).send({ message: 'El correo electrónico no existe', data: undefined });
    } else {
        //LOGIN 

        bcrypt.compare(data.password, admin.password, async function (error, check) {
            if (check) {
                res.status(200).send({
                    data: admin,
                    token: createToken(admin)
                });
            } else {
                res.status(200).send({ message: 'Las credenciales no coinciden', data: undefined });
            }
        });

    }
}

const listarEtiquetasAdmin = async (req, res) => {
    if (req.user) {
        var reg = await Etiqueta.findAll();
        res.status(200).send({ data: reg });
    } else {
        res.status(500).send({ message: 'NoAccess' });
    }
}
const eliminarEtiquetaAdmin = async (req, res) => {
    if (req.user) {
        const id = req.params['id'];

        try {
            const reg = await Etiqueta.destroy({ where: { id } });
            res.status(200).send({ data: reg });
        } catch (error) {
            res.status(500).send({ message: 'Error eliminando etiqueta' });
        }
    } else {
        res.status(500).send({ message: 'NoAccess' });
    }
}

const agregarEtiquetaAdmin = async (req, res) => {
    if (req.user) {
        try {
            const data = req.body;

            data.slug = data.titulo.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
            const reg = await Etiqueta.create(data);
            res.status(200).send({ data: reg });
        } catch (error) {
            res.status(200).send({ data: undefined, message: 'Etiqueta ya existente' });
        }
    } else {
        res.status(500).send({ message: 'NoAccess' });
    }
}

const registroProductoAdmin = async (req, res) => {
    if (req.user) {
        const data = req.body;

        const productos = await Producto.findAll({ where: { titulo: data.titulo } });

        const arrEtiquetas = JSON.parse(data.etiquetas);

        if (productos.length === 0) {
            const imgPath = req.files.portada.path;
            const name = imgPath.split('\\');
            const portadaName = name[2];

            data.slug = data.titulo.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
            data.portada = portadaName;
            const reg = await Producto.create(data);

            if (arrEtiquetas.length >= 1) {
                for (const item of arrEtiquetas) {
                    await ProductoEtiqueta.create({
                        etiquetaId: +item.id,
                        productoId: reg.id,
                    });
                }
            }

            res.status(200).send({ data: reg });
        } else {
            res.status(200).send({ data: undefined, message: 'El título del producto ya existe' });
        }
    } else {
        res.status(500).send({ message: 'NoAccess' });
    }
}

const listarProductosAdmin = async (req, res) => {
    if (req.user) {
        const productos = await Producto.findAll();
        res.status(200).send({ data: productos });
    } else {
        res.status(500).send({ message: 'NoAccess' });
    }
}

const listarVariedadesProductosAdmin = async (req, res) => {
    if (req.user) {
        const productos = await Variedad.findAll({ include: 'producto' });
        res.status(200).send({ data: productos });
    } else {
        res.status(500).send({ message: 'NoAccess' });
    }
}
const obtenerProductoAdmin = async (req, res) => {
    if (req.user) {
        const id = req.params['id'];

        try {
            const reg = await Producto.findByPk(id);
            res.status(200).send({ data: reg });
        } catch (error) {
            res.status(200).send({ data: undefined });
        }
    } else {
        res.status(500).send({ message: 'NoAccess' });
    }
}

const listarEtiquetasProductoAdmin = async (req, res) => {
    if (req.user) {
        const id = req.params['id'];
        const etiquetas = await ProductoEtiqueta.findAll({ where: { productoId: id }, include: 'etiqueta' });
        res.status(200).send({ data: etiquetas });
    } else {
        res.status(500).send({ message: 'NoAccess' });
    }
}

const eliminarEtiquetaProductoAdmin = async (req, res) => {
    if (req.user) {
        const id = req.params['id'];
        console.log(id);
        const reg = await ProductoEtiqueta.destroy({ where: { id } });
        res.status(200).send({ data: reg });

    } else {
        res.status(500).send({ message: 'NoAccess' });
    }
}

const agregarEtiquetaProductoAdmin = async (req, res) => {
    if (req.user) {
        const data = req.body;

        const reg = await ProductoEtiqueta.create(data);
        res.status(200).send({ data: reg });
    } else {
        res.status(500).send({ message: 'NoAccess' });
    }
}

const obtenerPortada = async (req, res) => {
    const img = req.params['img'];

    fs.stat('./uploads/productos/' + img, function (err) {
        if (!err) {
            const pathImg = './uploads/productos/' + img;
            res.status(200).sendFile(path.resolve(pathImg));
        } else {
            const pathImg = './uploads/default.jpg';
            res.status(200).sendFile(path.resolve(pathImg));
        }
    })
}
const actualizarProductoAdmin = async (req, res) => {
    if (req.user) {
        const id = req.params['id'];
        const data = req.body;

        try {
            let reg;
            if (req.files) {
                // SI HAY IMAGEN
                const imgPath = req.files.portada.path;
                const name = imgPath.split('\\');
                const portadaName = name[2];

                reg = await Producto.update({
                    titulo: data.titulo,
                    stock: data.stock,
                    precio: data.precio,
                    precio: data.precio,
                    precio: data.precio,
                    precioDolar: data.precio_dolar,
                    peso: data.peso,
                    sku: data.sku,
                    categoria: data.categoria,
                    visibilidad: data.visibilidad,
                    descripcion: data.descripcion,
                    contenido: data.contenido,
                    portada: portadaName
                }, {
                    where: { id },
                    returning: true
                });

                fs.stat('./uploads/productos/' + reg[1][0].portada, function (err) {
                    if (!err) {
                        fs.unlink('./uploads/productos/' + reg[1][0].portada, (err) => {
                            if (err) throw err;
                        });
                    }
                });
            } else {
                // NO HAY IMAGEN
                reg = await Producto.update({
                    titulo: data.titulo,
                    stock: data.stock,
                    precio: data.precio,
                    precioAntesDolares: data.precioAntesDolares,
                    precio: data.precio,
                    precioDolar: data.precio_dolar,
                    peso: data.peso,
                    sku: data.sku,
                    categoria: data.categoria,
                    visibilidad: data.visibilidad,
                    descripcion: data.descripcion,
                    contenido: data.contenido,
                }, {
                    where: { id },
                    returning: true
                });
            }

            res.status(200).send({ data: reg[1][0] });
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: 'Error interno del servidor' });
        }
    } else {
        res.status(500).send({ message: 'NoAccess' });
    }
}

const listarVariedadesAdmin = async (req, res) => {
    if (req.user) {
        const id = req.params['id'];
        const data = await Variedad.findAll({ where: { productoId: id } });
        res.status(200).send({ data });
    } else {
        res.status(500).send({ message: 'NoAccess' });
    }
}
const actualizarProductoVariedadesAdmin = async (req, res) => {
    if (req.user) {
        const id = req.params['id'];
        const data = req.body;

        try {
            console.log(data.tituloVariedad);
            const reg = await Producto.update({
                tituloVariedad: data.tituloVariedad,
            }, {
                where: { id },
                returning: true
            });

            res.status(200).send({ data: reg[1][0] });
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: 'Error interno del servidor' });
        }
    } else {
        res.status(500).send({ message: 'NoAccess' });
    }
}

const eliminarVariedadAdmin = async (req, res) => {
    if (req.user) {
        const id = req.params['id'];

        try {
            const reg = await Variedad.destroy({
                where: { id }
            });

            res.status(200).send({ data: reg });
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: 'Error interno del servidor' });
        }
    } else {
        res.status(500).send({ message: 'NoAccess' });
    }
}

const agregarNuevaVariedadAdmin = async (req, res) => {
    if (req.user) {
        const data = req.body;

        try {
            console.log(data);
            const reg = await Variedad.create(data);

            res.status(200).send({ data: reg });
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: 'Error interno del servidor' });
        }
    } else {
        res.status(500).send({ message: 'NoAccess' });
    }
}

const listarInventarioProductoAdmin = async (req, res) => {
    if (req.user) {
        const id = req.params['id'];

        try {
            const reg = await Inventario.findAll({
                where: { productoId: id },
                include: { model: Variedad },
                order: [['createdAt', 'DESC']]
            });

            res.status(200).send({ data: reg });
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: 'Error interno del servidor' });
        }
    } else {
        res.status(500).send({ message: 'NoAccess' });
    }
}

const registroInventarioProductoAdmin = async (req, res) => {
    if (req.user) {
        const data = req.body;

        try {
            const reg = await Inventario.create(data);

            // OBTENER EL REGISTRO DE PRODUCTO
            const prod = await Producto.findByPk(reg.productoId);
            const varie = await Variedad.findByPk(reg.variedadId);

            // CALCULAR EL NUEVO STOCK
            // STOCK ACTUAL
            // STOCK A AUMENTAR
            const nuevoStock = parseInt(prod.stock) + parseInt(reg.cantidad);
            const nuevoStockVari = parseInt(varie.stock) + parseInt(reg.cantidad);

            // ACTUALIZACION DEL NUEVO STOCK AL PRODUCTO
            await prod.update({ stock: nuevoStock });
            await varie.update({ stock: nuevoStockVari });

            res.status(200).send({ data: reg });
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: 'Error interno del servidor' });
        }
    } else {
        res.status(500).send({ message: 'NoAccess' });
    }
}
const agregarImagenGaleriaAdmin = async (req, res) => {
    if (req.user) {
        const id = req.params['id'];
        const data = req.body;

        try {
            const imgPath = req.files.imagen.path;
            const name = imgPath.split('\\');
            const imagenName = name[2];

            const reg = await Producto.update({
                $push: {
                    galeria: {
                        imagen: imagenName,
                        _id: data._id
                    }
                }
            }, {
                where: { id },
                returning: true
            });

            res.status(200).send({ data: reg[1][0] });
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: 'Error interno del servidor' });
        }
    } else {
        res.status(500).send({ message: 'NoAccess' });
    }
}

const eliminarImagenGaleriaAdmin = async (req, res) => {
    if (req.user) {
        const id = req.params['id'];
        const data = req.body;

        try {
            const reg = await Producto.update({
                $pull: { galeria: { _id: data._id } }
            }, {
                where: { id },
                returning: true
            });

            res.status(200).send({ data: reg[1][0] });
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: 'Error interno del servidor' });
        }
    } else {
        res.status(500).send({ message: 'NoAccess' });
    }
}

const verificarToken = async (req, res) => {
    console.log(req.user);
    if (req.user) {
        res.status(200).send({ data: req.user });
    } else {
        console.log(2);
        res.status(500).send({ message: 'NoAccess' });
    }
}

const cambiarVsProductoAdmin = async (req, res) => {
    if (req.user) {
        const id = req.params['id'];
        const estado = req.params['estado'];

        try {
            if (estado === 'Edicion') {
                await Producto.update({ estado: 'Publicado' }, { where: { id } });
                res.status(200).send({ data: true });
            } else if (estado === 'Publicado') {
                await Producto.update({ estado: 'Edicion' }, { where: { id } });
                res.status(200).send({ data: true });
            }
        } catch (error) {
            res.status(200).send({ data: undefined });
        }
    } else {
        res.status(500).send({ message: 'NoAccess' });
    }
}

const obtenerConfigAdmin = async (req, res) => {
    try {
        const config = await Config.findByPk(1);
        res.status(200).send({ data: config });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Error interno del servidor' });
    }
}

const actualizarConfigAdmin = async (req, res) => {
    if (req.user) {
        const data = req.body;
        try {
            const config = await Config.update({
                envio_activacion: data.envio_activacion,
                monto_min_soles: data.monto_min_soles,
                monto_min_dolares: data.monto_min_dolares
            }, {
                where: { id: '61abe55d2dce63583086f108' },
                returning: true
            });

            res.status(200).send({ data: config[1][0] });
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: 'Error interno del servidor' });
        }
    } else {
        res.status(500).send({ message: 'NoAccess' });
    }
}

const pedidoCompraCliente = async (req, res) => {
    if (req.user) {
        try {
            const data = req.body;
            const detalles = data.detalles;
            let access = false;
            let productoSl = '';

            for (const item of detalles) {
                const variedad = await Variedad.findByPk(item.variedad, { include: { model: Producto } });
                if (variedad.stock < item.cantidad) {
                    access = true;
                    productoSl = variedad.producto.titulo;
                }
            }

            if (!access) {
                data.estado = 'En espera';
                const venta = await Venta.create(data);

                for (const element of detalles) {
                    element.venta = venta.id;
                    await Dventa.create(element);
                    await Carrito.destroy({ where: { cliente: data.cliente } });
                }

                enviarEmailPedidoCompra(venta.id);
                res.status(200).send({ venta });
            } else {
                res.status(200).send({ venta: undefined, message: 'Stock insuficiente para ' + productoSl });
            }
        } catch (error) {
            console.log(error);
        }
    } else {
        res.status(500).send({ message: 'NoAccess' });
    }
}

const enviarEmailPedidoCompra = async (ventaId) => {
    try {
        const readHTMLFile = (path, callback) => {
            fs.readFile(path, { encoding: 'utf-8' }, (err, html) => {
                if (err) {
                    throw err;
                    callback(err);
                } else {
                    callback(null, html);
                }
            });
        };

        const transporter = nodemailer.createTransport(smtpTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',
            auth: {
                user: 'mikemontania@gmail.com',
                pass: 'dcmplvjviofjojgf'
            }
        }));

        const orden = await Venta.findByPk(ventaId, { include: [{ model: Cliente }, { model: Direccion }] });
        const dventa = await Dventa.findAll({
            where: { venta: ventaId },
            include: [{ model: Producto }, { model: Variedad }]
        });

        readHTMLFile(process.cwd() + '/mails/email_pedido.html', (err, html) => {

            const restHtml = ejs.render(html, { orden, dventa });

            const template = handlebars.compile(restHtml);
            const htmlToSend = template({ op: true });

            const mailOptions = {
                from: 'mikemontania@gmail.com',
                to: orden.cliente.email,
                subject: 'Gracias por tu orden, Prágol.',
                html: htmlToSend
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (!error) {
                    console.log('Email sent: ' + info.response);
                }
            });

        });
    } catch (error) {
        console.log(error);
    }
}

const obtenerVentasAdmin = async (req, res) => {
    if (req.user) {
        try {
            const ventas = await Venta.findAll({
                include: [{ model: Cliente }, { model: Direccion }],
                order: [['createdAt', 'DESC']]
            });
            res.status(200).send({ data: ventas });
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: 'Error interno del servidor' });
        }
    } else {
        res.status(500).send({ message: 'NoAccess' });
    }
}

const obtenerDetallesOrdenesCliente = async (req, res) => {
    if (req.user) {
        const id = req.params['id'];
        try {
            const venta = await Venta.findByPk(id, { include: [{ model: Direccion }, { model: Cliente }] });
            const detalles = await Dventa.findAll({
                where: { venta: venta.id },
                include: [{ model: Producto }, { model: Variedad }]
            });
            res.status(200).send({ data: venta, detalles: detalles });
        } catch (error) {
            console.log(error);
            res.status(200).send({ data: undefined });
        }
    } else {
        res.status(500).send({ message: 'NoAccess' });
    }
}

const marcarFinalizadoOrden = async (req, res) => {
    if (req.user) {
        const id = req.params['id'];
        const data = req.body;

        try {
            const venta = await Venta.findByPk(id);
            await venta.update({ estado: 'Finalizado' });

            res.status(200).send({ data: venta });
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: 'Error interno del servidor' });
        }
    } else {
        res.status(500).send({ message: 'NoAccess' });
    }
}
const eliminarOrdenAdmin = async (req, res) => {
    if (req.user) {
        const id = req.params['id'];

        try {
            const venta = await Venta.findByPk(id);
            await venta.destroy();
            await Dventa.destroy({ where: { venta: id } });

            res.status(200).send({ data: venta });
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: 'Error interno del servidor' });
        }
    } else {
        res.status(500).send({ message: 'NoAccess' });
    }
}

const marcarEnvioOrden = async (req, res) => {
    if (req.user) {
        const id = req.params['id'];
        const data = req.body;

        try {
            const venta = await Venta.findByPk(id);
            await venta.update({ tracking: data.tracking, estado: 'Enviado' });

            mailConfirmarEnvio(id);

            res.status(200).send({ data: venta });
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: 'Error interno del servidor' });
        }
    } else {
        res.status(500).send({ message: 'NoAccess' });
    }
}

const confirmarPagoOrden = async (req, res) => {
    if (req.user) {
        const id = req.params['id'];
        const data = req.body;

        try {
            const venta = await Venta.findByPk(id);
            await venta.update({ estado: 'Procesando' });

            const detalles = await Dventa.findAll({ where: { venta: id } });
            for (const element of detalles) {
                const elementProducto = await Producto.findByPk(element.producto);
                const newStock = elementProducto.stock - element.cantidad;
                const newVentas = elementProducto.nventas + 1;

                const elementVariedad = await Variedad.findByPk(element.variedad);
                const newStockVariedad = elementVariedad.stock - element.cantidad;

                await Producto.update({ stock: newStock, nventas: newVentas }, { where: { _id: element.producto } });
                await Variedad.update({ stock: newStockVariedad }, { where: { _id: element.variedad } });
            }

            res.status(200).send({ data: venta });
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: 'Error interno del servidor' });
        }
    } else {
        res.status(500).send({ message: 'NoAccess' });
    }
}

const mailConfirmarEnvio = async (ventaId) => {
    try {
        const readHTMLFile = (path, callback) => {
            fs.readFile(path, { encoding: 'utf-8' }, (err, html) => {
                if (err) {
                    throw err;
                    callback(err);
                } else {
                    callback(null, html);
                }
            });
        };

        const transporter = nodemailer.createTransport(smtpTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',
            auth: {
                user: 'mikemontania@gmail.com',
                pass: 'dcmplvjviofjojgf'
            }
        }));

        const orden = await Venta.findByPk(ventaId, { include: [{ model: Cliente }, { model: Direccion }] });
        const dventa = await Dventa.findAll({
            where: { venta: ventaId },
            include: [{ model: Producto }, { model: Variedad }]
        });

        readHTMLFile(process.cwd() + '/mails/email_enviado.html', (err, html) => {

            const restHtml = ejs.render(html, { orden, dventa });

            const template = handlebars.compile(restHtml);
            const htmlToSend = template({ op: true });

            const mailOptions = {
                from: 'mikemontania@gmail.com',
                to: orden.cliente.email,
                subject: 'Tu pedido ' + orden.id + ' fue enviado',
                html: htmlToSend
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (!error) {
                    console.log('Email sent: ' + info.response);
                }
            });

        });
    } catch (error) {
        console.log(error);
    }
}
const registroCompraManualCliente = async (req, res) => {
    if (req.user) {
        const data = req.body;
        const detalles = data.detalles;

        data.estado = 'Procesando';

        try {
            const venta = await Venta.create(data);

            for (const element of detalles) {
                element.venta = venta.id;
                element.cliente = venta.cliente;
                await Dventa.create(element);

                const elementProducto = await Producto.findByPk(element.producto);
                const newStock = elementProducto.stock - element.cantidad;
                const newVentas = elementProducto.nventas + 1;

                const elementVariedad = await Variedad.findByPk(element.variedad);
                const newStockVariedad = elementVariedad.stock - element.cantidad;

                await Producto.update({ stock: newStock, nventas: newVentas }, { where: { id: element.producto } });
                await Variedad.update({ stock: newStockVariedad }, { where: { id: element.variedad } });
            }

            enviarOrdenCompra(venta.id);

            res.status(200).send({ venta });
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: 'Error interno del servidor' });
        }
    } else {
        res.status(500).send({ message: 'NoAccess' });
    }
}

const enviarOrdenCompra = async (ventaId) => {
    try {
        const readHTMLFile = (path, callback) => {
            fs.readFile(path, { encoding: 'utf-8' }, (err, html) => {
                if (err) {
                    throw err;
                    callback(err);
                } else {
                    callback(null, html);
                }
            });
        };

        const transporter = nodemailer.createTransport(smtpTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',
            auth: {
                user: 'mikemontania@gmail.com',
                pass: 'dcmplvjviofjojgf'
            }
        }));

        const orden = await Venta.findByPk(ventaId, { include: [{ model: Cliente }, { model: Direccion }] });
        const dventa = await Dventa.findAll({
            where: { venta: ventaId },
            include: [{ model: Producto }, { model: Variedad }]
        });

        readHTMLFile(process.cwd() + '/mails/email_compra.html', (err, html) => {

            const restHtml = ejs.render(html, { orden, dventa });

            const template = handlebars.compile(restHtml);
            const htmlToSend = template({ op: true });

            const mailOptions = {
                from: 'mikemontania@gmail.com',
                to: orden.cliente.email,
                subject: 'Confirmación de compra ' + orden.id,
                html: htmlToSend
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (!error) {
                    console.log('Email sent: ' + info.response);
                }
            });

        });
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    registroAdmin,
    loginAdmin,
    eliminarEtiquetaAdmin,
    listarEtiquetasAdmin,
    agregarEtiquetaAdmin,
    registroProductoAdmin,
    listarProductosAdmin,
    obtenerProductoAdmin,
    listarEtiquetasProductoAdmin,
    eliminarEtiquetaProductoAdmin,
    agregarEtiquetaProductoAdmin,
    obtenerPortada,
    actualizarProductoAdmin,
    listarVariedadesAdmin,
    actualizarProductoVariedadesAdmin,
    agregarNuevaVariedadAdmin,
    eliminarVariedadAdmin,
    listarInventarioProductoAdmin,
    registroInventarioProductoAdmin,
    agregarImagenGaleriaAdmin,
    eliminarImagenGaleriaAdmin,
    verificarToken,
    cambiarVsProductoAdmin,
    obtenerConfigAdmin,
    actualizarConfigAdmin,
    pedidoCompraCliente,
    obtenerVentasAdmin,
    obtenerDetallesOrdenesCliente,
    marcarFinalizadoOrden,
    eliminarOrdenAdmin,
    marcarEnvioOrden,
    confirmarPagoOrden,
    registroCompraManualCliente,
    listarVariedadesProductosAdmin
}