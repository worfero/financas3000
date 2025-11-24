async function updateRequest(type, id, newValue){
    let newFinance;
    switch (type) {
        case "income":
            newFinance = await updateIncomeRequest(id, newValue); // from request.js
            return newFinance;
        case "fixed-bill":
            newFinance = await updateFixedBillRequest(id, newValue); // from request.js
            return newFinance;
        case "bill":
            newFinance = await updateBillRequest(id, newValue); // from request.js
            return newFinance;
        default:
            console.log("Error: type not found");
            return [];
    }
}

async function updateEvent(type, id, newValue) {
    const newFinance = await updateRequest(type, id, newValue);

    // updates total income field in the client
    document.getElementById("balance").value = newFinance.balance;
    
    switch(type){
        case "income":
            document.getElementById(type + "-total").value = newFinance.incomes.total;
            break;
        case "fixed-bill":
            document.getElementById(type + "-total").value = newFinance.fixedBills.total;
            break;
        case "bill":
            document.getElementById(type + "-total").value = newFinance.bills.total;
            break;
        default:
            console.log("Error: type not found");
            break;
    }
}

(function () {
    // function to add an event listener to every income field and update the array
    finance.incomes.array.forEach(function(income, index) {
        id = "income-" + income._id;
        document.getElementById(id).addEventListener("input", async (event) => {
            // gets new value from the input field
            const newValue = parseInt(event.target.value);
            await updateEvent("income", income._id, newValue);
        });
    });

    // function to add an event listener to every fixed bill field and update the array
    finance.fixedBills.array.forEach(function(fixedBill, index) {
        id = "fixed-bill-" + fixedBill._id;
        document.getElementById(id).addEventListener("input", async (event) => {
            // gets new value from the input field
            const newValue = parseInt(event.target.value);
            await updateEvent("fixed-bill", fixedBill._id, newValue);
        });
    });

    // function to add an event listener to every bill field and update the array
    finance.bills.array.forEach(function(bill, index) {
        id = "bill-" + bill._id;
        document.getElementById(id).addEventListener("input", async (event) => {
            // gets new value from the input field
            const newValue = parseInt(event.target.value);
            await updateEvent("bill", bill._id, newValue);
        });
    });
})()