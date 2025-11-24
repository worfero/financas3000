async function newIncomeRequest(income) {
    try{
        const res = await fetch('/api/incomes/new', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(income)
        });

        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

        const data = await res.json();
        console.log('Server response:', data);
        return data.updated;
    } catch (err) {
        console.error('Fetch failed:', err);
    }
}

async function newFixedBillRequest(bill) {
    try{
        const res = await fetch('/api/fixed-bills/new', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(bill)
        });

        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

        const data = await res.json();
        console.log('Server response:', data);
        return data.updated;
    } catch (err) {
        console.error('Fetch failed:', err);
    }
}

async function newBillRequest(bill) {
    try{
        const res = await fetch('/api/bills/new', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(bill)
        });

        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

        const data = await res.json();
        console.log('Server response:', data);
        return data.updated;
    } catch (err) {
        console.error('Fetch failed:', err);
    }
}

async function deleteIncomeRequest(incomeId) {
    try{
        const res = await fetch(`/api/incomes/${incomeId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

        const data = await res.json();
        console.log('Server response:', data);
        return data.updated;
    } catch (err) {
        console.error('Fetch failed:', err);
    }
}

async function deleteFixedBillRequest(billId) {
    try{
        const res = await fetch(`/api/fixed-bills/${billId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

        const data = await res.json();
        console.log('Server response:', data);
        return data.updated;
    } catch (err) {
        console.error('Fetch failed:', err);
    }
}

async function deleteBillRequest(billId) {
    try{
        const res = await fetch(`/api/bills/${billId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

        const data = await res.json();
        console.log('Server response:', data);
        return data.updated;
    } catch (err) {
        console.error('Fetch failed:', err);
    }
}

async function updateIncomeRequest(incomeId, newValue) {
    try{
        const res = await fetch(`/api/incomes/${incomeId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ incomeId, newValue })
        });

        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

        const data = await res.json();
        console.log('Server response:', data);
        return data.updated;
    } catch (err) {
        console.error('Fetch failed:', err);
    }
}

async function updateFixedBillRequest(billId, newValue) {
    try{
        const res = await fetch(`/api/fixed-bills/${billId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ billId, newValue })
        });

        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

        const data = await res.json();
        console.log('Server response:', data);
        return data.updated;
    } catch (err) {
        console.error('Fetch failed:', err);
    }
}

async function updateBillRequest(billId, newValue) {
    try{
        const res = await fetch(`/api/bills/${billId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ billId, newValue })
        });

        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

        const data = await res.json();
        console.log('Server response:', data);
        return data.updated;
    } catch (err) {
        console.error('Fetch failed:', err);
    }
}