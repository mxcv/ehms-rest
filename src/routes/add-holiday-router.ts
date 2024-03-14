import express from 'express';
import dayjs from 'dayjs';
import { employeeRepository, holidayRequestRepository, holidayRulesRepository } from '../app.js';
import { HolidayRequest, HolidayRules } from '../models.js';

const router = express.Router();

router.get('/', (req, res) => {
    res.render('add-holiday.ejs', { employees: employeeRepository.getAll() });
})

router.post('/', (req, res) => {
    const holidayRequest: HolidayRequest = {
        period: {
            from: dayjs.utc(req.body.startDate),
            to: dayjs.utc(req.body.endDate)
        },
        status: 'pending',
        employeeId: +req.body.employeeId
    };
    holidayRequest.status = checkHolidayRequest(holidayRequest, holidayRulesRepository.get()) ? 'approved' : 'pending';
    holidayRequestRepository.add(holidayRequest);
    res.redirect('/holidays');
})

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
