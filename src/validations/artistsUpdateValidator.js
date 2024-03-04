const {body} = require('express-validator');
const db = require('../database/models');

module.exports = [
    body('nombre')
    .notEmpty().withMessage('El campo no puede estar vacio.')
    .isLength({min: 3, max: 30}).withMessage('La cantidad mínima de carácteres es de 3 y la máxima de 30.')
    .custom(async (value, { req }) => {
        const { id } = req.params;
        const existingArtist = await db.Artista.findOne({ where: { nombre: value } });
        if (existingArtist && existingArtist.id != id) {
            throw new Error('El título de la película ya está siendo utilizado por otra película');
        }
    })
]


