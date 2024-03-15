import { Employee, HolidayRequest, HolidayRules } from '../models.js';
import { EmployeeRepository, HolidayRequestRepository, HolidayRulesRepository, HolidayManagmentRepositoryFactory } from './repositories.js';

class EmployeeRepositoryInMemory implements EmployeeRepository {
    private employees: Employee[] = [];
    private lastId = 0;

    create(employee: Employee): void {
        employee.id = ++this.lastId;
        this.employees.push(employee);
    }

    readAll(): Employee[] {
        return this.employees;
    }

    joinWithHolidayRequests(holidayRequests: HolidayRequest[]): void {
        for (const request of holidayRequests)
            request.employee = this.employees.find(e => e.id === request.employeeId);
    }
}

class HolidayRequestRepositoryInMemory implements HolidayRequestRepository {
    private holidayRequests: HolidayRequest[] = [];
    private lastId = 0;

    create(holidayRequest: HolidayRequest): void {
        holidayRequest.id = ++this.lastId;
        this.holidayRequests.push(holidayRequest);
    }

    readAll(): HolidayRequest[] {
        return this.holidayRequests;
    }

    readById(id: number): HolidayRequest {
        return this.holidayRequests.find(r => r.id === id);
    }

    update(holidayRequest: HolidayRequest): void {
        const index = this.holidayRequests.findIndex(r => r.id === holidayRequest.id);
        this.holidayRequests[index] = holidayRequest;
    }

    delete(id: number): void {
        this.holidayRequests.splice(this.holidayRequests.findIndex(r => r.id === id), 1);
    }

    joinApprovedWithEmployees(employees: Employee[]): void {
        for (const employee of employees)
            employee.holidays = this.holidayRequests.filter(r => r.employeeId === employee.id && r.status === 'approved');
    }
}

class HolidayRulesRepositoryInMemory implements HolidayRulesRepository {
    private holidayRules: HolidayRules = null;

    read(): HolidayRules {
        return this.holidayRules;
    }

    update(holidayRules: HolidayRules): void {
        this.holidayRules = holidayRules;
    }
}

class HolidayManagmentRepositoryInMemoryFactory implements HolidayManagmentRepositoryFactory {
    createEmployeeRepository(): EmployeeRepository {
        return new EmployeeRepositoryInMemory();
    }
    createHolidayRequestRepository(): HolidayRequestRepository {
        return new HolidayRequestRepositoryInMemory();
    }
    createHolidayRulesRepository(): HolidayRulesRepository {
        return new HolidayRulesRepositoryInMemory();
    }
}

export default HolidayManagmentRepositoryInMemoryFactory
