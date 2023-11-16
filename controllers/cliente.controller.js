const Cliente = require('../models/cliente.models');
const Carrito = require('../models/carrito.models');
const Variedad = require('../models/variedad.models');
const Venta = require('../models/venta.models');
const Dventa = require('../models/dventa.models');
const Review = require('../models/review.models');
const Contacto = require('../models/contacto.models');
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






const registroCliente = async (req, res) => {
    try {
        const data = req.body;
        // Verificar si el cliente ya existe por el correo electrónico
        const existingClient = await Cliente.findOne({ where: { email: data.email } });

        if (!existingClient) {
            if (data.password) {
                // Hash de la contraseña antes de almacenarla en la base de datos
                const hashedPassword = bcrypt.hashSync(data.password);
                // Crear el cliente con la contraseña hasheada
                const reg = await Cliente.create({
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


const registroClienteTienda = async (req, res) => {
    try {
        const data = req.body;
        // Verificar si el cliente ya existe por el correo electrónico
        const existingClient = await Cliente.findOne({ where: { email: data.email } });

        if (!existingClient) {
            if (data.password) {
                // Hash de la contraseña antes de almacenarla en la base de datos
                const hashedPassword = bcrypt.hashSync(data.password);
                // Crear el cliente con la contraseña hasheada
                const reg = await Cliente.create({
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

const listarClientesTienda = async (req, res) => {
    if (req.user) {
        const clientes = await Cliente.findAll();
        res.status(200).send({ data: clientes });
    } else {
        res.status(500).send({ message: 'NoAccess' });
    }
}

const listarProductosDestacadosPublico = async (req, res) => {
    try {
        const reg = await ProductoEtiqueta.findAll({
            include: [{
                model: Producto,
                as: 'producto',
                order: [['createdAt', 'DESC']], // Ordenar por createdAt en orden descendente
            }],
        });

        res.status(200).send({ data: reg });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Error en el servidor' });
    }
}

const listarProductosNuevosPublico = async (req, res) => {
    try {
        const reg = await Producto.findAll({
            where: { estado: 'findAll' },
            order: [['createdAt', 'DESC']],
            limit: 8
        });
        res.status(200).send({ data: reg });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Error en el servidor' });
    }
}

const loginCliente = async (req, res) => {
    let data = req.body;


    const cliente = await Cliente.findOne({ email: data.email });

    if (!cliente) {
        res.status(200).send({ message: 'No se encontro el correo', data: undefined });
    } else {
        bcrypt.compare(data.password, cliente.password, async (error, check) => {
            if (check) {
                if (data.carrito.length >= 1) {
                    for (let item of data.carrito) {
                        await Carrito.create({
                            cantidad: item.cantidad,
                            producto: item.producto.id,
                            variedad: item.variedad.id,
                            cliente: cliente.id
                        });
                    }
                }

                res.status(200).send({
                    data: cliente,
                    token: createToken(cliente)
                });
            } else {
                res.status(200).send({ message: 'La contraseña no coincide', data: undefined });
            }
        });

    }
}


const obtenerClienteGuest = async (req, res) => {
    if (req.user) {
        const id = req.params['id'];

        try {
            const reg = await Cliente.findByPk(id);

            res.status(200).send({ data: reg });
        } catch (error) {
            res.status(200).send({ data: undefined });
        }
    } else {
        res.status(500).send({ message: 'NoAccess' });
    }
};

const actualizarPerfilClienteGuest = async (req, res) => {
    if (req.user) {
        const id = req.params['id'];
        const data = req.body;

        if (data.password) {
            console.log('Con contraseña');
            bcrypt.hash(data.password, null, null, async (err, hash) => {
                console.log(hash);
                const reg = await Cliente.update({
                    nombres: data.nombres,
                    apellidos: data.apellidos,
                    telefono: data.telefono,
                    fechaNacimiento: data.fechaNacimiento,
                    dni: data.dni,
                    password: hash,
                }, {
                    where: { id: id }
                });
                res.status(200).send({ data: reg });
            });

        } else {
            console.log('Sin contraseña');
            const reg = await Cliente.update({
                nombres: data.nombres,
                apellidos: data.apellidos,
                telefono: data.telefono,
                f_nacimiento: data.fechaNacimiento,
                dni: data.dni,
            }, {
                where: { id: id }
            });
            res.status(200).send({ data: reg });
        }

    } else {
        res.status(500).send({ message: 'NoAccess' });
    }
};

const registroDireccionCliente = async (req, res) => {
    if (req.user) {
        const data = req.body;

        if (data.principal) {
            const direcciones = await Direccion.findAll({ where: { cliente: data.cliente } });

            direcciones.forEach(async element => {
                await Direccion.update({ principal: false }, { where: { id: element.id } });
            });
        }

        const reg = await Direccion.create(data);
        res.status(200).send({ data: reg });
    } else {
        res.status(500).send({ message: 'NoAccess' });
    }
};
const obtenerDireccionTodosCliente = async (req, res) => {
    if (req.user) {
        const id = req.params['id'];
        const direcciones = await Direccion.findAll({
            where: {
                cliente: id,
                status: true
            },
            include: [{ model: Cliente }],
            order: [['createdAt', 'DESC']]
        });
        res.status(200).send({ data: direcciones });
    } else {
        res.status(500).send({ message: 'NoAccess' });
    }
};

const cambiarDireccionPrincipalCliente = async (req, res) => {
    if (req.user) {
        const id = req.params['id'];
        const cliente = req.params['cliente'];

        const direcciones = await Direccion.findAll({ where: { cliente: cliente } });

        direcciones.forEach(async element => {
            await Direccion.update({ principal: false }, { where: { id: element.id } });
        });

        await Direccion.update({ principal: true }, { where: { id: id } });

        res.status(200).send({ data: true });
    } else {
        res.status(500).send({ message: 'NoAccess' });
    }
};

const eliminarDireccionCliente = async (req, res) => {
    if (req.user) {
        const id = req.params['id'];
        const direcciones = await Direccion.update({ status: false }, { where: { id: id } });
        res.status(200).send({ data: direcciones });
    } else {
        res.status(500).send({ message: 'NoAccess' });
    }
};

//---METODOS PUBLICOS----------------------------------------------------
const listarProductosPublico = async (req, res) => {
    try {
        const productos = await Producto.findAll({
            where: { estado: 'Publicado' },
            order: [['createdAt', 'DESC']]
        });

        const arrData = await Promise.all(productos.map(async (item) => {
            const variedades = await Variedad.findAll({ where: { productoId: item.id } });
            return {
                producto: item,
                variedades: variedades
            };
        }));

        res.status(200).send({ data: arrData });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Error en el servidor' });
    }
};

const obtenerVariedadesProductosCliente = async (req, res) => {
    const id = req.params['id'];
    const variedades = await Variedad.findAll({ where: { productoId: id } });
    res.status(200).send({ data: variedades });
};

const obtenerProductosSlugPublico = async (req, res) => {
    const slug = req.params['slug'];
    try {
        const producto = await Producto.findOne({ where: { slug: slug, estado: 'Publicado' } });

        if (producto === null) {
            res.status(200).send({ data: undefined });
        } else {
            res.status(200).send({ data: producto });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ data: undefined });
    }
};

const listarProductosRecomendadosPublico = async (req, res) => {
    const categoria = req.params['categoria'];

    try {
        const productos = await Producto.findAll({
            where: { categoria: categoria, estado: 'Publicado' },
            order: [['createdAt', 'DESC']],
            limit: 8
        });

        res.status(200).send({ data: productos });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Error en el servidor' });
    }
};

const agregarCarritoCliente = async (req, res) => {
    if (req.user) {
        const data = req.body;

        try {
            const variedad = await Variedad.findByPk(data.variedad);

            if (data.cantidad <= variedad.stock) {
                const reg = await Carrito.create(data);
                res.status(200).send({ data: reg });
            } else {
                res.status(200).send({ data: undefined, message: 'Stock insuficiente, ingrese otra cantidad' });
            }
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: 'Error en el servidor' });
        }
    } else {
        res.status(500).send({ message: 'NoAccess' });
    }
};
const obtenerCarritoCliente = async (req, res) => {
    if (req.user) {
        const id = req.params['id'];

        try {
            const carritoCliente = await Carrito.findAll({
                where: { clienteId: id },
                include: [{ model: Producto }, { model: Variedad }]
            });

            res.status(200).send({ data: carritoCliente });
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: 'Error en el servidor' });
        }
    } else {
        res.status(500).send({ message: 'NoAccess' });
    }
};

const eliminarCarritoCliente = async (req, res) => {
    if (req.user) {
        const id = req.params['id'];

        try {
            const reg = await Carrito.destroy({ where: { id: id } });
            res.status(200).send({ data: reg });
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: 'Error en el servidor' });
        }
    } else {
        res.status(500).send({ message: 'NoAccess' });
    }
};

const obtenerOrdenesCliente = async (req, res) => {
    if (req.user) {
        const id = req.params['id'];

        try {
            const reg = await Venta.findAll({
                where: { clienteId: id },
                order: [['createdAt', 'DESC']]
            });

            res.status(200).send({ data: reg });
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: 'Error en el servidor' });
        }
    } else {
        res.status(500).send({ message: 'NoAccess' });
    }
};

const enviarEmailPedidoCompra = async (venta) => {
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

        const orden = await Venta.findByPk(venta, {
            include: [{ model: Cliente }, { model: Direccion }]
        });

        const dventa = await Dventa.findAll({
            where: { ventaId: venta },
            include: [{ model: Producto }, { model: Variedad }]
        });

        readHTMLFile(process.cwd() + '/mails/email_pedido.html', (err, html) => {

            const restHtml = ejs.render(html, { orden: orden, dventa: dventa });

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
};
const obtenerDetallesOrdenesCliente = async (req, res) => {
    if (req.user) {
        const id = req.params['id'];

        try {
            const venta = await Venta.findByPk(id, {
                include: [{ model: Direccion }, { model: Cliente }],
            });

            const detalles = await Dventa.findAll({
                where: { ventaId: venta.id },
                include: [{ model: Producto }, { model: Variedad }],
            });

            res.status(200).send({ data: venta, detalles: detalles });
        } catch (error) {
            console.log(error);
            res.status(200).send({ data: undefined });
        }

    } else {
        res.status(500).send({ message: 'NoAccess' });
    }
};

const emitirReviewProductoCliente = async (req, res) => {
    if (req.user) {
        const data = req.body;
        const reg = await Review.create(data);
        res.status(200).send({ data: reg });
    } else {
        res.status(500).send({ message: 'NoAccess' });
    }
};

const obtenerReviewProductoCliente = async (req, res) => {
    const id = req.params['id'];
    const reg = await Review.findAll({ where: { productoId: id }, order: [['createdAt', 'DESC']] });
    res.status(200).send({ data: reg });
};

const obtenerReviewsProductoPublico = async (req, res) => {
    const id = req.params['id'];

    const reviews = await Review.findAll({
        where: { productoId: id },
        include: [{ model: Cliente }],
        order: [['createdAt', 'DESC']],
    });

    res.status(200).send({ data: reviews });
};

const comprobarCarritoCliente = async (req, res) => {
    if (req.user) {
        try {
            const data = req.body;
            const detalles = data.detalles;
            let access = false;
            let productoSl = '';

            for (const item of detalles) {
                const variedad = await Variedad.findByPk(item.variedad, { include: [{ model: Producto }] });
                if (variedad.stock < item.cantidad) {
                    access = true;
                    productoSl = variedad.producto.titulo;
                }
            }

            if (!access) {
                res.status(200).send({ venta: true });
            } else {
                res.status(200).send({ venta: false, message: 'Stock insuficiente para ' + productoSl });
            }
        } catch (error) {
            console.log(error);
        }
    } else {
        res.status(500).send({ message: 'NoAccess' });
    }
};

const consultarIDPago = async (req, res) => {
    if (req.user) {
        const id = req.params['id'];
        const ventas = await Venta.findAll({ where: { transaccion: id } });
        res.status(200).send({ data: ventas });
    } else {
        res.status(500).send({ message: 'NoAccess' });
    }
};
const registroCompraCliente = async (req, res) => {
    if (req.user) {
        const data = req.body;
        const detalles = data.detalles;

        data.estado = 'Procesando';

        const venta = await Venta.create(data);

        for (const element of detalles) {
            element.ventaId = venta.id;
            await Dventa.create(element);

            const elementProducto = await Producto.findByPk(element.productoId);
            const newStock = elementProducto.stock - element.cantidad;
            const newVentas = elementProducto.nventas + 1;

            const elementVariedad = await Variedad.findByPk(element.variedadId);
            const newStockVariedad = elementVariedad.stock - element.cantidad;

            await Producto.update({
                stock: newStock,
                nventas: newVentas,
            }, {
                where: { id: element.productoId },
            });

            await Variedad.update({
                stock: newStockVariedad,
            }, {
                where: { id: element.variedadId },
            });

            // Limpiar carrito
            await Carrito.destroy({ where: { clienteId: data.clienteId } });
        }

        enviarOrdenCompra(venta.id);

        res.status(200).send({ data: venta });
    } else {
        res.status(500).send({ message: 'NoAccess' });
    }
};

const obtenerReviewsCliente = async (req, res) => {
    if (req.user) {
        const id = req.params['id'];
        const reg = await Review.findAll({
            where: { clienteId: id },
            include: [{ model: Cliente }, { model: Producto }],
        });
        res.status(200).send({ data: reg });

    } else {
        res.status(500).send({ message: 'NoAccess' });
    }
};

const enviarMensajeContacto = async (req, res) => {
    const data = req.body;

    data.estado = 'Abierto';
    const reg = await Contacto.create(data);
    res.status(200).send({ data: reg });
};

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
                pass: 'dcmplvjviofjojgf',
            },
        }));

        const orden = await Venta.findByPk(ventaId, {
            include: [{ model: Cliente }, { model: Direccion }],
        });

        const dventa = await Dventa.findAll({
            where: { ventaId: ventaId },
            include: [{ model: Producto }, { model: Variedad }],
        });

        readHTMLFile(process.cwd() + '/mails/email_compra.html', (err, html) => {

            const restHtml = ejs.render(html, { orden: orden, dventa: dventa });

            const template = handlebars.compile(restHtml);
            const htmlToSend = template({ op: true });

            const mailOptions = {
                from: 'mikemontania@gmail.com',
                to: orden.cliente.email,
                subject: 'Confirmación de compra ' + orden.id,
                html: htmlToSend,
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
};


module.exports = {
    registroCliente,
    registroClienteTienda,
    listarClientesTienda,
    listarProductosDestacadosPublico,
    listarProductosNuevosPublico,
    registroCliente,
    loginCliente,
    obtenerClienteGuest,
    actualizarPerfilClienteGuest,
    registroDireccionCliente,
    obtenerDireccionTodosCliente,
    cambiarDireccionPrincipalCliente,
    eliminarDireccionCliente,
    listarProductosPublico,
    obtenerVariedadesProductosCliente,
    obtenerProductosSlugPublico,
    listarProductosRecomendadosPublico,
    agregarCarritoCliente,
    obtenerCarritoCliente,
    eliminarCarritoCliente,
    obtenerOrdenesCliente,
    obtenerDetallesOrdenesCliente,
    emitirReviewProductoCliente,
    obtenerReviewProductoCliente,
    obtenerReviewsProductoPublico,
    comprobarCarritoCliente,
    consultarIDPago,
    registroCompraCliente,
    obtenerReviewsCliente,
    enviarMensajeContacto,
}