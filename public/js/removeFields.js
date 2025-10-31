function addRemoveEvent(type, element, id){
    element.addEventListener("click", async () => {
        const newFinance = await deleteIncome(id) // from requests.js
        // updates total income field in the client
        document.getElementById(type + "-total").value = newFinance.totalIncome;
        element.parentElement.remove();
    });
}

function addRemoveFixedBillEvent(element, index){
    element.addEventListener("click", () => {
        finance.totalFixedBills = finance.totalFixedBills - finance.fixedBills[index].value;
        // updates total income field in the client
        document.getElementById("fixed-bills-total").value = finance.totalFixedBills;
        element.parentElement.remove();
        finance.fixedBills = finance.fixedBills.filter((_, index_) => index_ !== index);
        updateDB(finance);
    });
}

(function () {
    finance.incomes.forEach(function(income, index) {
        const id = "del-income-btn-" + income._id;
        const incomeDeleteBtn = document.getElementById(id);
        addRemoveEvent("income", incomeDeleteBtn, income._id);
    });

    finance.fixedBills.forEach(function(bill, index) {
        const id = "del-fixed-bill-btn-" + bill._id;
        const fixedBillDeleteBtn = document.getElementById(id);
        addRemoveFixedBillEvent(fixedBillDeleteBtn, finance, index);
    });
})()