import { useState, useEffect } from "react";
import ModalEdicion from "../components/ModalEdicion";
import Loading from '../components/Loading/Loading';
import { ToastContainer, toast } from 'react-toastify';
import Barchart from "../components/Barchart";

const HistorialUser = () => {
  const [operaciones, setOperaciones] = useState([]);
  const [operacionAEditar, setOperacionAEditar] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [filtro, setFiltro] = useState("");

  if (!localStorage.getItem("sessionId")) {
    window.location.href = '/';
  }

  const idusuario = JSON.parse(localStorage.getItem("user")).idusuario;

  const editarOperacion = async (operacion) => {
    setOperacionAEditar(operacion);
    setShowModal(true);
  };

  const cerrarModal = () => {
    setShowModal(false);
  };

  const buscar = async () => {
    try {
      const response = await fetch(
        `http://localhost/serverWiseApp/buscador.php`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ filtro: filtro, idusuario: idusuario }),
        }
      );

      if (response.ok) {
        const responseData = await response.json();
        console.log(responseData);
        if (responseData) {
          setOperaciones(responseData);
        } else {
          console.error("Error al eliminar la operación.");
        }
      } else {
        console.error("Error en la solicitud al servidor.");
      }
    } catch (error) {
      console.error("Error en la solicitud al servidor:", error);
    }
  };

  const showToast = () => {
    toast.info("Operacion eliminada", {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const eliminarOperacion = async (idOperacion) => {
    try {
      const response = await fetch(
        `http://localhost/serverWiseApp/eliminarOperacion.php`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id_operacion: idOperacion }),
        }
      );

      if (response.ok) {
        const responseData = await response.json();
        if (responseData.mensaje === "Se eliminó la operación correctamente") {
          setTimeout(() => {
            window.location.reload();
          }, 1300);
        } else {
          console.error("Error al eliminar la operación.");
        }
      } else {
        console.error("Error en la solicitud al servidor.");
      }
    } catch (error) {
      console.error("Error en la solicitud al servidor:", error);
    }

    showToast();
  };

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

  return (
    <div className="card m-5">
      <div className="card-header">
        <h1>
          <i className="fas fa-tags me-1"></i> Historial de gastos
        </h1>
      </div>
      <div className="card-body">
        <form id="reporteForm" method="post">
          <div className="row d-flex justify-content-between  align-items-center ">
            <div className="col-sm-3">
              <div className="mb-2">
                <label className="form-label">Buscar</label>
                <input
                  className="form-control"
                  type="text"
                  name="filtro"
                  id="inputfechafin"
                  value={filtro}
                  onChange={(e) => setFiltro(e.target.value)}
                />
              </div>
            </div>
            <div className="col-sm-3">
              <div className="mb-2 d-grid">
                <button
                  className="btn btn-primary"
                  id="btnbuscar"
                  type="button"
                  onClick={() => buscar()}
                >
                  Buscar <i className="fas fa-search"></i>
                </button>
              </div>
              <div className="mb-2 d-grid">
                <button
                  className="btn btn-secondary"
                  id="btnlimpiar"
                  type="button"
                  onClick={() => cargarOperaciones()}
                >
                  Limpiar <i className="fa-solid fa-broom"></i>
                </button>
              </div>
            </div>
          </div>
        </form>
        <hr />
        {loading ? (
          <Loading />
        ) : (
          <>
            <table
              id="tablaoperaciones"
              className="table table-striped table-hover table-bordered  border-5"
            >
              <thead>
                <tr>
                  <th scope="col">Fecha</th>
                  <th scope="col">Categoria</th>
                  <th scope="col">Monto</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {operaciones.map((operacion, index) => (
                  <tr key={index}>
                    <th scope="row">{operacion.fechaoperacion}</th>
                    <td>{operacion.tipo_gasto_descripcion}</td>
                    <td>{operacion.monto}</td>
                    <td>
                      <div className="d-flex justify-content-end ">
                        <button
                          className="btn btn-primary btn-sm btn-editar"
                          onClick={() => editarOperacion(operacion)}
                        >
                          <i className="fas fa-pen"></i> Editar
                        </button>
                        <button
                          className="btn btn-danger btn-sm ms-2 btn-eliminar"
                          onClick={() =>
                            eliminarOperacion(operacion.id_operacion)
                          }
                        >
                          <i className="fas fa-trash"></i> Eliminar
                        </button>
                        <ToastContainer
                          position="top-right"
                          autoClose={3000}
                          hideProgressBar={false}
                          newestOnTop={false}
                          closeOnClick
                          rtl={false}
                          pauseOnFocusLoss
                          draggable
                          pauseOnHover
                          theme="light"
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <ModalEdicion
              showModal={showModal}
              cerrarModal={cerrarModal}
              operacionAEditar={operacionAEditar}
            />

            <Barchart />
          </>
        )}
      </div>
    </div>
  );
};

export default HistorialUser;
