import { Link } from 'react-router-dom';

export const Password = () => {
  return (
    <>
      <main >
        <div className="container pt-4" >
          <div className="row justify-content-center align-content-center">
            <div className="col-lg-6">
              <div className="card border border-5 rounded-lg mt-5">
                <div className="card-header">
                  <h3 className="text-center font-weight-light my-4">
                    Restauración de contraseña
                  </h3>
                </div>
                <div className="card-body">
                  <div className="small mb-3">
                    Ingrese su email para restaurar su contraseña
                  </div>
                  <form>
                    <div className="form-floating mb-3 text-black ">
                      <input
                        className="form-control"
                        id="inputEmail"
                        type="email"
                        placeholder="name@example.com"
                      />
                      <label htmlFor="inputEmail">Email address</label>
                    </div>
                    <div className="d-flex align-items-center justify-content-between mt-4 mb-0">
                      <Link className="small" to={'/login'}>
                        Regresar al login
                      </Link>
                      <a className="btn btn-dark" href="login.html">
                        Restaurar contraseña
                      </a>
                    </div>
                  </form>
                </div>
                <div className="card-footer text-center py-3 text-white">
                  <div>
                    <Link to={'/registro'}>¿Necesita una cuenta? ¡Registrese!</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};
