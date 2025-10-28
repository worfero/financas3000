(function () {
    // function to add an event listener to every income field and update the array
    finance.incomes.forEach(function(income, index) {
        id = "income-" + index;
        document.getElementById(id).addEventListener("input", async (event) => {
            // gets new value from the input field
            const newValue = parseInt(event.target.value);
            // updates total income
            finance.totalIncome = finance.totalIncome - income.value + newValue;
            // updates respective income field
            income.value = parseInt(event.target.value);
            // updates total income field in the client
            document.getElementById("income-total").value = finance.totalIncome;
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
    // function to add an event listener to every fixed bill field and update the array
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