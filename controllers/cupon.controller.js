const Cupon = require('../models/cupon.models');

const registroCuponAdmin = async (req, res) => {
    if (req.user) {
        try {
            const data = req.body;
            const reg = await Cupon.create(data);
            res.status(200).send({ data: reg });
        } catch (error) {
            res.status(500).send({ message: 'Error inesperado' });
        }
    } else {
        res.status(500).send({ message: 'NoAccess' });
    }
};

const listarCuponesAdmin = async (req, res) => {
    if (req.user) {
        try {
            const cupones = await Cupon.findAll();
            res.status(200).send({ data: cupones });
        } catch (error) {
            res.status(500).send({ message: 'Error inesperado' });
        }
    } else {
        res.status(500).send({ message: 'NoAccess' });
    }
};

const obtenerCuponAdmin = async (req, res) => {
    if (req.user) {
        try {
            const id = req.params['id'];
            const reg = await Cupon.findByPk(id);
            res.status(200).send({ data: reg });
        } catch (error) {
            res.status(500).send({ data: undefined });
        }
    } else {
        res.status(500).send({ message: 'NoAccess' });
    }
};

const actualizarCuponAdmin = async (req, res) => {
    if (req.user) {
        try {
            const data = req.body;
            const id = req.params['id'];

            const reg = await Cupon.update(data, {
                where: { id: id }
            });

            res.status(200).send({ data: reg });
        } catch (error) {
            res.status(500).send({ message: 'Error inesperado' });
        }
    } else {
        res.status(500).send({ message: 'NoAccess' });
    }
};

const eliminarCuponAdmin = async (req, res) => {
    if (req.user) {
        try {
            const id = req.params['id'];
            const reg = await Cupon.destroy({
                where: { id: id }
            });

            res.status(200).send({ data: reg });
        } catch (error) {
            res.status(500).send({ message: 'Error inesperado' });
        }
    } else {
        res.status(500).send({ message: 'NoAccess' });
    }
};

const validarCuponAdmin = async (req, res) => {
    if (req.user) {
        try {
            const cupon = req.params['cupon'];
            const data = await Cupon.findOne({ where: { codigo: cupon } });

            if (data) {
                if (data.limite === 0) {
                    res.status(200).send({ data: undefined, message: 'Se superó el límite máximo de canjes' });
                } else {
                    res.status(200).send({ data: data });
                }
            } else {
                res.status(200).send({ data: undefined, message: 'El cupón no existe' });
            }
        } catch (error) {
            res.status(500).send({ message: 'Error inesperado' });
        }
    } else {
        res.status(500).send({ message: 'NoAccess' });
    }
};
module.exports = {
    registroCuponAdmin,
    listarCuponesAdmin,
    obtenerCuponAdmin,
    actualizarCuponAdmin,
    eliminarCuponAdmin,
    validarCuponAdmin
};
