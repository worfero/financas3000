function addRemoveIncomeEvent(element, index){
    element.addEventListener("click", () => {
        finance.totalIncome = finance.totalIncome - finance.incomes[index].value;
        // updates total income field in the client
        document.getElementById("income-total").value = finance.totalIncome;
        element.parentElement.remove();
        finance.incomes = finance.incomes.filter((_, index_) => index_ !== index);
        updateDB(finance);
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
        id = "del-income-btn-" + index;
        const incomeDeleteBtn = document.getElementById(id);
        addRemoveIncomeEvent(incomeDeleteBtn, index);
    });

    finance.fixedBills.forEach(function(bill, index) {
        id = "del-fixed-bill-btn-" + index;
        const fixedBillDeleteBtn = document.getElementById(id);
        addRemoveFixedBillEvent(fixedBillDeleteBtn, index);
    });
})()