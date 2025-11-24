const Finance = require('../models/finance');

module.exports.newBill = async (req, res) => {
    const bill = req.body;

    const finances = await Finance.find({});
    const finance = finances[0];

    finance.bills.array.push(bill);

    await finance.save();

    const data = { success: true, updated: finance }
    res.json(data);
};

module.exports.updateBill = async (req, res) => {
    const { billId, newValue } = req.body;

    const finances = await Finance.find({});
    const finance = finances[0];
    const bill = finance.bills.array.find(bill => bill._id.toString() === billId);

    finance.bills.total = finance.bills.total - bill.value + newValue;

    finance.balance = finance.incomes.total - finance.fixedBills.total - finance.bills.total;

    bill.value = newValue;

    await finance.save();
    const data = { success: true, updated: finance }
    res.json(data);
};

module.exports.deleteBill = async (req, res) => {
    const billId = req.params.id;

    const finances = await Finance.find({});
    const finance = finances[0];

    finance.bills.total = finance.bills.total - finance.bills.array.find(bill => bill._id.toString() === billId).value;

    finance.bills.array = finance.bills.array.filter(bill => bill._id.toString() !== billId);

    finance.balance = finance.incomes.total - finance.fixedBills.total - finance.bills.total;

    await finance.save();

    const data = { success: true, updated: finance }
    res.json(data);
};