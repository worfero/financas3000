const mongoose = require('mongoose');
const Finance = require('../models/finance');

mongoose.connect('mongodb://localhost:27017/finance');

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const seedDB = async () => {
    const finance = new Finance({
        user: 'Henrique',
        balance: 0,
        incomes: 
        {
            total: 0,
            array: 
            [
                {
                name: "Salário",
                value: 0
                }
            ]
        },
        fixedBills: 
        {
            total: 0,
            array: 
            [
                {
                name: "Aluguel",
                value: 0
                }
            ]
        }
    })
    await finance.save();
}

seedDB().then(() => {
    mongoose.connection.close();
})