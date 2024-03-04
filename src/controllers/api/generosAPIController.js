const path = require('path');
const db = require('../../database/models');

const genresAPIController = {
    'list': async (req, res) => {
        try {
            const genres = await db.Genero.findAll();
            if(!genres.length > 0){
                throw new Error('No existen géneros');
            }
            res.status(200).json({
                meta: {
                    status:200,
                    total: genres.length,
                    url: 'http://localhost:3000/api/generos'
                },
                data: genres
            });
        } catch (error) {
            return res.status(400).json(error.message);
        }
    }
}
module.exports = genresAPIController;