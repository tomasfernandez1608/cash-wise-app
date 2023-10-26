import { useState, useEffect } from "react";
import Nav from "../components/Nav";
import NavBar from "../components/NavBar";

const Home = () => {
    const [usuarios, setUsuarios] = useState([]);
    // const [loading, setLoading] = useState(true);

    async function obtenerUsuarios() {
        try {
            const API_KEY = 'http://localhost/utn/server/obtenerUsuarios.php';
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
                <div id="layoutSidenav_nav">
                    <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
                        <div className="sb-sidenav-menu bg-secondary">
                            <Nav />
                        </div>
                    </nav>
                </div>
   
                <div id="layoutSidenav_content">
                    <main>
                        <div className="container-fluid px-4">
                            <h1 className="mt-4">Cashwise App</h1>
                            <ol className="breadcrumb mb-4">
                                <li className="breadcrumb-item active">Cashwise es una aplicación de gestión de gastos y finanzas personales diseñada para simplificar y fortalecer tu control financiero. Con Cashwise, podes registrar y categorizar fácilmente tus ingresos y gastos, establecer presupuestos personalizados y hacer un seguimiento de tus metas de ahorro. La interfaz intuitiva y las poderosas herramientas de visualización te permiten entender tus patrones de gasto y tomar decisiones financieras más inteligentes. Cashwise es tu socio confiable para alcanzar la estabilidad financiera y asegurarte de que tu dinero trabaje para vos.</li>
                            </ol>
                            <div className="row">
                                <div className="col-xl-4">
                                <div class="card text-center">
                                    <div class="card-header">
                                        <p class="fst-italic">Iniciar Sesion o Registrese</p>
                                    </div>
                                    <div class="card-body">
                                        <a href="#" class="btn btn-outline-dark m-3">Inicia Sesion</a>
                                        <br></br>
                                        <a href="#" class="btn btn-dark m-3">Registrarse</a>
                                    </div>
                                </div>
                                </div>
                                <div className="col-xl-8">
                                <div class="card" >
                                    <div class="row g-0">
                                        <div class="col-md-4 mt-5">
                                        <img src="https://static.vecteezy.com/system/resources/previews/015/123/095/non_2x/government-expenditures-circle-infographic-design-template-for-dark-theme-financial-statistics-editable-pie-chart-with-sectors-visual-data-presentation-vector.jpg" class="img-fluid rounded-start" alt="..."></img>
                                        </div>
                                        <div class="col-md-8">
                                            <div class="card">
                                                <div class="card-header">
                                                    <h5 class="card-title">Balance de Gastos</h5>
                                                </div>
                                                <div class="card-body">
                                                    <ul class="list-group">
                                                        <li class="list-group-item bg-dark-subtle text-emphasis-dark">Alquiler: $1,200</li>
                                                        <li class="list-group-item bg-secondary text-white">Comida: $400</li>
                                                        <li class="list-group-item bg-dark-subtle text-emphasis-dark">Transporte: $200</li>
                                                        <li class="list-group-item bg-secondary text-white">Entretenimiento: $150</li>
                                                        <li class="list-group-item bg-dark-subtle text-emphasis-dark">Facturas: $300</li>
                                                        <li class="list-group-item bg-secondary text-white">Ahorros: $500</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
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
                                                <td>{usuario.nombre}{usuario.apellido}</td>
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

                    <footer className="py-4 bg-light mt-auto">
                        <div className="container-fluid px-4">
                            <div className="d-flex align-items-center justify-content-between small">
                                <div className="text-muted">Copyright &copy; Cashwise App 2023</div>
                                <div>
                                    <a href="#">Privacy Policy</a>
                                    &middot;
                                    <a href="#">Terms &amp; Conditions</a>
                                </div>
                            </div>
                        </div>
                    </footer>
                </div>
            </div>
        </div>
    )
}

export default Home;