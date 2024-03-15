import fs from 'fs';
import path from 'path'
import { EmployeeRepository, HolidayManagmentRepositoryFactory, HolidayRequestRepository, HolidayRulesRepository } from './repositories.js';
import { Employee, HolidayRequest, HolidayRules } from '../models.js';

class JsonFileRepository<T> {
    private directory = 'saves';
    private filename: string;

    constructor(filename: string) {
        if (!fs.existsSync(this.directory))
            fs.mkdirSync(this.directory);
        this.filename = path.join('saves', filename);
    }

    protected save(data: T): void {
        fs.writeFileSync(this.filename, JSON.stringify(data, null, 2), { encoding: 'utf-8' });
    }

    protected load(): T | null {
        if (!fs.existsSync(this.filename))
            return null;
        return JSON.parse(fs.readFileSync(this.filename, { encoding: 'utf-8' }));
    }
}

class EmployeeFileRepository extends JsonFileRepository<Employee[]> implements EmployeeRepository {
    private lastId = 0;

    constructor() {
        super('employees.json');
        const data = this.load();
        if (data)
            this.lastId = data.reduce((prev, current) => (prev && prev.id > current.id) ? prev : current).id;
    }

    create(employee: Employee): void {
        const employees = this.load() ?? [];
        employee.id = ++this.lastId;
        employees.push(employee);
        this.save(employees);
    }

    readAll(): Employee[] {
        return this.load() ?? [];
    }

    joinWithHolidayRequests(holidayRequests: HolidayRequest[]): void {
        const employees = this.load() ?? [];
        for (const holidayRequest of holidayRequests)
            holidayRequest.employee = employees.find(e => e.id === holidayRequest.employeeId);
    }
}

class HolidayRequestFileRepository extends JsonFileRepository<HolidayRequest[]> implements HolidayRequestRepository {
    private lastId = 0;

    constructor() {
        super('holiday-requests.json');
        const data = this.load();
        if (data)
            this.lastId = data.reduce((prev, current) => (prev && prev.id > current.id) ? prev : current).id;
    }

    create(holidayRequest: HolidayRequest): void {
        const holidayRequests = this.load() ?? [];
        holidayRequest.id = ++this.lastId;
        holidayRequests.push(holidayRequest);
        this.save(holidayRequests);
    }

    readAll(): HolidayRequest[] {
        return this.load() ?? [];
    }

    readById(id: number): HolidayRequest {
        return this.load().find(r => r.id === id);
    }

    update(holidayRequest: HolidayRequest): void {
        const holidayRequests = this.load() ?? [];
        const index = holidayRequests.findIndex(r => r.id === holidayRequest.id);
        holidayRequests[index] = holidayRequest;
        this.save(holidayRequests);
    }

    delete(id: number): void {
        const holidayRequests = this.load() ?? [];
        const index = holidayRequests.findIndex(r => r.id === id);
        holidayRequests.splice(index, 1);
        this.save(holidayRequests);
    }

    joinApprovedWithEmployees(employees: Employee[]): void {
        const holidayRequests = this.load() ?? [];
        for (const employee of employees)
            employee.holidays = holidayRequests.filter(r => r.employeeId === employee.id && r.status === 'approved');
    }    
}

class HolidayRulesFileRepository extends JsonFileRepository<HolidayRules> implements HolidayRulesRepository {
    constructor() {
        super('holiday-rules.json');
    }

    read(): HolidayRules {
        return this.load();
    }

    update(holidayRules: HolidayRules): void {
        this.save(holidayRules);
    }
}

class HolidayManagmentFileRepositoryFactory implements HolidayManagmentRepositoryFactory {
    createEmployeeRepository(): EmployeeRepository {
        return new EmployeeFileRepository();
    }
    createHolidayRequestRepository(): HolidayRequestRepository {
        return new HolidayRequestFileRepository();
    }
    createHolidayRulesRepository(): HolidayRulesRepository {
        return new HolidayRulesFileRepository();
    }
}

export default HolidayManagmentFileRepositoryFactory
