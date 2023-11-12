import { useEffect, useState } from "react";
import PropTypes from "prop-types";

const ModalIngresos = ({ showModalIngresos, cerrarModal, ingresoAEditar }) => {
  const [descripcion, setDescripcion] = useState("");
  const [monto, setMonto] = useState("");
  const [fuente, setFuente] = useState("");
  const [errores, setErrores] = useState({
    fuente: null,
    descripcion: "",
    monto: null,
  }); //manejo de errores en form

  const handleEditar = async () => {
    let nuevosErrores = {}; // Objeto para almacenar los posibles errores

    // Validación para el nombre
    if (!fuente.trim()) {
      nuevosErrores.fuente = "La fuente es requerida";
    }
    // Validación para el nombre
    if (!descripcion.trim()) {
      nuevosErrores.descripcion = "La descripcion es requerida";
    }
    // Validación para el nombre
    if (!monto.trim()) {
      nuevosErrores.monto = "El monto es requerido";
    }

    setErrores(nuevosErrores); // Actualiza el estado de errores con los nuevos errores

    if (Object.keys(nuevosErrores).length === 0) {
      const data = {
        id_ingreso: ingresoAEditar.id_ingreso,
        fuente: fuente,
        descripcion: descripcion,
        monto: monto,
      };
      try {
        const response = await fetch(
          "http://localhost/serverWiseApp/editarIngreso.php",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          }
        );
        console.log(response);
        if (response.ok) {
          cerrarModal();
        } else {
          console.error("Error en la solicitud al servidor.");
        }
      } catch (error) {
        console.error("Error en la solicitud al servidor:", error);
      }
    }
  };
  useEffect(() => {
    if (ingresoAEditar) {
      setDescripcion(ingresoAEditar.descripcion || "");
      setMonto(ingresoAEditar.monto || "");
      setFuente(ingresoAEditar.fuente || "");
    }
  }, [ingresoAEditar]);
  return (
    <div>
      {showModalIngresos && (
        <div
          className="modal"
          tabIndex="-1"
          role="dialog"
          style={{ display: "block" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Editar Ingreso</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={cerrarModal}
                ></button>
              </div>
              <div className="modal-body">
                <div className="form-group m-2">
                  <label className="mb-2 " htmlFor="fuente">
                    Fuente:
                  </label>
                  <input
                    type="text"
                    className={`form-control ${
                      errores.fuente ? "is-invalid" : ""
                    }`} //maneja el estilo del input segun error
                    id="fuente"
                    value={fuente}
                    onChange={(e) => setFuente(e.target.value)}
                  />
                  {errores.fuente && ( // mensaje de error si no pasa la validacion
                    <div className="invalid-feedback d-block">
                      {errores.fuente}
                    </div>
                  )}
                </div>
                <div className="form-group m-2">
                  <label className="mb-2 " htmlFor="descripcion">
                    Descripción:
                  </label>
                  <input
                    type="text"
                    className={`form-control ${
                      errores.descripcion ? "is-invalid" : ""
                    }`} //maneja el estilo del input segun error
                    id="descripcion"
                    value={descripcion}
                    onChange={(e) => setDescripcion(e.target.value)}
                  />
                  {errores.descripcion && ( // mensaje de error si no pasa la validacion
                    <div className="invalid-feedback d-block">
                      {errores.descripcion}
                    </div>
                  )}
                </div>
                <div className="form-group m-2">
                  <label className="mb-2 " htmlFor="monto">
                    monto:
                  </label>
                  <input
                    type="text"
                    className={`form-control ${
                      errores.monto ? "is-invalid" : ""
                    }`} //maneja el estilo del input segun error
                    id="monto"
                    value={monto}
                    onChange={(e) => setMonto(e.target.value)}
                  />
                  {errores.monto && ( // mensaje de error si no pasa la validacion
                    <div className="invalid-feedback d-block">
                      {errores.monto}
                    </div>
                  )}
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={cerrarModal}>
                  Cerrar
                </button>
                <button className="btn btn-primary" onClick={handleEditar}>
                  Guardar cambios
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showModalIngresos && <div className="modal-backdrop show"></div>}
    </div>
  );
};

ModalIngresos.propTypes = {
  showModalIngresos: PropTypes.any.isRequired,
  cerrarModal: PropTypes.any.isRequired,
  ingresoAEditar: PropTypes.any.isRequired,
};

export default ModalIngresos;
