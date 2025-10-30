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
    const newFinance = req.body;
    const finance = await Finance.findByIdAndUpdate(newFinance._id, newFinance, { new: true });
    await finance.save();
    res.json({ success: true, updated: finance });
};

module.exports.new = async (req, res) => {
    //const finance = req.body;
//
    //await writeFinance(finance);
    //res.json({ success: true, updated: finance });
};
