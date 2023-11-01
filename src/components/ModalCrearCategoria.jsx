import { useEffect, useState } from "react";
import PropTypes from 'prop-types';

const ModalCrearCategoria  = ({ showModalCrearCategoria , cerrarModal}) => {
  const [descripcion, setdescripcion] = useState("");
  const [color, setColor] = useState('');


  const handleEditar = async () => {
    const data = {
      descripcion: descripcion,
      color: color,
    };
    console.log(data);
    try {
      const response = await fetch("http://localhost/serverWiseApp/registrarTipoGasto.php", {
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
      {showModalCrearCategoria  && (
        <div className="modal" tabIndex="-1" role="dialog" style={{ display: "block" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Crear Categoria</h5>
                <button type="button" className="btn-close" onClick={cerrarModal}></button>
              </div>
              <div className="modal-body">
                <div className="form-group m-2">
                  <label className="mb-2 "   htmlFor="descripcion">Descripcion:</label>
                  <input
                    type="text"
                    className="form-control mb-2"
                    id="descripcion"
                    value={descripcion}
                    onChange={(e) => setdescripcion(e.target.value)}
                  />
                </div>
                <div className="form-group m-2">
                  <label className="mb-2 " htmlFor="color">Color:</label>
                  <input
                    
                    type="color"
                    className="form-control mb-2"
                    id="color"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
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

      {showModalCrearCategoria  && <div className="modal-backdrop show"></div>}
    </div>
  );
};

ModalCrearCategoria.propTypes = {
  showModalCrearCategoria: PropTypes.any.isRequired,
  cerrarModal: PropTypes.any.isRequired,
};

export default ModalCrearCategoria ;