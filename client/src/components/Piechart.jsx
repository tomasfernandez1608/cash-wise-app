import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Chart from 'chart.js/auto';
import { obtenerTipoDeGasto } from "../services/obtenerTipoDeGasto";

const Piechart = ({ operaciones }) => {
    const chartRef = useRef(null);
    const chartInstance = useRef(null);
    const [tipoDeGasto, setTipoDeGasto] = useState([]);

    // console.log(tipoDeGasto);
    useEffect(() => {
        async function cargarTipoDeGasto() {
            try {
                const tipoDeGasto = await obtenerTipoDeGasto();
                setTipoDeGasto(tipoDeGasto);
            } catch (error) {
                console.log(error);
            }
        }

        cargarTipoDeGasto();
    }, []);

    // Crear un objeto para agrupar los montos por tipo_gasto_id
    const montosAgrupados = operaciones.reduce((result, data) => {
        const tipoGastoId = data.tipo_gasto_id;
        if (!result[tipoGastoId]) {
            result[tipoGastoId] = {
                tipo_gasto_id: tipoGastoId,
                total_monto: parseFloat(data.monto),
            };
        } else {
            result[tipoGastoId].total_monto += parseFloat(data.monto);
        }
        return result;
    }, {});

    const operacionesFinal = Object.values(montosAgrupados);

    const amount = operacionesFinal.map((item) => parseFloat(item.total_monto));

    const categories = operacionesFinal.map((item) => item.tipo_gasto_id);
    const nombresDeCategorias = categories.map((categoryId) => {
        const tipo = tipoDeGasto.find((tipo) => tipo.id_gasto === categoryId);
        return tipo ? tipo.descripcion : 'Tipo no encontrado';
    });

    const mergedArray = nombresDeCategorias.map((category, index) => `${category}: $${amount[index]}`);

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
        <div style={{ width: '400px' }}>
            <canvas ref={chartRef} style={{ width: '300px', height: '300px' }}></canvas>
        </div>
    )
}

Piechart.propTypes = {
    operaciones: PropTypes.array.isRequired,
};

export default Piechart