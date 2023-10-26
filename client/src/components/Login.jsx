export const Login = () => {
  return (
    <>
      <div >
        <div id="layoutAuthentication_content">
          <main>
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-lg-12">
                  <div className="card shadow-lg border-0 rounded-lg mt-1">
                    <div className="card-header">
                      <h4 className="text-center font-weight-light my-1">
                        Para acceder a las funciones del sitio, debes iniciar sesión o registrarte.
                      </h4>
                    </div>
                    <div className="card-body">
                      <h5 className="text-left font-weight-light my-1">
                        Acceso
                      </h5>
                      <form>
                        <div className="form-floating mb-1">
                          <input
                            className="form-control"
                            id="inputEmail"
                            type="email"
                            placeholder="name@example.com"
                          />
                          <label htmlFor="inputEmail">Email</label>
                        </div>
                        <div className="form-floating mb-3">
                          <input
                            className="form-control"
                            id="inputPassword"
                            type="password"
                            placeholder="Password"
                          />
                          <label htmlFor="inputPassword">Contraseña</label>
                        </div>
                        <div className="form-floating mb-1">
                          <button className="btn btn-primary btn-login" href="index.html">
                            Iniciar sesión
                          </button>
                        </div>
                        <div className="d-flex align-items-center justify-content-between mt-4 mb-0">
                          <a className="small" href="password.html">
                            ¿Olvidó su contraseña?
                          </a>
                          <div className="form-check mb-3">
                            <input
                              className="form-check-input"
                              id="inputRememberPassword"
                              type="checkbox"
                              value=""
                            />
                            <label
                              className="form-check-label"
                              htmlFor="inputRememberPassword"
                            >
                              Recordar contraseña
                            </label>
                          </div>
                        </div>
                      </form>
                    </div>
                    <div className="card-footer text-center py-3">
                      <div>
                        <a href="register.html">¿Necesita una cuenta? ¡Registrese!</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
        {/* <div id="layoutAuthentication_footer">
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
        </div> */}
      </div>
    </>
  );
};
