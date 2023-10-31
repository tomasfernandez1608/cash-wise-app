import { useState, useEffect } from "react";
import { Login } from "../components/Login";
import { obtenerOperaciones } from "../services/obtenerOperaciones";
import { obtenerUsuario } from "../services/obtenerUsuario";
import Footer from "../components/Footer";
import Piechart from "../components/Piechart";
import CoinRanking from "../components/CoinRanking";

const Home = () => {
  const [operaciones, setOperaciones] = useState([]);
  const [forgotPassword, setForgotPassword] = useState(false);
  const [sessionId, setSessionId] = useState();

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

  useEffect(() => {
    setSessionId(localStorage.getItem("sessionId"));
  }, [sessionId]);

  useEffect(() => {
    async function cargarUsuario() {
      try {
        const correo = JSON.parse(localStorage.getItem("correo"));
        const usuario = await obtenerUsuario(correo);
        localStorage.setItem("user", JSON.stringify(usuario));
      } catch (error) {
        console.log(error);
      }
    }

    if (localStorage.getItem("sessionId")) {
      cargarUsuario();
    }

  }, []);

  //Olvidar contraseña
  useEffect(() => {
    if (!forgotPassword) {
      setForgotPassword(true);
    }
  }, [forgotPassword]);

  return (
    <div id="layoutSidenav_content">
      <main>
        <div className="container-fluid px-4">
          <h1 className="mt-4">Cashwise App</h1>
          <ol className="breadcrumb mb-4">
            <li className="breadcrumb-item active fs-5">
              Cashwise es una aplicación de gestión de gastos y finanzas
              personales diseñada para simplificar y fortalecer tu control
              financiero. Con Cashwise, podes registrar y categorizar fácilmente
              tus ingresos y gastos, establecer presupuestos personalizados y
              hacer un seguimiento de tus metas de ahorro. La interfaz intuitiva
              y las poderosas herramientas de visualización te permiten entender
              tus patrones de gasto y tomar decisiones financieras más
              inteligentes. Cashwise es tu socio confiable para alcanzar la
              estabilidad financiera y asegurarte de que tu dinero trabaje para
              vos.
            </li>
          </ol>

          <div className="row mb-3 d-flex justify-content-center g-4 ">
            <div className="col-xl-4">
              <div className="text-center">
                {
                  sessionId ? <p>Usuario logueado</p> : <Login />
                }
              </div>
            </div>
            <div className="col-8">
              <div className="card">
                <div className="card-header">
                  <h5 className="card-title d-flex justify-content-center">Balance de gastos</h5>
                </div>
                <div className="card-body d-flex justify-content-center" style={{ maxHeight: "550px" }}>
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
  );
};

export default Home;
