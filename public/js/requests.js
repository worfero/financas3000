async function newIncome(income) {
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

async function deleteIncome(incomeId) {
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

async function updateDB(obj) {
    try{
        const res = await fetch('/update', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj)
        });

        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

        const data = await res.json();
        console.log('Server response:', data);
        return data.updated;
    } catch (err) {
        console.error('Fetch failed:', err);
    }
}