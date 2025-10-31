function addRemoveIncomeEvent(element, financeObj, incomeId){
    element.addEventListener("click", async () => {
        financeObj.totalIncome = financeObj.totalIncome - financeObj.incomes.find(income => income._id === incomeId).value;
        // updates total income field in the client
        document.getElementById("income-total").value = financeObj.totalIncome;
        element.parentElement.remove();
        financeObj.incomes = financeObj.incomes.filter(income => income._id !== incomeId);
        await updateDB(financeObj);
        console.log("Update finance (delete): ")
        console.log(financeObj);
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
        addRemoveIncomeEvent(incomeDeleteBtn, finance, income._id);
    });

    finance.fixedBills.forEach(function(bill, index) {
        const id = "del-fixed-bill-btn-" + bill._id;
        const fixedBillDeleteBtn = document.getElementById(id);
        addRemoveFixedBillEvent(fixedBillDeleteBtn, finance, index);
    });
})()