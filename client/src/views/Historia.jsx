const Historia = () => {
  return (
    <div id="layoutSidenav_content">
      <main>
        <div className="card m-5">
          <div className="card-header">
            <i className="fas fa-tags me-1"></i>
            Historial de Gastos
          </div>
          <div className="card-body">
            <form id="reporteForm" method="post">
              <div className="row d-flex  justify-content-center ">
                <div className="col-sm-3">
                  <div className="mb-2">
                    <label className="form-label">Fecha de Inicio:</label>
                    <input
                      className="form-control"
                      type="date"
                      name="fechainicio"
                      id="inputfechainicio"
                    />
                  </div>
                </div>
                <div className="col-sm-3">
                  <div className="mb-2">
                    <label className="form-label">Fecha de Fin:</label>
                    <input
                      className="form-control"
                      type="date"
                      name="fechafin"
                      id="inputfechafin"
                    />
                  </div>
                </div>
                <div className=" d-flex  justify-content-center">
                  <div className="col-sm-2 m-2 ">
                    <div className="mb-2 d-grid ">
                      <button
                        className="btn btn-primary"
                        id="btnbuscar"
                        type="button"
                      >
                        <i className="fas fa-search"></i>Buscar
                      </button>
                    </div>
                  </div>
                  <div className="col-sm-2 m-2 ">
                    <div className="mb-2 d-grid">
                      <button className="btn btn-success" type="submit">
                        <i className="fas fa-file-excel"></i>Exportar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
            <hr />

            <div className="row justify-content-center p-3 ">
              <table class="table table-striped table-hover table-bordered border-5 ">
                <thead>
                  <tr>
                    <th scope="col">Fecha</th>
                    <th scope="col">Categoria</th>
                    <th scope="col">Precio</th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">1</th>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                  </tr>
                  <tr>
                    <th scope="row">2</th>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>@fat</td>
                  </tr>
                  <tr>
                    <th scope="row">3</th>
                    <td>Larry the Bird</td>
                    <td>Larry the Bird</td>
                    <td>@twitter</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
export default Historia;
