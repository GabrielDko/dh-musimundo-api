const path = require('path');
const db = require('../../database/models');

const cancionesAPIController = {
    'list': async (req, res) => {
        try {
            const songs = await db.Cancion.findAll({include: ['medio','genero']});
            if(!songs.length > 0){
                throw new Error('No existen canciones');
            }
            res.status(200).json({
                meta: {
                    status:200,
                    total: songs.length,
                    url: 'http://localhost:3000/api/canciones'
                },
                data: songs
            });
        } catch (error) {
            return res.status(400).json(error.message);
        }
    }
}
module.exports = cancionesAPIController;