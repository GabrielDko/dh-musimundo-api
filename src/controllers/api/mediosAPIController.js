const path = require('path');
const db = require('../../database/models');

const mediosAPIController = {
    'list': async (req, res) => {
        try {
            const media = await db.Medio.findAll();
            if(!media.length > 0){
                throw new Error('No existen medios de grabación');
            }
            res.status(200).json({
                meta: {
                    status:200,
                    total: media.length,
                    url: 'http://localhost:3000/api/medios'
                },
                data: media
            });
        } catch (error) {
            return res.status(400).json(error.message);
        }
    }
}
module.exports = mediosAPIController;