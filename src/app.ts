import express from 'express';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc.js';
import { HolidayManagmentRepositoryInMemoryFactory } from './repositories/repositories-in-memory.js';
import employeeRouter from './routes/employee-router.js';
import holidaysRouter from './routes/holidays-router.js';
import addHolidayRouter from './routes/add-holiday-router.js';
import util from 'util';

dayjs.extend(utc);
const repositoryFactory = new HolidayManagmentRepositoryInMemoryFactory();
const employeeRepository = repositoryFactory.createEmployeeRepository();
const holidayRequestRepository = repositoryFactory.createHolidayRequestRepository();
const holidayRulesRepository = repositoryFactory.createHolidayRulesRepository();
const app = express();
const port = 4000;

app.use(express.json());
app.use(express.urlencoded());
app.set('views', './src/views')
app.set('view engine', 'ejs')

app.use((req, res, next) => {
    console.log(`${req.method}\t${req.url}\t${util.inspect(req.body)}`);
    next();
})

app.get('/', (req, res) => res.render('index.ejs'))
app.use('/employees', employeeRouter);
app.use('/holidays', holidaysRouter);
app.use('/add-holiday', addHolidayRouter);

app.listen(port, () => {
    console.log(`Listening on ${port}...`);
});

export {
    employeeRepository,
    holidayRequestRepository,
    holidayRulesRepository
}
