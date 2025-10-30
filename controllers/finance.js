const Finance = require('../models/finance');
const path = require('path');

module.exports.index = async (req, res) => {
    //const finance = await readFinance();
    //finance.totalIncome = 0;
    //finance.totalFixedBills = 0;
    //finance.balance = 0;
//
    //finance.incomes.forEach(function(income, index){
    //    finance.totalIncome += income.value;
    //});
//
    //finance.fixedBills.forEach(function(bill, index){
    //    finance.totalFixedBills += bill.value;
    //});
//
    //finance.balance = finance.totalIncome - finance.totalFixedBills;

    const finances = await Finance.find({});
    const finance = finances[0];

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
