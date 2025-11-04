const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const opts = { toJSON: { virtuals: true } };

const FinanceSchema = new Schema({
    user: String,
    balance: Number,
    incomes:
    {
        total: Number,
        array: [
            {
            name: String,
            value: Number
            }
        ]
    },
    fixedBills:
    {
        total: Number,
        array: [
            {
            name: String,
            value: Number
            }
        ]
    }
}, opts);

module.exports = mongoose.model('Finance', FinanceSchema);