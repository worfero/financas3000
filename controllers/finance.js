const Finance = require('../models/finance');
const path = require('path');

module.exports.index = async (req, res) => {
    const finances = await Finance.find({});
    const finance = finances[0];
    finance.totalIncome = finance.incomes.reduce((total, income) => total + income.value, 0);
    finance.totalFixedBills = finance.fixedBills.reduce((total, bill) => total + bill.value, 0);

    res.render('finances/index', { finance });
};

module.exports.update = async (req, res) => {
    const clientFinance = req.body;
    const serverFinance = await Finance.findByIdAndUpdate(clientFinance._id, clientFinance, { new: true });
    await serverFinance.save();
    console.log(serverFinance);
    const data = { success: true, updated: serverFinance }
    res.json(data);
};

module.exports.newIncome = async (req, res) => {
    const income = req.body;
    const finances = await Finance.find({});
    const finance = finances[0];
    finance.incomes.push(income);
    await finance.save();
    const data = { success: true, updated: finance }
    res.json(data);
};

module.exports.deleteIncome = async (req, res) => {
    const incomeId = req.params.id;

    const finances = await Finance.find({});
    const finance = finances[0];

    finance.totalIncome = finance.totalIncome - finance.incomes.find(income => income._id.toString() === incomeId).value;

    finance.incomes = finance.incomes.filter(income => income._id.toString() !== incomeId);

    await finance.save();

    const data = { success: true, updated: finance }
    res.json(data);
};

