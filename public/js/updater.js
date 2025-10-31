async function updateRequest(type, id, newValue){
    let newFinance;
    switch (type) {
            case "income":
                    newFinance = await updateIncomeRequest(id, newValue); // from request.js
                    return newFinance;
            case "fixed-bill":
                    newFinance = await updateFixedBillRequest(id, newValue); // from request.js
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
            document.getElementById(type + "-total").value = newFinance.totalIncome;
            break;
        case "fixed-bill":
            document.getElementById(type + "-total").value = newFinance.totalFixedBills;
            break;
        default:
            console.log("Error: type not found");
            break;
    }
}

(function () {
    // function to add an event listener to every income field and update the array
    finance.incomes.forEach(function(income, index) {
        id = "income-" + income._id;
        document.getElementById(id).addEventListener("input", async (event) => {
            // gets new value from the input field
            const newValue = parseInt(event.target.value);
            await updateEvent("income", income._id, newValue);
        });
    });
    // function to add an event listener to every fixed bill field and update the array
    finance.fixedBills.forEach(function(fixedBill, index) {
        id = "fixed-bill-" + fixedBill._id;
        document.getElementById(id).addEventListener("input", async (event) => {
            // gets new value from the input field
            const newValue = parseInt(event.target.value);
            await updateEvent("fixed-bill", fixedBill._id, newValue);
        });
    });
})()