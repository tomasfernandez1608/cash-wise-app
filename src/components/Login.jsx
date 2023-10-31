import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { obtenerUsuarios } from '../services/obtenerUsuarios';
import { obtenerUsuario } from '../services/obtenerUsuario';
import { MD5 } from 'crypto-js';

export const Login = () => {
  const [usuario, setUsuario] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [usuarios, setUsuarios] = useState([]);
  const [respuesta, setRespuesta] = useState('');

  function verificarInicioSesion(correoIngresado, contrasenaIngresada) {
    const usuarioLogueado = usuarios.find((usuario) => {
      return usuario.correo === correoIngresado && usuario.clave === MD5(contrasenaIngresada).toString();
    });

    return usuarioLogueado || null;
  }

  const ejecutarFuncionPHP = async () => {
    try {
      const response = await fetch('http://localhost/serverWiseApp/inicioSesion.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("sessionId", JSON.stringify(data));
        const usuarioEntero = await obtenerUsuario(usuario)
        localStorage.setItem("user", JSON.stringify(usuarioEntero));
        window.location.reload();
      } else {
        console.log('Error al ejecutar la función PHP');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

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
  }, []);

  const handleInicioSesion = (e) => {
    e.preventDefault();

    const usuarioLogueado = verificarInicioSesion(usuario, contrasena);

    if (usuarioLogueado) {
      ejecutarFuncionPHP();
    } else {
      setRespuesta('Inicio de sesión fallido. Correo o contraseña incorrectos.');
    }
  };

  return (
    <>
      <div>
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
                      <form onSubmit={handleInicioSesion}>
                        <div className="form-floating mb-1">
                          <input
                            className="form-control"
                            id="inputEmail"
                            type="email"
                            placeholder="name@example.com"
                            name='login'
                            value={usuario}
                            onChange={(e) => setUsuario(e.target.value)}
                          />
                          <label htmlFor="inputEmail">Email</label>
                        </div>
                        <div className="form-floating mb-3">
                          <input
                            className="form-control"
                            id="inputPassword"
                            type="password"
                            placeholder="Password"
                            name='password'
                            value={contrasena}
                            onChange={(e) => setContrasena(e.target.value)}
                          />
                          <label htmlFor="inputPassword">Contraseña</label>
                        </div>
                        <div className="form-floating mb-1">
                          <button type='submit' className="btn btn-primary btn-login" id='ingresar'>
                            Iniciar sesión
                          </button>
                        </div>
                        {
                          respuesta != '' ? (
                            <>
                              <h3 className="red-text">{respuesta}</h3>
                            </>
                          ) : (
                            null
                          )
                        }
                        <div>
                        </div>
                        <div className="d-flex align-items-center justify-content-end mt-4 mb-0">
                          <Link className="small" to="/OlvidoContrasena">
                            ¿Olvidó su contraseña?
                          </Link>
                        </div>
                      </form>
                    </div>
                    <div className="card-footer text-center py-3">
                      <div>
                        <Link to="/registro">¿Necesita una cuenta? ¡Registrese!</Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};