import { useEffect, useState } from "react";
import { obtenerUsuarios } from "../services/obtenerUsuarios";
import Loading from "./Loading/Loading";

const TablaUsuarios = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);

  const bloquearUsuario = async (idusuario) => {
    const data = {
      idusuario:idusuario,
      estado:'0'
    };
    console.log(data);
    try {
      const response = await fetch(
        "http://localhost/serverWiseApp/setEstado.php",
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
        const data = await response.json();
        if (data.mensaje == "true") {
          setTimeout(() => {
            window.location.reload();
          }, 1300);
        } else {
          console.log(data.mensaje);
        }
      } else {
        console.error("Error en la solicitud al servidor.");
      }
    } catch (error) {
      console.error("Error en la solicitud al servidor:", error);
    }
  };

  const habilitarUsuario = async (idusuario) => {
    const data = {
      idusuario:idusuario,
      estado:'1'
    };
    console.log(data);
    try {
      const response = await fetch(
        "http://localhost/serverWiseApp/setEstado.php",
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
          setTimeout(() => {
            window.location.reload();
          }, 1300);
        } else {
          console.log(data.mensaje);
        }
      } else {
        console.error("Error en la solicitud al servidor.");
      }
    } catch (error) {
      console.error("Error en la solicitud al servidor:", error);
    }
  };

  useEffect(() => {
    async function cargarUsuarios() {
      try {
        const usuarios = await obtenerUsuarios();
        setUsuarios(usuarios);
        console.log(usuarios);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    cargarUsuarios();
  }, []);

  const itemsPerPage = 10;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentItems = usuarios.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(usuarios.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      <div className="card m-5">
        <div className="card-header">
          <h1 className="text-start">
            <i className="fas fa-table me-1"></i> Usuarios registrados
          </h1>
        </div>
        {loading ? (
          <Loading />
        ) : (
          <div className="card-body">
            <table id="datatablesSimple" className="table">
              <thead>
                <tr>
                  <th className="align-middle">ID</th>
                  <th className="align-middle">Nombre</th>
                  <th className="align-middle">Apellido</th>
                  <th className="align-middle">Correo</th>
                  <th className="align-middle">Fecha alta</th>
                  <th className="align-middle">Estado</th>
                  <th className="align-middle"></th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((user) => (
                  <tr key={user.idusuario}>
                    <td className="align-middle">{user.idusuario}</td>
                    <td className="align-middle">{user.nombre}</td>
                    <td className="align-middle">{user.apellido}</td>
                    <td className="align-middle">{user.correo}</td>
                    <td className="align-middle">{user.fecharegistro}</td>
                    <td className="align-middle">
                      {user.estado == 1 ? "Activo" : "No Activo"}
                    </td>
                    <td>
                      <div className="d-flex justify-content-center ">
                        <button
                          className="btn btn-primary btn-sm ms-2 btn-bloquear"
                          onClick={() => habilitarUsuario(user.idusuario)}
                        >
                          <i className="fa-solid fa-lock-open"></i>
                        </button>
                        <button
                          className="btn btn-danger btn-sm ms-2 btn-bloquear"
                          onClick={() => bloquearUsuario(user.idusuario)}
                        >
                          <i className="fa-solid fa-lock"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <nav>
              <ul className="pagination justify-content-center">
                {pageNumbers.map((number) => (
                  <li key={number} className="page-item">
                    <a onClick={() => paginate(number)} className="page-link">
                      {number}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        )}
      </div>
    </div>
  );
};

export default TablaUsuarios;
