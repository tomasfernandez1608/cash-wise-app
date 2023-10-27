import { useState, useEffect } from "react";
import { Login } from "../components/Login";
import Nav from "../components/Nav";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import Piechart from "../components/Piechart";
import CoinRanking from "../components/CoinRanking";
import { obtenerOperaciones } from "../services/obtenerOperaciones";

const Home = () => {
    const [operaciones, setOperaciones] = useState([]);

    useEffect(() => {
        async function cargarOperaciones() {
            try {
                const operaciones = await obtenerOperaciones();
                setOperaciones(operaciones);
            } catch (error) {
                console.log(error);
            }
        }

        cargarOperaciones();
    }, []);

    return (
        <div className="sb-nav-fixed">
            <NavBar />
            <div id="layoutSidenav">
                <Nav />
                <div id="layoutSidenav_content">
                    <main>
                        <div className="container-fluid px-4">
                            <h1 className="mt-4">Cashwise App</h1>
                            <ol className="breadcrumb mb-4">
                                <li className="breadcrumb-item active fs-5">Cashwise es una aplicación de gestión de gastos y finanzas personales diseñada para simplificar y fortalecer tu control financiero. Con Cashwise, podes registrar y categorizar fácilmente tus ingresos y gastos, establecer presupuestos personalizados y hacer un seguimiento de tus metas de ahorro. La interfaz intuitiva y las poderosas herramientas de visualización te permiten entender tus patrones de gasto y tomar decisiones financieras más inteligentes. Cashwise es tu socio confiable para alcanzar la estabilidad financiera y asegurarte de que tu dinero trabaje para vos.</li>
                            </ol>
                            <div className="row mb-3">
                                <div className="col-xl-4">
                                    <div className="text-center">
                                        <Login />
                                    </div>
                                </div>

                                <div className="col-xl-8">
                                    <div className="card">
                                        <div className="card-header">
                                            <h5 className="card-title">Balance de gastos</h5>
                                        </div>
                                        <div className="card-body">
                                            <Piechart operaciones={operaciones} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <CoinRanking />
                    </main>
                    <Footer />
                </div>
            </div>
        </div>
    )
}

export default Home;