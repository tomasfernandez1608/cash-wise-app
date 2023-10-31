import { Link } from 'react-router-dom';

export const Password = () => {
  return (
    <>
    <div id="layoutSidenav_content">
      <div id="layoutAuthentication"  >
        <div id="layoutAuthentication_content">
          <main >
            <div className="container pt-4" >
              <div className="row justify-content-center align-content-center">
                <div className="col-lg-6"> {/* Ajusta estas clases de columnas según tus necesidades */}
                  <div className="card shadow-lg border-0 rounded-lg mt-5 text-white bg-dark">
                    <div className="card-header text-white">
                      <h3 className="text-center font-weight-light my-4">
                        Restauración de contraseña
                      </h3>
                    </div>
                    <div className="card-body text-white ">
                      <div className="small mb-3  ">
                        Ingrese su Email para restaurar su contraseña
                      </div>
                      <form>
                        <div className="form-floating mb-3  text-black ">
                          <input
                            className="form-control"
                            id="inputEmail"
                            type="email"
                            placeholder="name@example.com"
                          />
                          <label htmlFor="inputEmail">Email address</label>
                        </div>
                        <div className="d-flex align-items-center justify-content-between mt-4 mb-0">
                          <Link className="small" to={'/'}>
                            Regresar al Login
                          </Link>
                          <a className="btn btn-primary" href="login.html">
                            Restaurar Contraseña
                          </a>
                        </div>
                      </form>
                    </div>
                    <div className="card-footer text-center py-3 text-white">
                      <div className="small">
                        <Link to={'/registro'}>¿Necesita una cuenta? ¡Registrese!</Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
        <div id="layoutAuthentication_footer">
          <footer className="py-4 bg-light mt-auto">
            <div className="container-fluid px-4">
              <div className="d-flex align-items-center justify-content-between small">
                <div className="text-muted">
                  Copyright &copy; Your Website 2023
                </div>
                <div>
                  <a href="#">Privacy Policy</a>
                  &middot;
                  <a href="#">Terms &amp; Conditions</a>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
    </>
  );
};
