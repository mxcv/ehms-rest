import express from 'express';
import dayjs from 'dayjs';
import { employeeRepository, holidayRequestRepository, holidayRulesRepository } from '../repositories/repositories-config.js';
import { HolidayRequest, HolidayRules } from '../models.js';

const router = express.Router();

router.get('/', (req, res) => {
    const holidayRequests = holidayRequestRepository.readAll();
    employeeRepository.joinWithHolidayRequests(holidayRequests);
    return res.json(holidayRequests);
});

router.get('/:id', (req, res) => {
    return res.json(holidayRequestRepository.readById(+req.params.id));
});

router.post('/', (req, res) => {
    const holiday: HolidayRequest = {
        period: {
            from: dayjs.utc(req.body.period.from),
            to: dayjs.utc(req.body.period.to)
        },
        status: 'pending',
        employeeId: +req.body.employeeId
    }
    holiday.status = checkHolidayRequest(holiday, holidayRulesRepository.read()) ? 'approved' : 'pending';
    holidayRequestRepository.create(holiday);
    res.sendStatus(201);
});

router.put('/:id', (req, res) => {
    holidayRequestRepository.update({
        id: +req.params.id,
        period: {
            from: dayjs.utc(req.body.period.from),
            to: dayjs.utc(req.body.period.to)
        },
        status: req.body.status,
        employeeId: +req.body.employeeId
    });
    res.send();
});

router.delete('/:id', (req, res) => {
    holidayRequestRepository.delete(+req.params.id);
    res.send();
});

function checkHolidayRequest(holidayRequest: HolidayRequest, holidayRules: HolidayRules): boolean {
    if (holidayRequest.period.to.diff(holidayRequest.period.from, 'day') > holidayRules.maxConsecutiveDays)
        return false;
    for (let blackout of holidayRules.blackoutPeriods)
        if (holidayRequest.period.from.isAfter(blackout.from) &&
            holidayRequest.period.from.isBefore(blackout.to) || 
            holidayRequest.period.to.isAfter(blackout.from) &&
            holidayRequest.period.to.isBefore(blackout.to))
            return false;
    return true;
}

export default router;
