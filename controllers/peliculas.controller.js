const { response, request } = require('express');
const { peliculas } = require('../models/mySqlpeliculas');
const { bdmysql } = require('../database/MySqlConnection');
const { body } = require('express-validator');

const peliculasGet = async (req, res = response) => {
    try {
        const unospeliculas = await peliculas.findAll({
            attributes: ['id', 'nombre', 'heroe', 'protagonista']
        });

        res.json({
            ok: true,
            data: unospeliculas
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el Administrador',
            err: error
        });
    }
};

const peliculaIdGet = async (req, res = response) => {
    const { id } = req.params;
    try {
        const unpelicula = await peliculas.findByPk(id, {
            attributes: ['id', 'nombre', 'heroe', 'protagonista']
        });

        if (!unpelicula) {
            return res.status(404).json({
                ok: false,
                msg: `No existe una película con el id: ${id}`
            });
        }

        res.json({
            ok: true,
            data: unpelicula
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el Administrador',
            err: error
        });
    }
};

const peliculasComoGet = async (req = request, res = response) => {
    const { termino } = req.params;
    try {
        const [results, metadata] = await bdmysql.query(
            `SELECT nombre, heroe, protagonista FROM peliculas WHERE nombre LIKE '%${termino}%' ORDER BY nombre`
        );

        res.json({ ok: true, data: results });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el Administrador',
            err: error
        });
    }
};

const peliculasPost = async (req, res = response) => {
    try {
        console.log(req.body);
        const { nombre, heroe, protagonista } = req.body;

        const existepelicula = await peliculas.findOne({ where: { nombre } });
        if (existepelicula) {
            return res.status(400).json({ ok: false, msg: `Ya existe una película llamada: ${nombre}` });
        }

        const nuevaPelicula = await peliculas.create({ nombre, heroe, protagonista });

        res.json({ ok: true, mensaje: 'Película creada', data: nuevaPelicula });
    } catch (error) {
        console.log(error);
        res.status(500).json({ ok: false, msg: 'Hable con el Administrador', err: error });
    }
};

const peliculaPut = async (req, res = response) => {
    const { id } = req.params;
    const { body } = req;
    try {
        const pelicula = await peliculas.findByPk(id);
        if (!pelicula) {
            return res.status(404).json({ ok: false, msg: `No existe una película con el id: ${id}` });
        }
        await pelicula.update(body);
        res.json({ ok: true, msg: 'Película actualizada', data: pelicula });
    } catch (error) {
        console.log(error);
        res.status(500).json({ ok: false, msg: 'Hable con el Administrador', err: error });
    }
};

const peliculaDelete = async (req, res = response) => {
    const { id } = req.params;
    try {
        const pelicula = await peliculas.findByPk(id);
        if (!pelicula) {
            return res.status(404).json({ ok: false, msg: `No existe una película con el id: ${id}` });
        }
        await pelicula.destroy();
        res.json({ ok: true, msg: 'Película eliminada', data: pelicula });
    } catch (error) {
        console.log(error);
        res.status(500).json({ ok: false, msg: 'Hable con el Administrador', err: error });
    }
};

module.exports = {
    peliculasGet,
    peliculaIdGet,
    peliculasComoGet,
    peliculasPost,
    peliculaPut,
    peliculaDelete
};
