function displayChart(schedule) {
    let principalData = schedule.map(payment => payment.principal);
    let interestData = schedule.map(payment => payment.interest);
    let labels = schedule.map(payment => payment.paymentNumber);

    let ctx = document.getElementById('amortizationChart').getContext('2d');
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Principal',
                    data: principalData,
                    backgroundColor: 'rgba(75, 192, 192, 0.6)',
                },
                {
                    label: 'Interest',
                    data: interestData,
                    backgroundColor: 'rgba(255, 99, 132, 0.6)',
                }
            ]
        },
        options: {
            scales: {
                x: {
                    stacked: true
                },
                y: {
                    stacked: true,
                    beginAtZero: true
                }
            }
        }
    });
}
