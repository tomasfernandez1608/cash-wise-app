import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Chart from 'chart.js/auto';
import { obtenerTipoDeGasto } from "../services/obtenerTipoDeGasto";
import { obtenerCliente } from '../services/obtenerCliente';
import Loading from './Loading/Loading';

const Piechart = ({ operaciones, idUsuario, ingresos }) => {
    const chartRef = useRef(null);
    const chartInstance = useRef(null);
    const [tipoDeGasto, setTipoDeGasto] = useState([]);
    const [cliente, setCliente] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function cargarTipoDeGasto() {
            try {
                const tipoDeGasto = await obtenerTipoDeGasto();
                setTipoDeGasto(tipoDeGasto);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }

        cargarTipoDeGasto();
    }, []);

    useEffect(() => {
        async function cargarCliente() {
            try {
                const cliente = await obtenerCliente(idUsuario);
                setCliente(cliente);
            } catch (error) {
                console.log(error);
            }
        }
        cargarCliente();
    }, [idUsuario]);

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
    const gastoActual = amount.reduce((acumulador, valorActual) => acumulador + valorActual, 0);

    const categories = operacionesFinal.map((item) => item.tipo_gasto_id);
    const nombresDeCategorias = categories.map((categoryId) => {
        const tipo = tipoDeGasto.find((tipo) => tipo.id_gasto === categoryId);
        return tipo ? [tipo.descripcion, tipo.color] : 'Cargando...';
    });

    const colores = nombresDeCategorias.map(category => category[1])
    const mergedArray = nombresDeCategorias.map((category, index) => `${category[0]}: $${amount[index]}`);

    useEffect(() => {
        if (!loading) {
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
                        backgroundColor: colores,
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
        }
    }, [loading, amount, mergedArray, colores])

    return (
        <div style={{ width: '500px' }}>
            {loading ? (
                <Loading />
            ) : (
                <>
                    <canvas ref={chartRef} style={{ width: '350px', height: '350px' }}></canvas>
                    <p>Sueldo mensual: <strong>${parseInt(cliente.sueldomensual) + ingresos}</strong></p>
                    <p>Dinero restante: <strong>${(parseInt(cliente.sueldomensual) + ingresos) - gastoActual}</strong></p>
                </>
            )}
        </div>
    )
}

Piechart.propTypes = {
    operaciones: PropTypes.array.isRequired,
    idUsuario: PropTypes.number.isRequired,
    ingresos: PropTypes.number.isRequired
};

export default Piechart