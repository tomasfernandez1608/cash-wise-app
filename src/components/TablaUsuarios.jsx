import { useEffect, useState } from "react";
import { obtenerUsuarios } from "../services/obtenerUsuarios";
import Loading from './Loading/Loading';

const TablaUsuarios = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function cargarUsuarios() {
      try {
        const usuarios = await obtenerUsuarios();
        setUsuarios(usuarios);
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
          <h1 className="text-start"><i className="fas fa-table me-1"></i> Usuarios registrados</h1>
        </div>
        {loading ? <Loading /> : (
          <div className="card-body">
            <table id="datatablesSimple" className="table">
              <thead>
                <tr>
                  <th className="align-middle">ID</th>
                  <th className="align-middle">Nombre</th>
                  <th className="align-middle">Apellido</th>
                  <th className="align-middle">Correo</th>
                  <th className="align-middle">Fecha alta</th>
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
                  </tr>
                ))}
              </tbody>

            </table>
            <nav>
              <ul className="pagination justify-content-center">
                {pageNumbers.map((number) => (
                  <li key={number} className="page-item">
                    <a
                      onClick={() => paginate(number)}
                      className="page-link"
                    >
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
