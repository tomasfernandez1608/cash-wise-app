import { useState, useEffect } from "react";
import { obtenerOperaciones } from "../services/obtenerOperaciones";
import Piechart from "../components/Piechart";
import CoinRanking from "../components/CoinRanking";
import TablaUsuarios from "../components/TablaUsuarios";
import FormGasto from "../components/FormGasto";
import Descripcion from "../components/Descripcion";
import { ChatIa } from "../components/ChatIa";

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

  const img1 = "https://cdn.coinranking.com/bOabBYkcX/bitcoin_btc.svg";

  const img2 = "https://cdn.coinranking.com/rk4RKHOuW/eth.svg";

  const img3 = "https://cdn.coinranking.com/mgHqwlCLj/usdt.svg";

  // FUNCIONALIDAD DEMOUSE
   const cursorImages = [img1, img2, img3];
   const usuarioRollViewMouse = true; // HABILITA O NO EL EFECTO
   const movementThreshold = 75; // Cantidad mínima de píxeles que el mouse debe moverse para cambiar el cursor
   useEffect(() => {
     let lastX = 0;
     let lastY = 0;
     const changeCursor = (event) => {
       const deltaX = Math.abs(event.clientX - lastX);
       const deltaY = Math.abs(event.clientY - lastY);
 
       if (deltaX + deltaY < movementThreshold) {
         return; // No hacer nada si el mouse no se ha movido lo suficiente
       }
 
       lastX = event.clientX;
       lastY = event.clientY;
 
       const randomIndex = Math.floor(Math.random() * cursorImages.length);
       const randomSize = Math.floor(Math.random() * 25) + 15; // Tamaño entre 20 y 50
       const randomRotation = Math.floor(Math.random() * 360); // Rotación de 0 a 360 grados
 
       const imageUrl = cursorImages[randomIndex];
       const cursorStyle = `url('${imageUrl}') ${randomSize} ${randomSize}, auto`;
 
       const cursorElement = document.createElement("div");
       cursorElement.style.position = "absolute";
       cursorElement.style.left = `${event.clientX}px`;
       cursorElement.style.top = `${event.clientY}px`;
       cursorElement.style.width = `${randomSize}px`;
       cursorElement.style.height = `${randomSize}px`;
       cursorElement.style.backgroundImage = `url('${imageUrl}')`;
       cursorElement.style.backgroundSize = "cover";
       cursorElement.style.transform = `rotate(${randomRotation}deg)`;
       cursorElement.style.pointerEvents = "none"; // Para evitar que el elemento interfiera con el clic
 
       document.body.appendChild(cursorElement);
 
       setTimeout(() => {
         document.body.removeChild(cursorElement);
       }, 500); // Elimina el elemento después de un breve período para evitar el desorden en el DOM
     };
 
     if (usuarioRollViewMouse) {
       window.addEventListener("mousemove", changeCursor);
     }
 
     return () => {
       window.removeEventListener("mousemove", changeCursor);
     };
   }, [usuarioRollViewMouse, cursorImages]);

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
        <ChatIa/>
        {!usuario.admin ? <CoinRanking /> : null}
      </main>
    </div>
  );
};

export default Home;