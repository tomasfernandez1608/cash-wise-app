import { useEffect, useState } from "react";
import { obtenerTipoDeGasto } from "../services/obtenerTipoDeGasto";
import PropTypes from 'prop-types';

const Modal = ({ showModal, cerrarModal, operacionAEditar }) => {
  const [monto, setMonto] = useState(0);
  const [tipoGastoId, setTipoGastoId] = useState("");
  const [tipoDeGasto, setTipoDeGasto] = useState([]);

  useEffect(() => {
    if (operacionAEditar) {
      setMonto(operacionAEditar.monto);
      setTipoGastoId(operacionAEditar.tipo_gasto_id);
    }

    async function cargarTipoDeGasto() {
      try {
        const tipoDeGasto = await obtenerTipoDeGasto();
        setTipoDeGasto(tipoDeGasto);
      } catch (error) {
        console.log(error);
      }
    }

    cargarTipoDeGasto();
  }, [operacionAEditar]);
  const handleEditar = async () => {
    const data = {
      id_operacion: operacionAEditar.id_operacion,
      monto: monto,
      tipo_gasto_id: tipoGastoId,
    };
    console.log(data);
    try {
      const response = await fetch("http://localhost/serverWiseApp/editarOperacion.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.mensaje == "true") {
          cerrarModal(); // Cierra el modal después de editar
        } else {
          console.error("Error al editar la operación.");
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
      {showModal && (
        <div className="modal" tabIndex="-1" role="dialog" style={{ display: "block" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Editar operación</h5>
                <button type="button" className="btn-close" onClick={cerrarModal}></button>
              </div>
              <div className="modal-body">
                <input type="hidden" name="id_operacion" value={operacionAEditar.id_operacion} />
                <input type="hidden" name="tipo_gasto_id" value={operacionAEditar.tipo_gasto_id} />
                <div className="form-group">
                  <label htmlFor="monto">Monto:</label>
                  <input
                    type="number"
                    className="form-control"
                    id="monto"
                    value={monto}
                    onChange={(e) => setMonto(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="tipoGasto">Tipo de Gasto:</label>
                  <select
                    id="tipo_de_gasto"
                    name="tipo_de_gasto"
                    className="form-select"
                    aria-label="Tipo De Gasto"
                    value={tipoGastoId}
                    onChange={(e) => setTipoGastoId(e.target.value)}
                  >
                    <option disabled value="">
                      Seleccione un gasto
                    </option>
                    {tipoDeGasto.map((gasto) => (
                      <option key={gasto.id_gasto} value={gasto.id_gasto}>
                        {gasto.descripcion}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={cerrarModal}>
                  Cerrar
                </button>
                <button className="btn btn-primary" onClick={handleEditar}>Guardar cambios</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showModal && <div className="modal-backdrop show"></div>}
    </div>
  );
};

Modal.propTypes = {
  showModal: PropTypes.any.isRequired,
  cerrarModal: PropTypes.any.isRequired,
  operacionAEditar: PropTypes.any.isRequired,
};

export default Modal;