import { useState, useEffect } from "react";
import Nav from "../components/Nav";
import NavBar from "../components/NavBar";
import { Login } from "../components/Login";
import Footer from "../components/Footer";
import Piechart from "../components/Piechart";

const Home = () => {
    const [usuarios, setUsuarios] = useState([]);

    async function obtenerUsuarios() {
        try {
            const API_KEY = 'http://localhost/utn/server/obtenerUsuarios.php';
            // const API_KEY = 'http://localhost/utn/server/obtenerUsuario.php?id=1';
            const response = await fetch(API_KEY);

            if (!response.ok) {
                throw new Error('No se pudo obtener la lista de usuarios');
            }
            const usuarios = await response.json();
            return usuarios;
        } catch (error) {
            console.error('Error al obtener usuarios:', error);
            throw error;
        }
    }

    useEffect(() => {
        async function cargarUsuarios() {
            try {
                const usuarios = await obtenerUsuarios();
                setUsuarios(usuarios);
            } catch (error) {
                console.log(error);
            }
        }

        cargarUsuarios();
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
                                            <Piechart />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="card mb-4">
                                <div className="card-header">
                                    <i className="fas fa-table me-1"></i>
                                    DataTable Example
                                </div>
                                <div className="card-body">
                                    <table id="datatablesSimple">
                                        <thead>
                                            <tr>
                                                <th>Name</th>
                                                <th>Position</th>
                                                <th>Office</th>
                                                <th>Age</th>
                                                <th>Start date</th>
                                                <th>Salary</th>
                                            </tr>
                                        </thead>
                                        <tfoot>
                                            <tr>
                                                <th>Name</th>
                                                <th>Position</th>
                                                <th>Office</th>
                                                <th>Age</th>
                                                <th>Start date</th>
                                                <th>Salary</th>
                                            </tr>
                                        </tfoot>
                                        <tbody>
                                            {usuarios.map((usuario, i) =>
                                                <tr key={i}>
                                                    <td>{usuario.nombre} {usuario.apellido}</td>
                                                    <td>{usuario.correo}</td>
                                                    <td>{usuario.tipoplan}</td>
                                                    <td>{usuario.sueldo}</td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </main>
                    <Footer />
                </div>
            </div>
        </div>
    )
}

export default Home;