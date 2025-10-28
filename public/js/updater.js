(function () {
    finance.incomes.forEach(function(income, index) {
        id = "income-" + index;
        document.getElementById(id).addEventListener("input", async (event) => {
            const newValue = parseInt(event.target.value);
            income.value = newValue;
            try{
                const res = await fetch('/update', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(finance)
                });

                if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

                const data = await res.json();
                console.log('Server response:', data);
            } catch (err) {
                console.error('Fetch failed:', err);
            }
        });
    });
    finance.fixedBills.forEach(function(fixedBill, index) {
        id = "fixed-bill-" + index;
        document.getElementById(id).addEventListener("input", async (event) => {
            const newValue = parseInt(event.target.value);
            fixedBill.value = newValue;
            try{
                const res = await fetch('/update', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(finance)
                });

                if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

                const data = await res.json();
                console.log('Server response:', data);
            } catch (err) {
                console.error('Fetch failed:', err);
            }
        });
    });
})()