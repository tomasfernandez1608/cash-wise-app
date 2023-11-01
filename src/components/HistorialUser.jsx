import { useState, useEffect } from "react";
import ModalEdicion from "./ModalEdicion";
const HistorialUser = () => {
  const [operaciones, setOperaciones] = useState([]);
  const [operacionAEditar, setOperacionAEditar] = useState([]);
  const [fechainicio, setFechaInicio] = useState("");
  const [modalAbierto, setModalAbierto] = useState(false);
  const [fechafin, setFechaFin] = useState("");
  const idusuario = JSON.parse(localStorage.getItem("user")).idusuario;
  console.log(idusuario);
  useEffect(() => {
    const editaroperacion = async () =>{
        setModalAbierto(true);

    }
    // Función para cargar operaciones desde el servidor
    const cargarOperaciones = async () => {
      try {
        const response = await fetch(
          `http://localhost/serverWiseApp/obtenerOperaciones.php?id=${idusuario}`
        );
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setOperaciones(data);
        } else {
          console.error("Error al cargar operaciones");
        }
      } catch (error) {
        console.error("Error al cargar operaciones:", error);
      }
    };

    cargarOperaciones();
  }, [idusuario]);

  return (
    <div className="card m-5">
      <div className="card-header">
        <i className="fas fa-tags me-1"></i>
        Historial de Gastos
      </div>
      <div className="card-body">
        <form id="reporteForm" method="post">
          <div className="row d-flex  justify-content-center ">
            <div className="col-sm-3">
              <div className="mb-2">
                <label className="form-label">Fecha de Inicio:</label>
                <input
                  className="form-control"
                  type="date"
                  name="fechainicio"
                  id="inputfechainicio"
                />
              </div>
            </div>
            <div className="col-sm-3">
              <div className="mb-2">
                <label className="form-label">Fecha de Fin:</label>
                <input
                  className="form-control"
                  type="date"
                  name="fechafin"
                  id="inputfechafin"
                />
              </div>
            </div>
            <div className=" d-flex  justify-content-center">
              <div className="col-sm-2 m-2 ">
                <div className="mb-2 d-grid ">
                  <button
                    className="btn btn-primary"
                    id="btnbuscar"
                    type="button"
                  >
                    <i className="fas fa-search"></i>Buscar
                  </button>
                </div>
              </div>
              <div className="col-sm-2 m-2 ">
                <div className="mb-2 d-grid">
                  <button className="btn btn-success" type="submit">
                    <i className="fas fa-file-excel"></i>Exportar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
        <hr />
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
                  <div>
                    <button
                      class="btn btn-primary btn-sm btn-editar" 
                    >
                      <i class="fas fa-pen"></i> Editar
                    </button>
                    <button class="btn btn-danger btn-sm ms-2 btn-eliminar">
                      <i class="fas fa-trash"></i> Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HistorialUser;