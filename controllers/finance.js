const Finance = require('../models/finance');
const path = require('path');

module.exports.index = async (req, res) => {
    const finances = await Finance.find({});
    const finance = finances[0];
    
    finance.incomes.total = finance.incomes.array.reduce((total, income) => total + income.value, 0);
    finance.fixedBills.total = finance.fixedBills.array.reduce((total, bill) => total + bill.value, 0);
    finance.bills.total = finance.bills.array.reduce((total, bill) => total + bill.value, 0);

    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    res.render('finances/index', { finance });
};
