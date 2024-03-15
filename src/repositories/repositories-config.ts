import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc.js';
import HolidayManagmentRepositoryInMemoryFactory from './repositories-in-memory.js';

const repositoryFactory = new HolidayManagmentRepositoryInMemoryFactory();
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

employeeRepository.create({id: 1, name: 'John'});
employeeRepository.create({id: 2, name: 'Michael'});
holidayRequestRepository.create({id: 1, period: {from: dayjs.utc('2024-01-01'), to: dayjs.utc('2024-01-20')}, status: 'pending', employeeId: 1});
holidayRequestRepository.create({id: 2, period: {from: dayjs.utc('2024-02-01'), to: dayjs.utc('2024-02-20')}, status: 'approved', employeeId: 1});
holidayRequestRepository.create({id: 3, period: {from: dayjs.utc('2024-03-01'), to: dayjs.utc('2024-03-20')}, status: 'rejected', employeeId: 2});

export {
    employeeRepository,
    holidayRequestRepository,
    holidayRulesRepository
}
