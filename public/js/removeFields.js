async function deleteRequest(type, id){
    let newFinance;
    switch (type) {
        case "income":
            newFinance = await deleteIncomeRequest(id); // from request.js
            return newFinance;
        case "fixed-bill":
            newFinance = await deleteFixedBillRequest(id); // from request.js
            return newFinance;
        case "bill":
            newFinance = await deleteBillRequest(id); // from request.js
            return newFinance;
        default:
            console.log("Error: type not found");
            return [];
    }
}

async function addRemoveEvent(type, element, id){
    element.addEventListener("click", async () => {
        const newFinance = await deleteRequest(type, id);
        
        element.parentElement.remove();

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
    });
}

(function () {
    finance.incomes.array.forEach(function(income, index) {
        const id = "del-income-btn-" + income._id;
        const incomeDeleteBtn = document.getElementById(id);
        addRemoveEvent("income", incomeDeleteBtn, income._id);
    });

    finance.fixedBills.array.forEach(function(bill, index) {
        const id = "del-fixed-bill-btn-" + bill._id;
        const fixedBillDeleteBtn = document.getElementById(id);
        addRemoveEvent("fixed-bill", fixedBillDeleteBtn, bill._id);
    });

    finance.bills.array.forEach(function(bill, index) {
        const id = "del-bill-btn-" + bill._id;
        const billDeleteBtn = document.getElementById(id);
        addRemoveEvent("bill", billDeleteBtn, bill._id);
    });
})()