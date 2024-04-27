import express from 'express';
import notFoundErrorHandler from '../middleware/notFoundErrorHandler.js';
import NotFoundError from '../errors/NotFoundError.js';
import auth from "../middleware/auth.js";
import getAmenities from '../services/amenities/getAmenities.js';

const router = express.Router()

router.get('/', async (req, res) => {
    try {
        const { name } = req.query;

        const amenities = await getAmenities(name);
        res.status(200).json(amenities);
    } catch (error) {
        console.error(error);
        res.status(500).send('Something went wrong while getting list of amenities!');
    }
});

export default router