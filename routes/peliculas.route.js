const { Router } = require('express');

const { peliculasGet, 
        peliculaIdGet,
        peliculasComoGet,
        peliculasPost,
        peliculaPut,
        peliculaDelete,
    //pruebaPost,
    //pruebaPut,
    //pruebaDelete,
    //pruebaPatch 
} = require('../controllers/peliculas.controller');

const router = Router();

router.get('/', peliculasGet);

router.get('/:id', peliculaIdGet);

router.get('/como/:termino', peliculasComoGet);

//Para insertar un pelicula en la BD
router.post('/', peliculasPost);

//Para modificar un pelicula en la BD
router.put('/:id', peliculaPut);

//Para eliminar un pelicula de la BD
router.delete('/:id', peliculaDelete);

//router.patch('/', usuariosPatch);

module.exports = router;