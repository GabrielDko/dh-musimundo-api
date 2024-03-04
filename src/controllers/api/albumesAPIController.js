const path = require('path');
const db = require('../../database/models');

const albumesAPIController = {
    'list': async (req, res) => {
        try {
            const albums = await db.Album.findAll({ include: ['artista'] });
            if (!albums.length > 0) {
                throw new Error('No existen albumes en la base de datos.');
            } else {
                return res.status(200).json({
                    meta: {
                        status: 200,
                        total: albums.length,
                        url: 'http://localhost:3000/api/albumes'
                    },
                    data: albums
                });
            }
        } catch (error) {
            return res.status(400).json(error.message)
        }
    },
    'detail': async (req, res) => {
        try {
            const { id } = req.params;
            const artist = await db.Artista.findByPk(id);
            if (!artist) {
                throw new Error(`El artista con el ID ${id} no existe.`)
            }
            const albums = await db.Album.findAll({
                where: {
                    id_artista: id
                }
            })
            if (!albums.length > 0) {
                throw new Error(`El artista con el ID ${id} no tiene albumes.`)
            } else {
                res.status(200).json({
                    meta: {
                        status: 200,
                        total: albums.length,
                        url: `http://localhost:3000/api/albumes/${id}`
                    },
                    data: albums
                })
            }

        } catch (error) {
            return res.status(400).json(error.message)
        }
    }
}

module.exports = albumesAPIController;