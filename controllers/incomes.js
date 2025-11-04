const Finance = require('../models/finance');

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