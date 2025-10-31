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

function getNewIndex(type) {
        switch(type){
                case "income":
                        return newFinance.incomes.length - 1;
                case "fixed-bill":
                        return newFinance.fixedBills.length - 1;
                default:
                        console.log("Error: type not found");
        }
}

async function pushRequest(type, newItem){
        let newFinance;
        switch (type) {
                case "income":
                        newFinance = await newIncomeRequest(newItem); // from requests.js
                        return newFinance;
                case "fixed-bill":
                        newFinance = await newFixedBillRequest(newItem); // from requests.js
                        return newFinance;
                default:
                        console.log("Error: type not found");
                        return [];
        }
}

function addItem(type) {
        const place = document.getElementById('new-' + type + 's');
        const addBtn = document.getElementById('add-' + type + '-btn');
        const label = document.getElementById('new-' + type + '-name');
        addBtn.addEventListener("click", async () => {
                const labelText = label.value.trim() || "Item";

                const newItem = { name: labelText, value: 0 };

                newFinance = await pushRequest(type, newItem);

                const newIndex = getNewIndex(type);

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

                addRemoveEvent(type, deleteBtn, item._id); // from removeFields.js

                input.addEventListener("input", async (event) => {
                        // gets new value from the input field
                        const newValue = parseInt(event.target.value);
                        await updateEvent(type, item._id, newValue); // from updater.js
                });
        });
}

(function () {
        oldFinance = finance
        addItem("income");
        addItem("fixed-bill");
})()