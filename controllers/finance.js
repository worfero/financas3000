const fs = require('fs');
const path = require('path');

const userDataPath = path.join(process.cwd(), 'data', 'finance.json');

async function readFinance() {
    try {
        const rawData = await fs.readFileSync(userDataPath, 'utf-8');
        return JSON.parse(rawData);
    } catch (err) {
        console.error('Error reading JSON file:', err);
    }
}

async function writeFinance(finance) {
    try {
        await fs.writeFileSync(userDataPath, JSON.stringify(finance, null, 2), 'utf-8');
        console.log('Finance data saved successfully.');
    } catch (err) {
        console.error('Error writing JSON file:', err);
    }
}

module.exports.index = async (req, res) => {
    const finance = await readFinance();
    res.render('finances/index', { finance });
};

module.exports.update = async (req, res) => {
    const finance = req.body;

    await writeFinance(finance);
    res.json({ success: true, updated: finance });
};
