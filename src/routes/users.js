import express from 'express';
import notFoundErrorHandler from '../middleware/notFoundErrorHandler.js';
import NotFoundError from '../errors/NotFoundError.js';
import auth from "../middleware/auth.js";
import getUsers from '../services/users/getUsers.js';


const router = express.Router()

router.get('/', async (req, res) => {
    try {
        const { username, email } = req.query;

        const users = await getUsers(username, email);
        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).send('Something went wrong while getting the list of users!');
    }
});

export default router