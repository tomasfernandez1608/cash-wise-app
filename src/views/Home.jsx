import { useState, useEffect } from "react";
import { Login } from "../components/Login";
import { obtenerOperaciones } from "../services/obtenerOperaciones";
import Footer from "../components/Footer";
import Piechart from "../components/Piechart";
import CoinRanking from "../components/CoinRanking";
import TablaUsuarios from "../components/TablaUsuarios";
import FormGasto from "../components/FormGasto";

const Home = () => {
  const [operaciones, setOperaciones] = useState([]);
  const [forgotPassword, setForgotPassword] = useState(false);
  const [sessionId, setSessionId] = useState();
  const [usuario, setUsuario] = useState({});

  useEffect(() => {
    setSessionId(localStorage.getItem("sessionId"));
  }, [sessionId]);

  useEffect(() => {
    async function cargarOperaciones() {
      try {
        const operaciones = await obtenerOperaciones(JSON.parse(localStorage.getItem("user")).idusuario);
        setOperaciones(operaciones);
      } catch (error) {
        console.log(error);
      }
    }

    if (sessionId) {
      setUsuario(JSON.parse(localStorage.getItem("user")));
      cargarOperaciones();
    }
  }, [sessionId]);

  useEffect(() => {
    if (!forgotPassword) {
      setForgotPassword(true);
    }
  }, [forgotPassword]);

  return (
    <div id="layoutSidenav_content">
      <main>
        <div className="container-fluid px-4">
          <h1 className="mt-4 mb-2">Cashwise App</h1>
          <hr />
          <div className="row mb-3 d-flex justify-content-center g-4 ">
            <div className={usuario.admin ? "col-xl-12" : "col-xl-5"}>
              <div className="text-center">
                {
                  sessionId ? (
                    usuario.admin ? (
                      <TablaUsuarios />
                    ) : (
                      <FormGasto />
                    )
                  ) : (
                    <Login />
                  )
                }
              </div>
            </div>
            <div className="col-xl-7">
              {
                sessionId ? (
                  usuario.admin ? (
                    null
                  ) : (
                    <div className="card">
                      <div className="card-header">
                        <h5 className="card-title d-flex justify-content-center">Balance de gastos</h5>
                      </div>
                      <div className="card-body d-flex justify-content-center " style={{ height: "500px" }}>
                        {operaciones.length == 0 ? <h3>No tiene gastos ingresados.</h3> : <Piechart operaciones={operaciones} idUsuario={usuario.idusuario} />}
                      </div>
                    </div>
                  )
                ) : (
                  <div className="card" style={{ height: "500px" }}>
                    <div className="card-header">
                      <h4 className="card-title d-flex justify-content-center">Descripción</h4>
                    </div>
                    <div className="fs-4 card-body d-flex  justify-content-center  align-items-center mx-5 overflow-auto ">
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
                    </div>
                  </div>
                )
              }
            </div>
          </div>
        </div>
        {
          !usuario.admin ? (
            <CoinRanking />
          ) : (
            null
          )
        }
      </main>
      <Footer />
    </div>
  );
};

export default Home;
