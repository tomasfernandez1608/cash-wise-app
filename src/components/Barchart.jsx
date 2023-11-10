import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Chart from 'chart.js/auto';
import Loading from './Loading/Loading';

const Barchart = () => {
    const chartRef = useRef(null);
    const chartInstance = useRef(null);
    const [operaciones, setOperaciones] = useState([]);
    const [loading, setLoading] = useState(false);

    const idusuario = JSON.parse(localStorage.getItem("user")).idusuario;

    const cargarOperaciones = async () => {
        try {
            const response = await fetch(
                `http://localhost/serverWiseApp/obtenerOperaciones.php?id=${idusuario}`
            );
            if (response.ok) {
                const data = await response.json();
                setOperaciones(data);
            } else {
                console.error("Error al cargar operaciones");
            }
        } catch (error) {
            console.error("Error al cargar operaciones:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        cargarOperaciones();
    }, [idusuario]);

    const obtenerMontosTotalesPorMes = () => {
        const montosPorMes = {};

        operaciones.forEach((operacion) => {
            const mes = new Date(operacion.fechaoperacion).getMonth();

            if (!montosPorMes[mes]) {
                montosPorMes[mes] = 0;
            }

            montosPorMes[mes] += Number(operacion.monto);
        });

        const montosTotalesPorMes = Array.from({ length: 12 }, (_, mes) =>
            montosPorMes[mes] !== undefined ? montosPorMes[mes] : 0
        );

        return montosTotalesPorMes;
    };

    useEffect(() => {
        if (!loading) {
            if (chartInstance.current) {
                chartInstance.current.destroy()
            }
            const myChartRef = chartRef.current.getContext('2d')

            chartInstance.current = new Chart(myChartRef, {
                type: 'bar',
                data: {
                    labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
                    datasets: [{
                        label: 'Gastos por mes',
                        data: obtenerMontosTotalesPorMes(),
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.5)',
                            'rgba(255, 159, 64, 0.5)',
                            'rgba(255, 205, 86, 0.5)',
                            'rgba(75, 192, 192, 0.5)',
                            'rgba(54, 162, 235, 0.5)',
                            'rgba(153, 102, 255, 0.5)',
                            'rgba(201, 203, 207, 0.5)',
                            'rgba(255, 0, 0, 0.5)',
                            'rgba(255, 165, 0, 0.5)',
                            'rgba(255, 255, 0, 0.5)',
                            'rgba(0, 128, 0, 0.5)',
                            'rgba(0, 0, 255, 0.5)',
                            'rgba(128, 0, 128, 0.5)',
                            'rgba(192, 192, 192, 0.5)'
                        ],
                        borderColor: [
                            'rgb(255, 99, 132)',
                            'rgb(255, 159, 64)',
                            'rgb(255, 205, 86)',
                            'rgb(75, 192, 192)',
                            'rgb(54, 162, 235)',
                            'rgb(153, 102, 255)',
                            'rgb(201, 203, 207)',
                            'rgb(255, 0, 0)',
                            'rgb(255, 165, 0)',
                            'rgb(255, 255, 0)',
                            'rgb(0, 128, 0)',
                            'rgb(0, 0, 255)',
                            'rgb(128, 0, 128)',
                            'rgb(192, 192, 192)'
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    plugins: {
                        legend: {
                            display: true,
                            onClick: () => { }
                        },
                    },
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            })

            return () => {
                if (chartInstance.current) {
                    chartInstance.current.destroy();
                }
            }
        }
    }, [obtenerMontosTotalesPorMes, loading])

    return (
        <div style={{ height: '600px' }}>
            {loading ? (
                <Loading />
            ) : (
                <canvas ref={chartRef} style={{ width: '350px', height: '350px' }}></canvas>
            )}
        </div>
    )
}

Barchart.propTypes = {
    operaciones: PropTypes.array.isRequired,
    idUsuario: PropTypes.number.isRequired
};

export default Barchart