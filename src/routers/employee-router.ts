import express from 'express';
import { employeeRepository, holidayRequestRepository } from '../repositories/repositories-config.js';

const router = express.Router();

router.get('/', (req, res) => {
    const employees = employeeRepository.readAll();
    holidayRequestRepository.joinApprovedWithEmployees(employees);
    res.render('employees.ejs', { employees })
})

router.post('/', (req, res) => {
    employeeRepository.create({ name: req.body.name });
    res.redirect('/employees');
})

export default router;
