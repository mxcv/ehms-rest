import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc.js';
import HolidayManagmentRepositoryInMemoryFactory from './repositories-in-memory.js';

dayjs.extend(utc);
const repositoryFactory = new HolidayManagmentRepositoryInMemoryFactory();
const employeeRepository = repositoryFactory.createEmployeeRepository();
const holidayRequestRepository = repositoryFactory.createHolidayRequestRepository();
const holidayRulesRepository = repositoryFactory.createHolidayRulesRepository();

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
