const Finance = require('../models/finance');

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