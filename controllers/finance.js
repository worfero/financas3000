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

module.exports.new = async (req, res) => {
    //const finance = req.body;
//
    //await writeFinance(finance);
    //res.json({ success: true, updated: finance });
};
