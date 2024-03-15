import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc.js';
import HolidayManagmentFileRepositoryFactory from './repositories-in-fs.js';

const repositoryFactory = new HolidayManagmentFileRepositoryFactory();
const employeeRepository = repositoryFactory.createEmployeeRepository();
const holidayRequestRepository = repositoryFactory.createHolidayRequestRepository();
const holidayRulesRepository = repositoryFactory.createHolidayRulesRepository();

dayjs.extend(utc);
holidayRulesRepository.update({
    maxConsecutiveDays: 20,
    blackoutPeriods: [
        { from: dayjs.utc('2024-04-01'), to: dayjs.utc('2024-04-30') },
        { from: dayjs.utc('2024-09-01'), to: dayjs.utc('2024-09-30') }
    ]
});

export {
    employeeRepository,
    holidayRequestRepository,
    holidayRulesRepository
}
