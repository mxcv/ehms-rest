import { Dayjs } from "dayjs"

interface Employee {
    id?: number,
    name: string,
    holidays?: HolidayRequest[]
}

interface HolidayRequest {
    id?: number,
    period: Period,
    status: HolidayRequestStatus,
    employeeId: number,
    employee?: Employee
}

interface HolidayRules {
    maxConsecutiveDays: number,
    blackoutPeriods: Period[]
}

interface Period {
    from: Dayjs,
    to: Dayjs
}

type HolidayRequestStatus = 'pending' | 'approved' | 'rejected';

export {
    Employee,
    HolidayRequest,
    HolidayRules,
    Period,
    HolidayRequestStatus
}
