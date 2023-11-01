import { useState, useEffect } from "react";
import ModalCategoria from "./ModalCategoria";
import Loading from './Loading/Loading';
import ModalCrearCategoria from "./ModalCrearCategoria";


const CategoriaAdmin = () => {
  const [gasto, setGasto] = useState([]);
  const [gastoAEditar, setGastoAEditar] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [showModalCrearCategoria, setShowModalCrearCategoria] = useState(false);
  const [loading, setLoading] = useState(true);

  const crearGasto = async () => {
    setShowModalCrearCategoria(true);
  };
  const editarGasto = async (gasto) => {
    setGastoAEditar(gasto);
    setShowModal(true);
  };

  const cerrarModal = () => {
    setShowModal(false);
  };
  const eliminarGasto = async (id_gasto) => {
    try {
      const response = await fetch(
        `http://localhost/serverWiseApp/eliminarGasto.php`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id_gasto: id_gasto }),
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
    const cargarGasto = async () => {
      try {
        const response = await fetch(
          `http://localhost/serverWiseApp/obtenerTipoDeGasto.php/`
        );
        if (response.ok) {
          const data = await response.json();
          setGasto(data);
        } else {
          console.error("Error al cargar gasto");
        }
      } catch (error) {
        console.error("Error al cargar gasto:", error);
      } finally {
        setLoading(false);
      }
    };

    cargarGasto();
  }, []);

  return (
    <div className="card m-5">
      <div className="card-header">
        <h1 ><i className="fas fa-tags me-1"></i> Categorías</h1>
      </div>
      {
        loading ? <Loading /> : (<div className="card-body">
          <div className="col m-2">
            <div className="mb-2 d-grid">
              <button className="btn btn-primary" id="btnCrearcategoria" type="button" onClick={crearGasto}>
                <i className="fa-solid fa-plus"></i> Crear categoría
              </button>
            </div>
          </div>
          <hr />
          <table
            id="tablagasto"
            className="table table-striped table-hover table-bordered  border-5"
          >
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Descripción</th>
                <th scope="col">Color</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {gasto.map((gasto, index) => (
                <tr key={index}>
                  <th scope="row">{gasto.id_gasto}</th>
                  <td>{gasto.descripcion}</td>
                  <td>{gasto.color}</td>
                  <td>
                    <div>
                      <button
                        className="btn btn-primary btn-sm btn-editar"
                        onClick={() => editarGasto(gasto)}
                      >
                        <i className="fas fa-pen"></i> Editar
                      </button>
                      <button
                        className="btn btn-danger btn-sm ms-2 btn-eliminar"
                        onClick={() => eliminarGasto(gasto.id_gasto)}
                      >
                        <i className="fas fa-trash"></i> Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <ModalCategoria
            showModal={showModal}
            cerrarModal={cerrarModal}
            gastoAEditar={gastoAEditar}
          />
          <ModalCrearCategoria
            showModalCrearCategoria={showModalCrearCategoria}
            cerrarModal={() => setShowModalCrearCategoria(false)} // Cierra el modal de creación de categoría
          />
        </div>)
      }
    </div>
  );
};

export default CategoriaAdmin;
