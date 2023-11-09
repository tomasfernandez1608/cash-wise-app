import { useState, useEffect } from "react";
import Loading from "../components/Loading/Loading";
import ModalIngresos from "../components/ModalIngresos";

const Ingresos = () => {
  const [ingresos, setIngresos] = useState([]);
  const [ingresoAEditar, setIngresoAEditar] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [showModalCrearCategoria, setShowModalCrearCategoria] = useState(false);
  const [loading, setLoading] = useState(true);
  const idusuario = JSON.parse(localStorage.getItem("user")).idusuario;
  const crearIngreso = async () => {
    setShowModalCrearCategoria(true);
  };

  const editarIngreso = async (ingreso) => {
    setIngresoAEditar(ingreso);
    console.log(ingresoAEditar);
    setShowModal(true);
  };

  const cerrarModal = () => {
    setShowModal(false);
  };

  const eliminarIngreso = async (id_Ingreso) => {
    try {
      const response = await fetch(
        `http://localhost/serverWiseApp/eliminarIngreso.php`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id_Ingreso: id_Ingreso }),
        }
      );

      if (response.ok) {
        const responseData = await response.json();
        if (responseData.mensaje === "true") {
          window.location.reload();
        } else {
          console.error("Error al eliminar la operación.");
          alert(responseData.mensaje);
        }
      } else {
        console.error("Error en la solicitud al servidor.");
      }
    } catch (error) {
      console.error("Error en la solicitud al servidor:", error);
    }
  };

  useEffect(() => {
    const cargarIngreso = async () => {
      try {
        const response = await fetch(
          "http://localhost/serverWiseApp/obtenerIngresos.php",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ idusuario: idusuario }),
          }
        );
        console.log(response);
        if (response.ok) {
          const data = await response.json();
          setIngresos(data.mensaje);
          console.log(ingresos);
        } else {
          console.error("Error en la solicitud al servidor.");
        }
      } catch (error) {
        console.error("Error en la solicitud al servidor:", error);
      } finally {
        setLoading(false);
      }
    };

    cargarIngreso();
  }, [idusuario, ingresos]);

  return (
    <main className="container mt-5">
      <div className="card m-5">
        <div className="card-header">
          <h1>
            <i className="fas fa-tags me-1"></i>Ingresos
          </h1>
        </div>
        {loading ? (
          <Loading />
        ) : (
          <div className="card-body">
            <div className="col m-2">
              <div className="mb-2 d-grid">
                <button
                  className="btn btn-primary"
                  id="btnCrearIngreso"
                  type="button"
                  onClick={crearIngreso}
                >
                  <i className="fa-solid fa-plus"></i> Crear Ingreso
                </button>
              </div>
            </div>
            <hr />
            <table
              id="tablaIngreso"
              className="table table-striped table-hover table-bordered  border-5"
            >
              <thead>
                <tr>
                  <th scope="col">Fecha</th>
                  <th scope="col">Descripción</th>
                  <th scope="col">Monto</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {ingresos.map((ingreso, index) => (
                  <tr key={index}>
                    <th scope="row">{ingreso.fecha}</th>
                    <td>{ingreso.descripcion}</td>
                    <td>{ingreso.monto}</td>
                    <td>
                      <div>
                        <button
                          className="btn btn-primary btn-sm btn-editar"
                          onClick={() => editarIngreso(ingreso)}
                        >
                          <i className="fas fa-pen"></i> Editar
                        </button>
                        <button
                          className="btn btn-danger btn-sm ms-2 btn-eliminar"
                          onClick={() => eliminarIngreso(ingreso.id_Ingreso)}
                        >
                          <i className="fas fa-trash"></i> Eliminar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <ModalIngresos
              showModalIngresos={showModal}
              cerrarModal={cerrarModal}
              ingresoAEditar={ingresoAEditar}
            />
          </div>
        )}
      </div>
    </main>
  );
};

export default Ingresos;