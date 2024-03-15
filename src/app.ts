import express from 'express';
import employeeRouter from './routers/employee-router.js';
import requestRouter from './routers/request-router.js';
import util from 'util';

const app = express();
const port = 3000;

app.use(express.json());

app.set('views', './src/views');
app.set('view engine', 'ejs');

app.use((req, res, next) => {
    console.log(`${req.method}\t${req.url}\t${util.inspect(req.body)}`);
    next();
});

app.get('/', (req, res) => res.render('index.ejs'));
app.use('/employees', (req, res) => res.render('employees.ejs'));
app.use('/requests', (req, res) => res.render('requests.ejs'));
app.use('/add-request', (req, res) => res.render('add-request.ejs'));
app.use('/update-request/:id', (req, res) => res.render('update-request.ejs', { id: req.params.id }));

app.use('/api/employees', employeeRouter);
app.use('/api/requests', requestRouter);

app.listen(port, () => console.log(`Listening on ${port}...`));
