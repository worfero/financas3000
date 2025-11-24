require("dotenv").config();
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

// node packages
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const methodOverride = require('method-override');
const { auth, requiresAuth } = require('express-openid-connect');

// custom scripts
const { isActivePage, checkLogin } = require('./middleware');

// route declaration
const financeRoutes = require('./routes/finance');
const incomeRoutes = require('./routes/incomes');
const fixedBillRoutes = require('./routes/fixedBills');
const billRoutes = require('./routes/bills');

// MongoDB setup
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

//app.use(morgan('tiny'));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// Auth0 user management config
const config = {
    authRequired: false,
    auth0Logout: true,
    secret: process.env.AUTH0_SECRET,
    baseURL: 'http://localhost:3000',
    clientID: process.env.AUTH0_CLIENT_ID,
    issuerBaseURL: process.env.AUTH0_BASE_URL
};

app.use(auth(config));

// my custom middleware
app.use(isActivePage);
app.use(checkLogin);

// routes
app.use('/finances', financeRoutes);
app.use('/api/incomes', incomeRoutes);
app.use('/api/fixed-bills', fixedBillRoutes);
app.use('/api/bills', billRoutes);

app.get('/', (req, res) => {
    res.render('home');
})

// server initialization
app.listen(3000, () => {
    console.log("Serving on port 3000");
})