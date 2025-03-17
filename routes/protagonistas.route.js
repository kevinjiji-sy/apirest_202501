const { Router } = require('express');

const { protagonistasGet, 
        protagonistaIdGet,
        protagonistasComoGet,
        protagonistasPost,
        protagonistaPut,
        protagonistaDelete,
    //pruebaPost,
    //pruebaPut,
    //pruebaDelete,
    //pruebaPatch 
} = require('../controllers/protagonistas.controller');

const router = Router();

router.get('/', protagonistasGet);

router.get('/:id', protagonistaIdGet);

router.get('/como/:termino', protagonistasComoGet);

//Para insertar un protagonista en la BD
router.post('/', protagonistasPost);

//Para modificar un protagonista en la BD
router.put('/:id', protagonistaPut);

//Para eliminar un protagonista de la BD
router.delete('/:id', protagonistaDelete);

//router.patch('/', usuariosPatch);

module.exports = router;