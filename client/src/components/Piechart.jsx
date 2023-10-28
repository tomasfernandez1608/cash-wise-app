import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const Piechart = () => {
    const categories = ['Comidas y bebidas', 'Supermercado', 'Transporte'];
    const amount = [300, 50, 100];
    const mergedArray = categories.map((category, index) => `${category}: $${amount[index]}`);

    const chartRef = useRef(null);
    const chartInstance = useRef(null);

    useEffect(() => {
        if (chartInstance.current) {
            chartInstance.current.destroy()
        }
        const myChartRef = chartRef.current.getContext('2d')

        chartInstance.current = new Chart(myChartRef, {
            type: 'doughnut',
            data: {
                labels: mergedArray,
                datasets: [{
                    label: false,
                    data: amount,
                    backgroundColor: [
                        'rgb(255, 205, 86)',
                        'rgb(54, 162, 235)',
                        'rgb(255, 99, 132)',
                        'rgb(75, 192, 192)',
                        'rgb(153, 102, 255)',
                        'rgb(201, 203, 207)',
                        'rgb(255, 159, 64)',
                        'rgb(121, 85, 70)',
                    ],
                    hoverOffset: 10
                }]
            },
            options: {
                plugins: {
                    legend: {
                        display: true,
                        position: 'right',
                        onClick: () => { }
                    },
                }
            }
        })
        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }
        }
    }, [amount, mergedArray])

    return (
        <div style={{ width: '600px' }}>
            <canvas ref={chartRef} style={{ width: '300px', height: '300px' }}></canvas>
        </div>
    )
}

export default Piechart