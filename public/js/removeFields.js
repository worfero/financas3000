(function () {
    finance.incomes.forEach(function(income, index) {
        id = "del-income-btn-" + index;

        const incomeDeleteBtn = document.getElementById(id);
        incomeDeleteBtn.addEventListener("click", () => {
            incomeDeleteBtn.parentElement.remove();
            finance.incomes = finance.incomes.filter((_, index_) => index_ !== index);
            console.log(finance);
            updateJSON(finance);
        });
    });
})()