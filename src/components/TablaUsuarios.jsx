import { useEffect, useState } from "react";
import { obtenerUsuarios } from "../services/obtenerUsuarios";

const TablaUsuarios = () => {
  const [coins, setCoins] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const options = {
          method: "GET",
          headers: {
            "X-RapidAPI-Key":
              "coinranking3974abc86f3b608df9e6220ee3dafd557dc7793ce4683661",
            "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
          },
        };

        const response = await fetch(
          "https://api.coinranking.com/v2/coins",
          options
        );
        if (response.ok) {
          const result = await response.json();
          setCoins(result.data.coins);
          console.log(coins);
        } else {
          console.error("Error al obtener datos");
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const [Usuarios, setUsuarios] = useState([]);
  useEffect(() => {
    async function cargarUsuarios() {
      try {
        const usuarios = await obtenerUsuarios();
        setUsuarios(usuarios);
      } catch (error) {
        console.log(error);
      }
    }
    cargarUsuarios();
    console.log(Usuarios);
  }, []);

  // Obtiene el índice del primer y último elemento de la página actual
  const itemsPerPage = 5;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  // Obtiene los elementos de la página actual
  const currentItems = Usuarios.slice(indexOfFirstItem, indexOfLastItem);

  // Cambia la página
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Calcula el número total de páginas
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(Usuarios.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const formatMarketCap = (marketCap) => {
    if (marketCap >= 1e12) {
      return (marketCap / 1e12).toFixed(2) + " trillion";
    } else if (marketCap >= 1e9) {
      return (marketCap / 1e9).toFixed(2) + " billion";
    } else if (marketCap >= 1e6) {
      return (marketCap / 1e6).toFixed(2) + " million";
    } else {
      return marketCap.toString();
    }
  };

  return (
    <div>
      <div className="card mb-4 mt-5 ">
        <div className="card-header">
          <i className="fas fa-table me-1"></i>
          Usuarios Registrados.
        </div>
        <div className="card-body">
          <table id="datatablesSimple" className="table">
            <thead>
              <tr>
                <th className="align-middle">Id</th>
                <th className="align-middle">Nombre</th>
                <th className="align-middle">Apellido</th>
                <th className="align-middle">Correo</th>
                <th className="align-middle">Fecha Alta</th>

              </tr>
            </thead>
            <tbody>
              {/* {currentItems.map((coin) => (
                <tr key={coin.uuid}>
                  <td className="align-middle">{coin.rank}</td>
                  <td className="align-middle">
                    <img
                      src={coin.iconUrl}
                      alt={`${coin.name} Icon`}
                      width="24"
                      height="24"
                    />
                    &nbsp;
                    <span className="fw-bold">{coin.name}</span>
                    &nbsp;
                    <span className="fw-light">{coin.symbol}</span>
                  </td>
                  <td className="align-middle">${coin.price}</td>
                  <td className="align-middle">
                    {formatMarketCap(coin.marketCap)}
                  </td>
                </tr>
              ))} */}
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
            {/* Botones de paginación */}
          </table>
          <nav>
            <ul className="pagination justify-content-center">
              {pageNumbers.map((number) => (
                <li key={number} className="page-item">
                  <a
                    onClick={() => paginate(number)}
                    // href="!#"
                    className="page-link"
                  >
                    {number}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default TablaUsuarios;
