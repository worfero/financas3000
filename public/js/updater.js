(function () {
    document.getElementById("income").addEventListener("input", async (event) => {
        const newIncome = event.target.value;
        try{
            const res = await fetch('/update', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ key: 'income', value: newIncome })
            });

            if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

            const data = await res.json();
            console.log('Server response:', data);
        } catch (err) {
            console.error('Fetch failed:', err);
        }
    });
})()