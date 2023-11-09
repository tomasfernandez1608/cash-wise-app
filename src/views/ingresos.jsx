import { useState, useEffect } from "react";
import Loading from "../components/Loading/Loading";
import ModalIngresos from "../components/ModalIngresos";
import ModalCrearIngreso from "../components/ModalCrearIngreso";
const Ingresos = () => {
  const [ingresos, setIngresos] = useState([]);
  const [montoacumulado, setMontoAcumulado] = useState(0);
  const [ingresoAEditar, setIngresoAEditar] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [showModalCrearIngreso, setShowModalCrearIngreso] = useState(false);
  const [loading, setLoading] = useState(true);
  const idusuario = JSON.parse(localStorage.getItem("user")).idusuario;
  const crearIngreso = async () => {
    setShowModalCrearIngreso(true);
  };

  const editarIngreso = async (ingreso) => {
    setIngresoAEditar(ingreso);
    console.log(ingresoAEditar);
    setShowModal(true);
  };

  const cerrarModal = () => {
    setShowModal(false);
  };

  const eliminarIngreso = async (id_ingreso) => {
    try {
      const response = await fetch(
        `http://localhost/serverWiseApp/eliminarIngreso.php`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id_ingreso: id_ingreso }),
        }
      );

      if (response.ok) {
        window.location.reload();
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
        //console.log(response);
        if (response.ok) {
          const data = await response.json();
          setIngresos(data.mensaje);
          //console.log(ingresos);
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
    console.log(montoacumulado);
  }, [idusuario, ingresos]);

  return (
    <main className="container mt-5">
      <div className="card m-5">
        <div className="card-header d-flex align-items-center  ">
            <img
            src="https://firebasestorage.googleapis.com/v0/b/eco-gm.appspot.com/o/Fotos_Producto%2Fbolsa-de-dinero.png?alt=media&token=b468bd7b-66e8-41dd-8830-498a4479a9e8"
              alt=""
              style={{width:100}}
            />
          <h1 className="mx-5">
            Ingresos
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
                  <th scope="col">Fuente</th>
                  <th scope="col">Descripción</th>
                  <th scope="col">Monto</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {ingresos.map((ingreso, index) => (
                  
                  <tr key={index}>
                    <th scope="row">{ingreso.fecha}</th>
                    <td>{ingreso.fuente}</td>
                    <td>{ingreso.descripcion}</td>
                    <td>{ingreso.monto}</td>
                    
                    <td>
                      <div className="d-flex justify-content-center">
                        <button
                          className="btn btn-primary btn-sm btn-editar"
                          onClick={() => editarIngreso(ingreso)}
                        >
                          <i className="fas fa-pen"></i> Editar
                        </button>
                        <button
                          className="btn btn-danger btn-sm ms-2 btn-eliminar"
                          onClick={() => eliminarIngreso(ingreso.id_ingreso)}
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
            <ModalCrearIngreso
              showModalCrearIngreso={showModalCrearIngreso}
              cerrarModal={() => setShowModalCrearIngreso(false)}
            />
          </div>
        )}
      </div>
    </main>
  );
};

export default Ingresos;
