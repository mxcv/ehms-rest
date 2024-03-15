import express from 'express';
import { employeeRepository, holidayRequestRepository } from '../repositories/repositories-config.js';

const router = express.Router();

router.get('/', (req, res) => {
    const employees = employeeRepository.readAll();
    if (req.query.joinHolidays)
        holidayRequestRepository.joinApprovedWithEmployees(employees);
    return res.json(employees);
});

router.post('/', (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(400).json({ error: 'Name is required' });
        }

        const newEmployee = employeeRepository.create({ name });

        return res.status(201).json(newEmployee);
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default router;
