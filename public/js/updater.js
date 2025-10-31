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

(function () {
    // function to add an event listener to every income field and update the array
    finance.incomes.forEach(function(income, index) {
        id = "income-" + income._id;
        document.getElementById(id).addEventListener("input", async (event) => {
            // gets new value from the input field
            const newValue = parseInt(event.target.value);
            // updates total income
            finance.totalIncome = finance.totalIncome - income.value + newValue;
            // updates respective income field
            income.value = newValue;

            // update balance
            finance.balance = finance.totalIncome - finance.totalFixedBills;

            updateDB(finance).then(() => {
                // updates total income field in the client
                document.getElementById("balance").value = finance.balance;
                // updates total income field in the client
                document.getElementById("income-total").value = finance.totalIncome;
            }
            );
        });
    });
    // function to add an event listener to every fixed bill field and update the array
    finance.fixedBills.forEach(function(fixedBill, index) {
        id = "fixed-bill-" + fixedBill._id;
        document.getElementById(id).addEventListener("input", async (event) => {
            // gets new value from the input field
            const newValue = parseInt(event.target.value);
            // updates total income
            finance.totalFixedBills = finance.totalFixedBills - fixedBill.value + newValue;
            // updates respective income field
            fixedBill.value = newValue;

            // update balance
            finance.balance = finance.totalIncome - finance.totalFixedBills;

            updateDB(finance).then(() => {
                // updates total income field in the client
                document.getElementById("balance").value = finance.balance;
                // updates total income field in the client
                document.getElementById("fixed-bills-total").value = finance.totalFixedBills;
            });
        });
    });
})()