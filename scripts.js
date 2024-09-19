function calculateAmortization() {
  // Get user input
  const principal = parseFloat(document.getElementById("principal").value);
  const annualRate = parseFloat(document.getElementById("rate").value);
  const years = parseFloat(document.getElementById("years").value);
  
  // Calculations
  const months = years * 12;
  const monthlyRate = (annualRate / 100) / 12;
  const monthlyPayment = (principal * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -months));
  
  let balance = principal;
  let totalInterest = 0;
  let amortizationSchedule = [];
  let principalPayments = [];
  let interestPayments = [];
  
  for (let month = 1; month <= months; month++) {
    const interestPayment = balance * monthlyRate;
    const principalPayment = monthlyPayment - interestPayment;
    
    balance -= principalPayment;
    totalInterest += interestPayment;
    
    amortizationSchedule.push({
      month: month,
      principalPayment: principalPayment,
      interestPayment: interestPayment,
      balance: balance
    });
    
    principalPayments.push(principalPayment);
    interestPayments.push(interestPayment);
  }
  
  displaySchedule(amortizationSchedule);
  displayChart(principalPayments, interestPayments);
}

function displaySchedule(amortizationSchedule) {
  let output = "<table><tr><th>Month</th><th>Principal</th><th>Interest</th><th>Balance</th></tr>";
  amortizationSchedule.forEach(payment => {
    output += `<tr>
                 <td>${payment.month}</td>
                 <td>${payment.principalPayment.toFixed(2)}</td>
                 <td>${payment.interestPayment.toFixed(2)}</td>
                 <td>${payment.balance.toFixed(2)}</td>
               </tr>`;
  });
  output += "</table>";
  
  document.getElementById("scheduleOutput").innerHTML = output;
}

function displayChart(principalPayments, interestPayments) {
  const ctx = document.getElementById('barChart').getContext('2d');
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: Array.from({length: principalPayments.length}, (_, i) => i + 1),
      datasets: [{
        label: 'Principal Payment',
        data: principalPayments,
        backgroundColor: 'rgba(54, 162, 235, 0.7)',
        borderWidth: 1
      },
      {
        label: 'Interest Payment',
        data: interestPayments,
        backgroundColor: 'rgba(255, 99, 132, 0.7)',
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      scales: {
        x: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Month'
          }
        },
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Amount ($)'
          }
        }
      }
    }
  });
}
