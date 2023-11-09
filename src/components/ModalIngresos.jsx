import { useEffect, useState } from "react";
import PropTypes from 'prop-types';

const ModalIngresos = ({ showModalIngresos, cerrarModal, ingresoAEditar }) => {
  const [descripcion, setDescripcion] = useState('');
  const [monto, setMonto] = useState('');
  const [fuente, setFuente] = useState('');

  const handleEditar = async () => {
    const data = {
      id_ingreso: ingresoAEditar.id_ingreso,  
      fuente:fuente,
      descripcion: descripcion,
      monto: monto,
    };
    try {
      const response = await fetch("http://localhost/serverWiseApp/editarIngreso.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      console.log(response);
      if (response.ok) {
          cerrarModal();
      } else {
        console.error("Error en la solicitud al servidor.");
      }
    } catch (error) {
      console.error("Error en la solicitud al servidor:", error);
    }
  };
  useEffect(() => {
    if (ingresoAEditar) {
      setDescripcion(ingresoAEditar.descripcion || '');
      setMonto(ingresoAEditar.monto || '');
      setFuente(ingresoAEditar.fuente || '')
    }
  }, [ingresoAEditar])
  return (
    <div>
      {showModalIngresos && (
        <div className="modal" tabIndex="-1" role="dialog" style={{ display: "block" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Editar Ingreso</h5>
                <button type="button" className="btn-close" onClick={cerrarModal}></button>
              </div>
              <div className="modal-body">
                <div className="form-group m-2">
                  <label className="mb-2 " htmlFor="fuente">fuente:</label>
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
                  <label className="mb-2 " htmlFor="color">Monto:</label>
                  <input

                    type="text"
                    className="form-control mb-2"
                    id="Monto"
                    value={monto}
                    onChange={(e) => setMonto(e.target.value)}
                  />
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

      {showModalIngresos && <div className="modal-backdrop show"></div>}
    </div>
  );
};

ModalIngresos.propTypes = {
  showModalIngresos: PropTypes.any.isRequired,
  cerrarModal: PropTypes.any.isRequired,
  ingresoAEditar: PropTypes.any.isRequired
};

export default ModalIngresos;