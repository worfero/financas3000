(function () {
        const incomePlace = document.getElementById('new-incomes');
        const incomeAdd = document.getElementById('add-income-btn');
        const incomeLabel = document.getElementById('new-income-name');

        incomeAdd.addEventListener("click", () => {
                const labelText = incomeLabel.value.trim() || "Ganho"; // default if empty

                const container = document.createElement("div");
                container.className = "input-group mb-3 input-group-sm mx-auto";

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

                const finLength = finance.incomes.push(newIncome);
                const income = finance.incomes[finLength - 1];

                updateDB(finance);

                input.addEventListener("input", async (event) => {
                        console.log("teste")
                        // gets new value from the input field
                        const newValue = parseInt(event.target.value);
                        // updates total income
                        finance.totalIncome = finance.totalIncome - income.value + newValue;
                        // updates respective income field
                        income.value = newValue;

                        // update balance
                        finance.balance = finance.totalIncome - finance.totalFixedBills;

                        // updates total income field in the client
                        document.getElementById("balance").value = finance.balance;
                        // updates total income field in the client
                        document.getElementById("income-total").value = finance.totalFixedBills;
                        updateDB(finance);
                });
        });
})()