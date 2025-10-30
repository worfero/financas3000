function addIncome() {
        const incomePlace = document.getElementById('new-incomes');
        const incomeAdd = document.getElementById('add-income-btn');
        const incomeLabel = document.getElementById('new-income-name');

        incomeAdd.addEventListener("click", () => {
                const labelText = incomeLabel.value.trim() || "Ganho"; // default if empty

                const newIncome = { name: labelText, value: 0 };

                const finLength = finance.incomes.push(newIncome);
                const newIndex = finLength - 1
                const income = finance.incomes[newIndex];

                const container = document.createElement("div");
                container.className = "input-group mb-3 input-group-sm mx-auto";

                const span = document.createElement("span");
                span.className = "input-group-text";
                span.textContent = labelText + ":";
                span.id = "income-" + newIndex + "-label";

                const input = document.createElement("input");
                input.type = "number";
                input.className = 'form-control';
                input.value = 0;
                input.id = "income-" + newIndex;
                input.name = "income-" + newIndex;
                input.ariaLabel = labelText;

                const deleteBtn = document.createElement("button");
                deleteBtn.type = "button";
                deleteBtn.id = "del-income-btn-" + newIndex;
                deleteBtn.className = "btn btn-outline-danger fw-bold";
                deleteBtn.textContent = "x";

                addRemoveIncomeEvent(deleteBtn, newIndex);

                container.appendChild(span);
                container.appendChild(input);
                container.appendChild(deleteBtn);

                incomePlace.appendChild(container);

                incomeLabel.value = "";

                updateDB(finance);
                input.addEventListener("input", async (event) => {
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
                        document.getElementById("income-total").value = finance.totalIncome;

                        updateDB(finance);
                });
        });
}

function addFixedBill() {
        const fixedBillPlace = document.getElementById('new-fixed-bills');
        const fixedBillAdd = document.getElementById('add-fixed-bill-btn');
        const fixedBillLabel = document.getElementById('new-fixed-bill-name');

        fixedBillAdd.addEventListener("click", () => {
                const labelText = fixedBillLabel.value.trim() || "Ganho"; // default if empty

                const newFixedBill = { name: labelText, value: 0 };

                const finLength = finance.fixedBills.push(newFixedBill);
                const newIndex = finLength - 1
                const fixedBill = finance.fixedBills[newIndex];

                const container = document.createElement("div");
                container.className = "input-group mb-3 input-group-sm mx-auto";

                const span = document.createElement("span");
                span.className = "input-group-text";
                span.textContent = labelText + ":";
                span.id = "fixed-bill-" + newIndex + "-label";

                const input = document.createElement("input");
                input.type = "number";
                input.className = 'form-control';
                input.value = 0;
                input.id = "fixed-bill-" + newIndex;
                input.name = "fixed-bill-" + newIndex;
                input.ariaLabel = labelText;

                const deleteBtn = document.createElement("button");
                deleteBtn.type = "button";
                deleteBtn.id = "del-fixed-bill-btn-" + newIndex;
                deleteBtn.className = "btn btn-outline-danger fw-bold";
                deleteBtn.textContent = "x";

                addRemoveFixedBillEvent(deleteBtn, newIndex);

                container.appendChild(span);
                container.appendChild(input);
                container.appendChild(deleteBtn);

                fixedBillPlace.appendChild(container);

                fixedBillLabel.value = "";

                updateDB(finance);
                input.addEventListener("input", async (event) => {
                        // gets new value from the input field
                        const newValue = parseInt(event.target.value);
                        // updates total income
                        finance.totalFixedBills = finance.totalFixedBills - fixedBill.value + newValue;
                        // updates respective income field
                        fixedBill.value = newValue;

                        // update balance
                        finance.balance = finance.totalIncome - finance.totalFixedBills;

                        // updates total income field in the client
                        document.getElementById("balance").value = finance.balance;
                        // updates total income field in the client
                        document.getElementById("fixed-bills-total").value = finance.totalFixedBills;

                        updateDB(finance);
                });
        });
}

(function () {
        addIncome();
        addFixedBill();
})()