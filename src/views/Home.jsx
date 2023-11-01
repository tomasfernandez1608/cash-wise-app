import { useState, useEffect } from "react";
import { obtenerOperaciones } from "../services/obtenerOperaciones";
import Piechart from "../components/Piechart";
import CoinRanking from "../components/CoinRanking";
import TablaUsuarios from "../components/TablaUsuarios";
import FormGasto from "../components/FormGasto";
import Descripcion from "../components/Descripcion";

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
        const operaciones = await obtenerOperaciones(
          JSON.parse(localStorage.getItem("user")).idusuario
        );
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
                    className="card-body d-flex justify-content-center "
                    style={{ height: "600px" }}
                  >
                    {operaciones.length == 0 ? (
                      <h3>No tiene gastos ingresados.</h3>
                    ) : (
                      <Piechart
                        operaciones={operaciones}
                        idUsuario={usuario.idusuario}
                      />
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