const Finance = require('../models/finance');
const fs = require('fs');
const path = require('path');

//const userDataPath = path.join(process.cwd(), 'data', 'finance.json');
//
//async function readFinance() {
//    try {
//        const rawData = await fs.readFileSync(userDataPath, 'utf-8');
//        return JSON.parse(rawData);
//    } catch (err) {
//        console.error('Error reading JSON file:', err);
//    }
//}
//
//async function writeFinance(finance) {
//    try {
//        await fs.writeFileSync(userDataPath, JSON.stringify(finance, null, 2), 'utf-8');
//        console.log('Finance data saved successfully.');
//    } catch (err) {
//        console.error('Error writing JSON file:', err);
//    }
//}

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

module.exports.new = async (req, res) => {
    //const finance = req.body;
//
    //await writeFinance(finance);
    //res.json({ success: true, updated: finance });
};
