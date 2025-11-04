const Finance = require('../models/finance');
const path = require('path');

module.exports.index = async (req, res) => {
    const finances = await Finance.find({});
    const finance = finances[0];
    
    finance.incomes.total = finance.incomes.array.reduce((total, income) => total + income.value, 0);
    finance.fixedBills.total = finance.fixedBills.array.reduce((total, bill) => total + bill.value, 0);

    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    res.render('finances/index', { finance });
};

module.exports.newIncome = async (req, res) => {
    const income = req.body;
    const finances = await Finance.find({});
    const finance = finances[0];
    finance.incomes.array.push(income);
    await finance.save();
    const data = { success: true, updated: finance }
    res.json(data);
};

module.exports.updateIncome = async (req, res) => {
    const { incomeId, newValue } = req.body;
    const finances = await Finance.find({});
    const finance = finances[0];

    const income = finance.incomes.array.find(income => income._id.toString() === incomeId);

    finance.incomes.total = finance.incomes.total - income.value + newValue;
    finance.balance = finance.incomes.total - finance.fixedBills.total;

    income.value = newValue;

    await finance.save();

    const data = { success: true, updated: finance }
    res.json(data);
};

module.exports.deleteIncome = async (req, res) => {
    const incomeId = req.params.id;

    const finances = await Finance.find({});
    const finance = finances[0];

    finance.incomes.total = finance.incomes.total - finance.incomes.array.find(income => income._id.toString() === incomeId).value;

    finance.incomes.array = finance.incomes.array.filter(income => income._id.toString() !== incomeId);

    finance.balance = finance.incomes.total - finance.fixedBills.total;

    await finance.save();

    const data = { success: true, updated: finance }
    res.json(data);
};

module.exports.newFixedBill = async (req, res) => {
    const bill = req.body;

    const finances = await Finance.find({});
    const finance = finances[0];

    finance.fixedBills.array.push(bill);

    await finance.save();

    const data = { success: true, updated: finance }
    res.json(data);
};

module.exports.updateFixedBill = async (req, res) => {
    const { billId, newValue } = req.body;

    const finances = await Finance.find({});
    const finance = finances[0];
    const bill = finance.fixedBills.array.find(bill => bill._id.toString() === billId);

    finance.fixedBills.total = finance.fixedBills.total - bill.value + newValue;

    finance.balance = finance.incomes.total - finance.fixedBills.total;

    bill.value = newValue;

    await finance.save();
    const data = { success: true, updated: finance }
    res.json(data);
};

module.exports.deleteFixedBill = async (req, res) => {
    const billId = req.params.id;

    const finances = await Finance.find({});
    const finance = finances[0];

    finance.fixedBills.total = finance.fixedBills.total - finance.fixedBills.array.find(bill => bill._id.toString() === billId).value;

    finance.fixedBills.array = finance.fixedBills.array.filter(bill => bill._id.toString() !== billId);

    finance.balance = finance.incomes.total - finance.fixedBills.total;

    await finance.save();

    const data = { success: true, updated: finance }
    res.json(data);
};


