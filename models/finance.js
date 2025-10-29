const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const opts = { toJSON: { virtuals: true } };

const FinanceSchema = new Schema({
    user: String,
    totalIncome: Number,
    totalFixedBills: Number,
    balance: Number,
    incomes: [
        {
            name: String,
            value: Number
        }
    ],
    fixedBills: [
        {
            name: String,
            value: Number
        }
    ]
}, opts);

module.exports = mongoose.model('Finance', FinanceSchema);