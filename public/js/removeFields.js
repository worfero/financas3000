(function () {
    finance.incomes.forEach(function(income, index) {
        id = "del-income-btn-" + index;

        const incomeDeleteBtn = document.getElementById(id);
        incomeDeleteBtn.addEventListener("click", () => {
            incomeDeleteBtn.parentElement.remove();
            finance.incomes = finance.incomes.filter((_, index_) => index_ !== index);
            console.log(finance);
            (async () => {
                try{
                    const res = await fetch('/update', {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(finance)
                });
                if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
                const data = await res.json();
                console.log('Server response:', data);
                } catch (err) {
                    console.error('Fetch failed:', err);
                }
            })();
        });
    });
})()