import { useState } from "react";
import PropTypes from 'prop-types';

const ModalCrearIngreso= ({ showModalCrearIngreso, cerrarModal }) => {
  const [fuente, setFuente] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [monto, setMonto] = useState('');
  const idusuario = JSON.parse(localStorage.getItem("user")).idusuario;
  const handleEditar = async () => {
    const data = {
        idusuario:idusuario,
      fuente:fuente,
      descripcion: descripcion,
      monto: monto,
    };
    console.log(data);
    try {
      const response = await fetch("http://localhost/serverWiseApp/registrarIngreso.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

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
  };

  return (
    <div>
      {showModalCrearIngreso && (
        <div className="modal" tabIndex="-1" role="dialog" style={{ display: "block" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Crear Ingreso</h5>
                <button type="button" className="btn-close" onClick={cerrarModal}></button>
              </div>
              <div className="modal-body">
                <div className="form-group m-2">
                  <label className="mb-2 " htmlFor="fuente">Fuente:</label>
                  <input
                    type="text"
                    className="form-control mb-2"
                    id="fuente"
                    value={fuente}
                    onChange={(e) => setFuente(e.target.value)}
                  />
                </div>
                <div className="form-group m-2">
                  <label className="mb-2 " htmlFor="descripcion">Descripción:</label>
                  <input
                    type="text"
                    className="form-control mb-2"
                    id="descripcion"
                    value={descripcion}
                    onChange={(e) => setDescripcion(e.target.value)}
                  />
                </div>
                <div className="form-group m-2">
                  <label className="mb-2 " htmlFor="monto">monto:</label>
                  <input

                    type="text"
                    className="form-control mb-2"
                    id="monto"
                    value={monto}
                    onChange={(e) => setMonto(e.target.value)}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={cerrarModal}>
                  Cerrar
                </button>
                <button className="btn btn-primary" onClick={handleEditar}>Guardar Ingreso</button>
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