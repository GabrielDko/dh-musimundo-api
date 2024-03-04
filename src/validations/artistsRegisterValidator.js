const {body} = require('express-validator');
const db = require('../database/models');

module.exports = [
    body('nombre')
    .notEmpty().withMessage('El campo no puede estar vacio.')
    .isLength({min: 3, max: 30}).withMessage('La cantidad mínima de carácteres es de 3 y la máxima de 30.')
    .custom( async (value) => {
        const artist = await db.Artista.findOne({
            where: {
                nombre: value
            }
        });

        if(artist){
            throw new Error(`El nombre del artista ${value} ya está regitrado.`)
        }
    })
]

