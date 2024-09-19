function calculateAmortization() {
    let loanAmount = parseFloat(document.getElementById('loanAmount').value);
    let annualInterestRate = parseFloat(document.getElementById('interestRate').value) / 100;
    let loanTermYears = parseInt(document.getElementById('loanTerm').value);
    
    let numberOfPayments = loanTermYears * 12;
    let monthlyInterestRate = annualInterestRate / 12;

    let monthlyPayment = (loanAmount * monthlyInterestRate) / (1 - Math.pow((1 + monthlyInterestRate), -numberOfPayments));

    let schedule = [];
    let balance = loanAmount;
    let totalPrincipal = 0;
    let totalInterest = 0;

    for (let i = 1; i <= numberOfPayments; i++) {
        let interestPayment = balance * monthlyInterestRate;
        let principalPayment = monthlyPayment - interestPayment;
        balance -= principalPayment;
        
        schedule.push({
            paymentNumber: i,
            principal: principalPayment,
            interest: interestPayment,
            totalPayment: monthlyPayment,
            remainingBalance: balance
        });

        totalPrincipal += principalPayment;
        totalInterest += interestPayment;
    }

    displaySchedule(schedule);
    displayChart(schedule);
}

function displaySchedule(schedule) {
    const tableBody = document.querySelector('#amortizationSchedule tbody');
    tableBody.innerHTML = '';
    
    schedule.forEach(payment => {
        let row = `<tr>
            <td>${payment.paymentNumber}</td>
            <td>${payment.principal.toFixed(2)}</td>
            <td>${payment.interest.toFixed(2)}</td>
            <td>${payment.totalPayment.toFixed(2)}</td>
            <td>${payment.remainingBalance.toFixed(2)}</td>
        </tr>`;
        tableBody.innerHTML += row;
    });
}
