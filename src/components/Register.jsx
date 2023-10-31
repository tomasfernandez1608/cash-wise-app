import { useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from "./Footer";

const Register = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    correo: '',
    clave: '',
    sueldomensual: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // Realizar la solicitud POST con fetch
    fetch('http://localhost/serverWiseApp/registrarUsuario.php', {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // Manejar la respuesta del servidor, por ejemplo, mostrar un mensaje de éxito
        console.log(data);
      })
      .catch((error) => {
        // Manejar errores
        console.error(error);
      });
  };

  return (
    <>
      <div id="layoutAuthentication">
        <div id="layoutAuthentication_content">
          <main>
            <div className="container bg-secundary pt-4 ">
              <div className="row justify-content-center">
                <div className="col-lg-7">
                  <div className="card shadow-lg border-0 rounded-lg mt-5 text-white bg-dark ">
                    <div className="card-header">
                      <h3 className="text-center font-weight-light my-4">
                        Crear cuenta
                      </h3>
                    </div>
                    <div className="card-body">
                      <form onSubmit={handleSubmit}>
                        <div className="row mb-3">
                          <div className="col-md-6">
                            <div className="form-floating text-black mb-3 mb-md-0">
                              <input
                                className="form-control"
                                id="nombre"
                                type="text"
                                placeholder="Ingrese su nombre"
                                name="nombre"
                                value={formData.nombre}
                                onChange={handleChange}
                              />
                              <label htmlFor="inputNombre">
                                Ingrese su nombre
                              </label>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-floating text-black">
                              <input
                                className="form-control"
                                id="apellido"
                                type="text"
                                placeholder="Ingrese su apellido"
                                name="apellido"
                                value={formData.apellido}
                                onChange={handleChange}
                              />
                              <label htmlFor="inputApellido">
                                Ingrese su apellido
                              </label>
                            </div>
                          </div>
                        </div>
                        <div className="row mb-3">
                          <div className="col-md-12">
                            <div className="form-floating text-black">
                              <input
                                className="form-control"
                                id="sueldomensual"
                                type="text"
                                placeholder="Ingrese su sueldo mensual"
                                name="sueldomensual"
                                value={formData.sueldomensual}
                                onChange={handleChange}
                              />
                              <label htmlFor="inputSueldo">
                                Ingrese su sueldo mensual
                              </label>
                            </div>
                          </div>
                        </div>
                        <div className="row mb-3">
                          <div className="col-md-6">
                            <div className="form-floating mb-3 mb-md-0 text-black">
                              <input
                                className="form-control"
                                id="correo"
                                type="email"
                                placeholder="name@example.com"
                                name="correo"
                                value={formData.correo}
                                onChange={handleChange}
                              />
                              <label htmlFor="inputEmail">Email</label>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-floating mb-3 mb-md-0 text-black">
                              <input
                                className="form-control"
                                id="clave"
                                type="password"
                                name="clave"
                                value={formData.clave}
                                onChange={handleChange}
                              />
                              <label htmlFor="inputPassword">Contraseña</label>
                            </div>
                          </div>
                        </div>
                        <div className="mt-4 mb-0">
                          <div className="d-grid">
                            <button
                              className="btn btn-secondary btn-block"
                            >
                              Crear cuenta
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                    <div className="card-footer text-center py-3">
                      <div className="small">
                        <Link to="/">¿Tienes una cuenta? Click aquí para iniciar sesión.</Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Register;
