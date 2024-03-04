const express = require('express');
const router = express.Router();
const artistasAPIController = require('../../controllers/api/artistasAPIController');
const artistsRegisterValidator = require('../../validations/artistsRegisterValidator');
const artistsUpdateValidator = require('../../validations/artistsUpdateValidator');
//Rutas
//Listado de todos los artistas
router.get('/', artistasAPIController.list);
//Agregar un artista
router.post('/create',artistsRegisterValidator, artistasAPIController.create);
//Modificar un artista
router.put('/update/:id',artistsUpdateValidator, artistasAPIController.update);
//Eliminar un artista
router.delete('/delete/:id', artistasAPIController.destroy);

module.exports = router;