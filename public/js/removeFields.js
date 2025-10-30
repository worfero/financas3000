function addRemoveIncomeEvent(element, index){
    element.addEventListener("click", () => {
        finance.totalIncome = finance.totalIncome - finance.incomes[index].value;
        // updates total income field in the client
        document.getElementById("income-total").value = finance.totalIncome;
        element.parentElement.remove();
        finance.incomes = finance.incomes.filter((_, index_) => index_ !== index);
        console.log(finance);
        updateDB(finance);
    });
}

(function () {
    finance.incomes.forEach(function(income, index) {
        id = "del-income-btn-" + index;
        const incomeDeleteBtn = document.getElementById(id);
        addRemoveIncomeEvent(incomeDeleteBtn, index);
    });
})()