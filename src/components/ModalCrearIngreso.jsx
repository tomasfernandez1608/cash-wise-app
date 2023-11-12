import { useState } from "react";
import PropTypes from "prop-types";

const ModalCrearIngreso = ({ showModalCrearIngreso, cerrarModal }) => {
  const [fuente, setFuente] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [monto, setMonto] = useState("");
  const idusuario = JSON.parse(localStorage.getItem("user")).idusuario;
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
        idusuario: idusuario,
        fuente: fuente,
        descripcion: descripcion,
        monto: monto,
      };
      console.log(data);
      try {
        const response = await fetch(
          "http://localhost/serverWiseApp/registrarIngreso.php",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          }
        );

        if (response.ok) {
          const data = await response.json();
          if (data.mensaje == "true") {
            cerrarModal();
            window.location.reload();
          } else {
            console.error("Operacion Realizada");
          }
        } else {
          console.error("Error en la solicitud al servidor.");
        }
      } catch (error) {
        console.error("Error en la solicitud al servidor:", error);
      }
    }
  };

  return (
    <div>
      {showModalCrearIngreso && (
        <div
          className="modal"
          tabIndex="-1"
          role="dialog"
          style={{ display: "block" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Crear Ingreso</h5>
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
                  Guardar Ingreso
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showModalCrearIngreso && <div className="modal-backdrop show"></div>}
    </div>
  );
};

ModalCrearIngreso.propTypes = {
  showModalCrearIngreso: PropTypes.any.isRequired,
  cerrarModal: PropTypes.any.isRequired,
};

export default ModalCrearIngreso;
