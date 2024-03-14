import { Employee, HolidayRequest, HolidayRules } from '../models.js'

interface EmployeeRepository {
    create(employee: Employee): void;
    readAll(): Employee[];
    joinWithHolidayRequests(holidayRequests: HolidayRequest[]): void;
}

interface HolidayRequestRepository {
    create(holidayRequest: HolidayRequest): void;
    readAll(): HolidayRequest[];
    update(holidayRequest: HolidayRequest): void;
    delete(id: number): void;
    joinApprovedWithEmployees(employees: Employee[]): void;
}

interface HolidayRulesRepository {
    read(): HolidayRules;
    update(holidayRules: HolidayRules) : void;
}

interface HolidayManagmentRepositoryFactory {
    createEmployeeRepository(): EmployeeRepository;
    createHolidayRequestRepository(): HolidayRequestRepository;
    createHolidayRulesRepository(): HolidayRulesRepository;
}

export {
    EmployeeRepository,
    HolidayRequestRepository,
    HolidayRulesRepository,
    HolidayManagmentRepositoryFactory
}
