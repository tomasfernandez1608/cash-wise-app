import { useState, useRef } from "react";
import emailjs from "emailjs-com";
import { ToastContainer, toast } from 'react-toastify';

const Contacto = () => {
  const form = useRef();
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    correo: "",
    mensaje: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const showToast = () => {
    toast.success('Enviado con exito!', {
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

    emailjs.sendForm(
      "service_a1rez4z",
      "template_ij2x9mh",
      form.current,
      "NlnaJRXKBiPjReTVN"
    )

    setTimeout(() => {
      e.target.reset(),
        setFormData({
          nombre: "",
          apellido: "",
          correo: "",
          mensaje: "",
        })
    }, 1000);

    fetch("http://localhost/serverWiseApp/registrarContacto.php", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });

    showToast();
  };

  return (
    <main className="container mt-5">
      <div className="row">
        <div className="card mb-3 p-2 border border-5">
          <div className="row g-0">
            <div className="col-md-4">
              <img
                src="https://thumbs.dreamstime.com/z/lista-del-contacto-32953587.jpg?w=768"
                className="img-fluid rounded-circle "
                style={{ width: 250 }}
                alt="..."
              ></img>
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h1 className="card-title">Contacto</h1>
                <div className="card-text">
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item"></li>
                    <li className="list-group-item">
                      <img
                        src="https://firebasestorage.googleapis.com/v0/b/eco-gm.appspot.com/o/Fotos_Producto%2Fenviar-correo.png?alt=media&token=92eba718-d5bb-48e6-8c0b-8550fff56dfd&_gl=1*113xgai*_ga*MjAzOTcxOTU0My4xNjk3MTMwODQ4*_ga_CW55HF8NVT*MTY5ODY3MTE5MS44LjEuMTY5ODY3MTIyNS4yNi4wLjA."
                        alt="Correo"
                        style={{ width: 40 }}
                      ></img>
                      <a
                        className=" m-lg-4 "
                        href="mailto:cashwiseapp@contacto.com"
                      >
                        cashwiseapp@contacto.com
                      </a>
                    </li>
                    <li className="list-group-item">
                      <img
                        src="https://firebasestorage.googleapis.com/v0/b/eco-gm.appspot.com/o/Fotos_Producto%2Fllamada-telefonica.png?alt=media&token=6d733e04-3085-4f18-b481-5b0451d6778f&_gl=1*n8qe60*_ga*MjAzOTcxOTU0My4xNjk3MTMwODQ4*_ga_CW55HF8NVT*MTY5ODY3MTE5MS44LjEuMTY5ODY3MTU3Ni4zOC4wLjA."
                        alt="Telefono"
                        style={{ width: 40 }}
                      ></img>
                      <span className=" m-lg-4 " href="">
                        +54 9 11 5584 7541
                      </span>
                    </li>
                    <li className="list-group-item">
                      <img
                        src="https://firebasestorage.googleapis.com/v0/b/eco-gm.appspot.com/o/Fotos_Producto%2Fmaps-and-location.png?alt=media&token=36a82119-fbc9-4e7d-9609-fc18c167fe19&_gl=1*qxwh8u*_ga*MjAzOTcxOTU0My4xNjk3MTMwODQ4*_ga_CW55HF8NVT*MTY5ODY3MTE5MS44LjEuMTY5ODY3MTczNy41My4wLjA."
                        alt="Ubicacion"
                        style={{ width: 40 }}
                      ></img>
                      <a
                        className=" m-lg-4 "
                        href="https://maps.app.goo.gl/yziqL2rw4GAjTfJM9"
                      >
                        París 532, Buenos Aires
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row p-5 border border-5 bg-white">
        <h3>Formulario de contacto</h3>
        <form ref={form} onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-6">
              <div className="mb-3">
                <label htmlFor="nombre" className="form-label">
                  Nombre
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="nombre"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="col-6">
              <div className="mb-3">
                <label htmlFor="apellido" className="form-label">
                  Apellido
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="apellido"
                  name="apellido"
                  value={formData.apellido}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="correo" className="form-label">
              Correo electrónico
            </label>
            <input
              type="email"
              className="form-control"
              id="correo"
              name="correo"
              value={formData.correo}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="mensaje" className="form-label">
              Mensaje
            </label>
            <textarea
              className="form-control"
              id="mensaje"
              name="mensaje"
              value={formData.mensaje}
              onChange={handleChange}
              rows="4"
              required
            />
          </div>
          <div className="d-flex justify-content-end">
            <button
              type="submit"
              className="btn btn-outline-dark align-items-end"
            >
              Enviar
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
        </form>
      </div>
    </main>
  );
};

export default Contacto;
