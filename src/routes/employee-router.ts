import express from 'express';
import { employeeRepository, holidayRequestRepository } from '../app.js';

const router = express.Router();

router.get('/', (req, res) => {
    let employees = employeeRepository.getAll();
    for (let employee of employees)
        employee.holidays = holidayRequestRepository.getApprovedByEmployeeId(employee.id);
    res.render('employees.ejs', { employees })
})

router.post('/', (req, res) => {
    employeeRepository.add({ name: req.body.name });
    res.redirect('/employees');
})

export default router;
