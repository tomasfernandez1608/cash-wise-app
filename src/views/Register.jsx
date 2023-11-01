import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

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

  const showToast = () => {
    toast.success('Usuario registrado exitosamente!', {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('http://localhost/serverWiseApp/registrarUsuario.php', {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setTimeout(() => {
          window.location.href = '/';
        }, 1200);
      })
      .catch((error) => {
        console.error(error);
      });

    showToast();
  };

  return (
    <main className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-lg-7">
          <div className="card border border-5 rounded-sm mt-5">
            <div className="card-header">
              <h1 className="text-center font-weight-light my-4">
                Crear cuenta
              </h1>
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
                        required
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
                        required
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
                        required
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
                        required
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
                        required
                      />
                      <label htmlFor="inputPassword">Contraseña</label>
                    </div>
                  </div>
                </div>
                <div className="mt-4 mb-0">
                  <div className="d-grid">
                    <button className="btn btn-secondary btn-dark">
                      Crear cuenta
                    </button>
                    <ToastContainer
                      position="top-right"
                      autoClose={3000}
                      hideProgressBar={false}
                      newestOnTop={false}
                      closeOnClick
                      rtl={false}
                      pauseOnFocusLoss
                      draggable
                      pauseOnHover
                      theme="light"
                    />
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
    </main>
  );
};

export default Register;
