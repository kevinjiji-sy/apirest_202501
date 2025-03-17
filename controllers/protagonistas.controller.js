const { response, request } = require('express');
const { protagonistas } = require('../models/mySqlprotagonistas');
const { bdmysql } = require('../database/MySqlConnection');
const { Heroes } = require('../models/mySqlHeroes');
const { peliculas } = require('../models/mySqlpeliculas');
const { body } = require('express-validator');

const protagonistasGet = async (req, res = response) => {
    try {
        const unosprotagonistas = await protagonistas.findAll({
            include: [
                { 
                    model: Heroes, 
                    attributes: ['id', 'nombre', 'bio', 'casa']
                },
                { 
                    model: peliculas, 
                    attributes: ['id', 'nombre']
                }
            ]
        });

        res.json({
            ok: true,
            data: unosprotagonistas
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ ok: false, msg: 'Hable con el Administrador', err: error });
    }
};

const protagonistaIdGet = async (req, res = response) => {
    const { id } = req.params;
    try {
        const unprotagonista = await protagonistas.findByPk(id, {
            include: [
                { model: Heroes, attributes: ['id', 'nombre'] },
                { model: peliculas, attributes: ['id', 'nombre'] }
            ]
        });

        if (!unprotagonista) {
            return res.status(404).json({ ok: false, msg: 'No existe un protagonista con el id: ' + id });
        }

        res.json({ ok: true, data: unprotagonista });
    } catch (error) {
        console.log(error);
        res.status(500).json({ ok: false, msg: 'Hable con el Administrador', err: error });
    }
};

const protagonistasComoGet = async (req = request, res = response) => {
    const { termino } = req.params;
    try {
        const [results, metadata] = await bdmysql.query(
            "SELECT nombre,bio FROM protagonistas WHERE nombre LIKE '%" + termino + "%' ORDER BY nombre"
        );
        res.json({ ok: true, data: results });
    } catch (error) {
        console.log(error);
        res.status(500).json({ ok: false, msg: 'Hable con el Administrador', err: error });
    }
};

const protagonistasPost = async (req, res = response) => {
    try {
        console.log(req.body);
        const { idheroe, idpelicula, papel, nombreActor, rol } = req.body;

        if (!idheroe || !idpelicula || !papel || !nombreActor || !rol) {
            return res.status(400).json({
                ok: false,
                msg: "Todos los campos son obligatorios"
            });
        }

        const heroe = await Heroes.findByPk(idheroe);
        if (!heroe) {
            return res.status(400).json({
                ok: false,
                msg: `No existe un héroe con ID: ${idheroe}`
            });
        }

        const pelicula = await peliculas.findByPk(idpelicula);
        if (!pelicula) {
            return res.status(400).json({
                ok: false,
                msg: `No existe una película con ID: ${idpelicula}`
            });
        }

        const existeRelacion = await protagonistas.findOne({
            where: { idheroe, idpelicula }
        });

        if (existeRelacion) {
            return res.status(400).json({
                ok: false,
                msg: "Este héroe ya es protagonista de esta película"
            });
        }

        const nuevoProtagonista = await protagonistas.create({ idheroe, idpelicula, papel, nombreActor, rol });

        res.json({
            ok: true,
            msg: "Protagonista creado exitosamente",
            data: nuevoProtagonista
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: "Error en el servidor, hable con el administrador",
            err: error.message
        });
    }
};

const protagonistaPut = async (req, res = response) => {
    const { id } = req.params;
    const { idheroe, idpelicula, papel, nombreActor, rol } = req.body;

    try {
        const protagonista = await protagonistas.findByPk(id);
        if (!protagonista) {
            return res.status(404).json({ 
                ok: false, 
                msg: `No existe un protagonista con el ID: ${id}` 
            });
        }

        await protagonista.update({ idheroe, idpelicula, papel, nombreActor, rol });

        res.json({ 
            ok: true, 
            msg: "Protagonista actualizado exitosamente", 
            data: protagonista 
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ 
            ok: false, 
            msg: "Error en el servidor, hable con el administrador", 
            err: error.message 
        });
    }
};

const protagonistaDelete = async (req, res = response) => {
    const { id } = req.params;
    try {
        const protagonista = await protagonistas.findByPk(id);
        if (!protagonista) {
            return res.status(404).json({ 
                ok: false, 
                msg: `No existe un protagonista con el ID: ${id}` 
            });
        }

        await protagonista.destroy();
        res.json({ 
            ok: true, 
            msg: "Protagonista eliminado exitosamente" 
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ 
            ok: false, 
            msg: "Error en el servidor, hable con el administrador", 
            err: error.message 
        });
    }
};

module.exports = {
    protagonistasGet,
    protagonistaIdGet,
    protagonistasComoGet,
    protagonistasPost,
    protagonistaPut,
    protagonistaDelete
};
