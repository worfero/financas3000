(function () {
    const incomePlace = document.getElementById('new-incomes');
    const incomeAdd = document.getElementById('add-income-btn');
    const incomeLabel = document.getElementById('new-income-name');

    incomeAdd.addEventListener("click", () => {
        const labelText = incomeLabel.value.trim() || "Ganho"; // default if empty

        const container = document.createElement("div");
        container.className = "input-group mb-3 input-group-sm";

        const span = document.createElement("span");
        span.className = "input-group-text";
        span.textContent = labelText + ":";

        const input = document.createElement("input");
        input.type = "number";
        input.className = 'form-control';
        input.value = 0;

        container.appendChild(span);
        container.appendChild(input);

        incomePlace.appendChild(container);

        incomeLabel.value = "";

        const newIncome = { name: labelText, value: 0 };

        finance.incomes.push(newIncome);

        (async () => {
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
        })();

        //input.addEventListener("input", async (event) => {
        //    // gets new value from the input field
        //    const newValue = parseInt(event.target.value);
        //    // updates total income
        //    finance.totalIncome = finance.totalIncome - input.value + newValue;
        //    // updates respective income field
        //    input.value = newValue;
//
        //    // update balance
        //    finance.balance = finance.totalIncome - finance.totalFixedBills;
//
        //    //if(finance.balance > 0){
        //    //    document.getElementById("balance").classList.toggle("balance-green");
        //    //}
        //    //else if(finance.balance < 0){
        //    //    document.getElementById("balance").classList.toggle("balance-red");
        //    //}
//
        //    // updates total income field in the client
        //    document.getElementById("balance").value = finance.balance;
        //    // updates total income field in the client
        //    document.getElementById("income-total").value = finance.totalIncome;
        //    try{
        //        const res = await fetch('/update', {
        //            method: 'PUT',
        //            headers: {
        //                'Content-Type': 'application/json',
        //            },
        //            body: JSON.stringify(finance)
        //        });
//
        //        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
//
        //        const data = await res.json();
        //        console.log('Server response:', data);
        //    } catch (err) {
        //        console.error('Fetch failed:', err);
        //    }
        //});
    });
})()