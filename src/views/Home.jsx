import { useState, useEffect } from "react";
import { obtenerOperaciones } from "../services/obtenerOperaciones";
import Piechart from "../components/Piechart";
import CoinRanking from "../components/CoinRanking";
import TablaUsuarios from "../components/TablaUsuarios";
import FormGasto from "../components/FormGasto";
import Descripcion from "../components/Descripcion";
import Loading from '../components/Loading/Loading';

const Home = () => {
  const [operaciones, setOperaciones] = useState([]);
  const [ingresos, setIngresos] = useState([]);
  const [forgotPassword, setForgotPassword] = useState(false);
  const [sessionId, setSessionId] = useState();
  const [usuario, setUsuario] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setSessionId(localStorage.getItem("sessionId"));
  }, [sessionId]);

  useEffect(() => {
    async function cargarOperaciones() {
      try {
        const operaciones = await obtenerOperaciones(
          JSON.parse(localStorage.getItem("user")).idusuario
        );
        setOperaciones(operaciones);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    const cargarIngreso = async () => {
      try {
        const response = await fetch(
          "http://localhost/serverWiseApp/obtenerIngresos.php",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ idusuario: JSON.parse(localStorage.getItem("user")).idusuario }),
          }
        );
        if (response.ok) {
          const data = await response.json();
          setIngresos(data.mensaje);
        } else {
          console.error("Error en la solicitud al servidor.");
        }
      } catch (error) {
        console.error("Error en la solicitud al servidor:", error);
      } finally {
        setLoading(false);
      }
    };

    if (sessionId) {
      setUsuario(JSON.parse(localStorage.getItem("user")));
      cargarOperaciones();
      cargarIngreso();
    }
  }, [sessionId]);

  const totalMontos = ingresos.reduce((acumulador, objeto) => {
    return acumulador + parseFloat(objeto.monto);
  }, 0);

  useEffect(() => {
    if (!forgotPassword) {
      setForgotPassword(true);
    }
  }, [forgotPassword]);

  return (
    <div>
      <main className="m-5">
        <div className="container-fluid">
          <div className="row  d-flex justify-content-center">
            <div className={usuario.admin ? "col-xl-12" : "col-xl-6"}>
              <div className="text-center">
                {sessionId ? (
                  usuario.admin ? (
                    <TablaUsuarios />
                  ) : (
                    <FormGasto />
                  )
                ) : (
                  null
                )}
              </div>
            </div>

            <div className={!sessionId ? "col-xl-12" : "col-xl-6"}>
              {sessionId ? usuario.admin ? null : (
                <div className="card">
                  <div className="card-header">
                    <h5 className="card-title d-flex justify-content-center">
                      Balance de gastos
                    </h5>
                  </div>
                  <div
                    className={loading ? "card-body" : "card-body d-flex justify-content-center"}
                    style={{ height: "600px" }}
                  >
                    {loading ? <Loading /> : (
                      operaciones.length == 0 ? (
                        <h3>No tiene gastos ingresados.</h3>
                      ) : (
                        <Piechart
                          operaciones={operaciones}
                          idUsuario={usuario.idusuario}
                          ingresos={totalMontos}
                        />
                      )
                    )}
                  </div>
                </div>
              ) : <Descripcion />
              }
            </div>
          </div>
        </div>
        {!usuario.admin ? <CoinRanking /> : null}
      </main>
    </div>
  );
};

export default Home;