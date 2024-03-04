const path = require('path');
const db = require('../../database/models');
const { validationResult } = require('express-validator');

const artistasAPIController = {
    'list': async (req, res) => {
        try {
            const artists = await db.Artista.findAll({ include: ['albumes'] });
            if (!artists.length > 0) {
                throw new Error('No existen artistas en la base de datos');
            } else {
                return res.status(200).json({
                    meta: {
                        status: 200,
                        total: artists.length,
                        url: 'http://localhost:3000/api/artistas'
                    },
                    data: artists
                });
            }
        } catch (error) {
            return res.status(400).json(error.message)
        }
    },
    create: async (req, res) => {
        //'Puedes agregar un nuevo artista a nuestra base de datos. 
        //Para porder utilizar esta API, debes ejecutar la ruta http://localhost:3000/api/artistas/create desde la plataforma POSTMAN'
        try {
            const errors = validationResult(req);
            console.log('body: ', req.body);
            if (!errors.isEmpty()) {
                const mappedErrors = errors.mapped()
                const filteredErrors = {};

                for (let key in mappedErrors) {
                    const { type, value, msg } = mappedErrors[key];
                    filteredErrors[key] = { type, value, msg };
                }
                const jsonError = JSON.stringify(filteredErrors)
                throw new Error(jsonError);
            } else {
                const artist = await db.Artista.create(req.body)
                return res.status(200).json(artist)
            }
        } catch (error) {
            return res.status(400).send(error.message)
        }


    },
    update: async (req, res) => {
        //return res.send('Puedes modifcar el nombre del artista en nuestra base de datos. 
        //Para porder utilizar esta API, debes ejecutar la ruta http://localhost:3000/api/artistas/update/id desde la plataforma POSTMAN');
        try {
            const id = parseInt(req.params.id);
            if (!Number.isInteger(id)) {
                throw new Error('El ID indicado debe ser un número entero')
            } else {
                const existingArtist = await db.Artista.findByPk(id)
                if (!existingArtist) {
                    throw new Error(`El artista con el ID ${id} no existe.`)
                } else {
                    const errors = validationResult(req)
                    if (!errors.isEmpty()) {
                        const mappedErrors = errors.mapped()
                        const filteredErrors = {};

                        for (let key in mappedErrors) {
                            const { type, value, msg } = mappedErrors[key];
                            filteredErrors[key] = { type, value, msg };
                        }
                        const jsonError = JSON.stringify(filteredErrors)
                        throw new Error(jsonError);
                    } else {
                        const [updatedRowCount] = await db.Artista.update(req.body, { where: { id } })
                        if (updatedRowCount === 0) {
                            throw new Error(`No se pudo actualizar el artista con el ID ${id}`);
                        }
                        const updatedArtist = await db.Artista.findByPk(id);
                        return res.status(200).json({
                            updatedArtist,
                            updated: 'ok'
                        })
                    }
                }
            }
            
        } catch (error) {
            return res.status(400).send(error.message)
        }

    },
    destroy: async (req, res) => {
        //return res.send('Puedes eliminar un artista a nuestra base de datos. 
        //Para porder utilizar esta API, debes ejecutar la ruta http://localhost:3000/api/artistas/delete/id desde la plataforma POSTMAN');
        try {
            const id = parseInt(req.params.id);
            if (!Number.isInteger(id)) {
                throw new Error('El ID indicado debe ser un número entero')
            } else {
                const artistToRemove = await db.Artista.findByPk(id);
                if (!artistToRemove) {
                    throw new Error(`El artista con el ID ${id} no existe.`)
                } else {
                    await artistToRemove.destroy();
                    res.status(200).json({
                        artist: artistToRemove,
                        deleted: 'ok'
                    })
                }
            }
        } catch (error) {
            return res.status(400).send(error.message)
        }
    }
}
module.exports = artistasAPIController;