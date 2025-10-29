const mongoose = require('mongoose');
const Finance = require('../models/finance');

mongoose.connect('mongodb://localhost:27017/financas');

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const seedDB = async () => {
    const finance = new Finance({
        user: 'Henrique',
        totalIncome: 0,
        totalFixedBills: 0,
        balance: 0,
        incomes: [
            {
                name: "Salário",
                value: 0
            }
        ],
        fixedBills: [
            {
                name: "Aluguel",
                value: 0
            }
        ]
    })
    await finance.save();
}

seedDB().then(() => {
    mongoose.connection.close();
})