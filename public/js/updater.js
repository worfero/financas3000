async function updateDB(obj) {
    try{
        const res = await fetch('/update', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj)
        });

        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

        const data = await res.json();
        console.log('Server response:', data);
    } catch (err) {
        console.error('Fetch failed:', err);
    }
}

//function updateIncome(newValue) {
//    // updates total income
//    finance.totalIncome = finance.totalIncome - type.value + newValue;
//    // updates respective income field
//    type.value = newValue;
//
//    // update balance
//    finance.balance = finance.totalIncome - finance.totalFixedBills;
//
//    //if(finance.balance > 0){
//    //    document.getElementById("balance").classList.toggle("balance-green");
//    //}
//    //else if(finance.balance < 0){
//    //    document.getElementById("balance").classList.toggle("balance-red");
//    //}
//
//    // updates total income field in the client
//    document.getElementById("balance").value = finance.balance;
//    
//    // updates total income field in the client
//    document.getElementById("income-total").value = finance.totalIncome;
//    updateJSON(finance);
//}
//
//function addEventToField(id, type) {
//    document.getElementById(id).addEventListener("input", async (event) => {
//        // gets new value from the input field
//        const newValue = parseInt(event.target.value);
//        switch(type) {
//            case "income":
//                updateIncome(newValue);
//                break;
//        }
//        // updates total income
//        total = total - type.value + newValue;
//        // updates respective income field
//        type.value = newValue;
//
//        // update balance
//        finance.balance = finance.totalIncome - finance.totalFixedBills;
//
//        //if(finance.balance > 0){
//        //    document.getElementById("balance").classList.toggle("balance-green");
//        //}
//        //else if(finance.balance < 0){
//        //    document.getElementById("balance").classList.toggle("balance-red");
//        //}
//
//        // updates total income field in the client
//        document.getElementById("balance").value = finance.balance;
//        
//        // updates total income field in the client
//        document.getElementById("income-total").value = finance.totalIncome;
//        updateJSON(finance);
//    });
//}

(function () {
    // function to add an event listener to every income field and update the array
    finance.incomes.forEach(function(income, index) {
        id = "income-" + index;
        document.getElementById(id).addEventListener("input", async (event) => {
            // gets new value from the input field
            const newValue = parseInt(event.target.value);
            // updates total income
            finance.totalIncome = finance.totalIncome - income.value + newValue;
            // updates respective income field
            income.value = newValue;

            // update balance
            finance.balance = finance.totalIncome - finance.totalFixedBills;

            // updates total income field in the client
            document.getElementById("balance").value = finance.balance;
            // updates total income field in the client
            document.getElementById("income-total").value = finance.totalFixedBills;
            updateDB(finance);
        });
    });
    // function to add an event listener to every fixed bill field and update the array
    finance.fixedBills.forEach(function(fixedBill, index) {
        id = "fixed-bill-" + index;
        document.getElementById(id).addEventListener("input", async (event) => {
            // gets new value from the input field
            const newValue = parseInt(event.target.value);
            // updates total income
            finance.totalFixedBills = finance.totalFixedBills - fixedBill.value + newValue;
            // updates respective income field
            fixedBill.value = newValue;

            // update balance
            finance.balance = finance.totalIncome - finance.totalFixedBills;

            // updates total income field in the client
            document.getElementById("balance").value = finance.balance;
            // updates total income field in the client
            document.getElementById("fixed-bills-total").value = finance.totalFixedBills;
            updateDB(finance);
        });
    });
})()