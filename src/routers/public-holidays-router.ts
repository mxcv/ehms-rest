import express, { response } from 'express';
import axios from 'axios';

const router = express.Router();

router.get('/:year/:countryCode', (req, res) => {
    axios.get(`https://date.nager.at/api/v3/publicholidays/${req.params.year}/${req.params.countryCode}`)
        .then(response => res.json(response.data.map(h => ({ date: h.date, name: h.name }))));
})

export default router;
