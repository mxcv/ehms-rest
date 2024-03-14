import express from 'express';
import { employeeRepository, holidayRequestRepository } from '../app.js';

const router = express.Router();

function changeStatus(req, res, newStatus) {
    const requestId = Number(req.params.id);
    try {
        const holidayRequest = holidayRequestRepository.readAll().find(r => r.id === requestId);
        holidayRequest.status = newStatus;
        holidayRequestRepository.update(holidayRequest);
        res.redirect('/holidays');
    } catch (error) {
        console.error(`Error changing holiday request status to ${newStatus}:`, error);
        res.status(500).send('Internal Server Error');
    }
}

router.get('/', (req, res) => {
    const holidayRequests = holidayRequestRepository.readAll().filter(r => r.status === 'pending');
    employeeRepository.joinWithHolidayRequests(holidayRequests);
    res.render('holidays.ejs', { holidayRequests });
});

router.post('/:id/approve', (req, res) => {
    changeStatus(req, res, 'approved');
});

router.post('/:id/reject', (req, res) => {
    changeStatus(req, res, 'rejected');
});

export default router;
