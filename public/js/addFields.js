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

function getListType(type, financeObj) {
        let _itemList;
        switch (type) {
                case "income":
                        _itemList = financeObj.incomes;
                        break;
                case "fixed-bill":
                        _itemList = financeObj.fixedBills;
                        break;
                default:
                        console.log("Error: list not found");
                        _itemList = [];
                        break;
        }
        return _itemList;
}

function updateTotal(type, item, newValue) {
        switch (type) {
                case "income":
                        finance.totalIncome = finance.totalIncome - item.value + newValue
                        total = finance.totalIncome;
                        break;
                case "fixed-bill":
                        finance.totalFixedBills = finance.totalFixedBills - item.value + newValue
                        total = finance.totalFixedBills;
                        break;
                default:
                        console.log("Error: type not found");
                        total = 0;
                        break;
        }
        return total;
}

function addItem(type) {
        const place = document.getElementById('new-' + type + 's');
        const addBtn = document.getElementById('add-' + type + '-btn');
        const label = document.getElementById('new-' + type + '-name');
        addBtn.addEventListener("click", async () => {
                const labelText = label.value.trim() || "Item";

                const newItem = { name: labelText, value: 0 };

                const oldItemList = getListType(type, oldFinance);

                const finLength = oldItemList.push(newItem);
                const newIndex = finLength - 1

                const newFinance = await newIncome(newItem);
                console.log("Updated finance: ");
                console.log(newFinance);

                const newItemList = getListType(type, newFinance);

                const item = newItemList[newIndex];

                const container = document.createElement("div");
                container.className = "input-group mb-3 input-group-sm mx-auto";

                const span = document.createElement("span");
                span.className = "input-group-text";
                span.textContent = labelText + ":";
                span.id = type + "-" + item._id + "-label";

                const input = document.createElement("input");
                input.type = "number";
                input.className = 'form-control';
                input.value = 0;
                input.id = type + "-" + item._id;
                input.name = type + "-" + item._id;
                input.ariaLabel = labelText;

                const deleteBtn = document.createElement("button");
                deleteBtn.type = "button";
                deleteBtn.id = "del-" + type + "-btn-" + item._id;
                deleteBtn.className = "btn btn-outline-danger fw-bold";
                deleteBtn.textContent = "x";


                container.appendChild(span);
                container.appendChild(input);
                container.appendChild(deleteBtn);

                place.appendChild(container);

                label.value = "";

                addRemoveIncomeEvent(deleteBtn, item._id);

                input.addEventListener("input", async (event) => {
                        // gets new value from the input field
                        const newValue = parseInt(event.target.value);
                        // updates total income and returns its value
                        const total = updateTotal(type, item, newValue);
                        // updates respective income field
                        item.value = newValue;

                        // update balance
                        newFinance.balance = newFinance.totalIncome - newFinance.totalFixedBills;

                        // updates total income field in the client
                        document.getElementById("balance").value = newFinance.balance;
                        // updates total income field in the client
                        document.getElementById(type + "-total").value = total;

                        updateDB(newFinance);
                });
        });
}

(function () {
        oldFinance = finance
        addItem("income");
        addFixedBill();
})()