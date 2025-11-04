const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const methodOverride = require('method-override');

const financeRoutes = require('./routes/finance');
const incomeRoutes = require('./routes/incomes');
const fixedBillRoutes = require('./routes/fixedBills');

mongoose.connect('mongodb://localhost:27017/finance');

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.engine('ejs', ejsMate)

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.use('/', financeRoutes);
app.use('/api/incomes', incomeRoutes);
app.use('/api/fixed-bills', fixedBillRoutes);

app.listen(3000, () => {
    console.log("Serving on port 3000");
})