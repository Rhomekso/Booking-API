//properties.js
import express from 'express';
import notFoundErrorHandler from '../middleware/notFoundErrorHandler.js';
import NotFoundError from '../errors/NotFoundError.js';
import auth from "../middleware/auth.js";
import getProperties from '../services/properties/getProperties.js';

const router = express.Router()


router.get('/', async (req, res) => {
    try {
        const { location, pricePerNight } = req.query;

        const properties = await getProperties(location, pricePerNight);
        res.status(200).json(properties);
    } catch (error) {
        console.error(error);
        res.status(500).send('Something went wrong while getting the list of properties!');
    }
});


export default router