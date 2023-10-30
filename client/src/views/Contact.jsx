import Footer from "../components/Footer";

const Contact = () => {
  return (
    <div id="layoutSidenav_content">
      <main className=" w-75  m-5  pt-4   ">
        <div className="row">
          <div class="card mb-3">
            <div class="row g-0">
              <div class="col-md-4">
                <img
                  src="https://thumbs.dreamstime.com/z/lista-del-contacto-32953587.jpg?w=768"
                  class="img-fluid rounded-circle "
                  style={{width:250}}
                  alt="..."
                ></img>
              </div>
              <div class="col-md-8  ">
                <div class="card-body ">
                  <h5 class="card-title fw-bold  font-monospace ">Contacto</h5>
                  <p class="card-text"> 
                    <ul class="list-group list-group-flush">
                    <li class="list-group-item"></li> 
                      <li class="list-group-item">
                        <img
                          src="https://firebasestorage.googleapis.com/v0/b/eco-gm.appspot.com/o/Fotos_Producto%2Fenviar-correo.png?alt=media&token=92eba718-d5bb-48e6-8c0b-8550fff56dfd&_gl=1*113xgai*_ga*MjAzOTcxOTU0My4xNjk3MTMwODQ4*_ga_CW55HF8NVT*MTY5ODY3MTE5MS44LjEuMTY5ODY3MTIyNS4yNi4wLjA."
                          alt="Correo"
                          style={{width:40}}
                        ></img>
                        <a  className=" m-lg-4 " href="mailto:cashwiseapp@contacto.com">
                          cashwiseapp@contacto.com
                        </a>
                      </li>
                      <li class="list-group-item">
                        <img
                          src="https://firebasestorage.googleapis.com/v0/b/eco-gm.appspot.com/o/Fotos_Producto%2Fllamada-telefonica.png?alt=media&token=6d733e04-3085-4f18-b481-5b0451d6778f&_gl=1*n8qe60*_ga*MjAzOTcxOTU0My4xNjk3MTMwODQ4*_ga_CW55HF8NVT*MTY5ODY3MTE5MS44LjEuMTY5ODY3MTU3Ni4zOC4wLjA."
                          alt="Telefono"
                          style={{width:40}}
                        ></img>
                        <span  className=" m-lg-4 " href="">
                          +54 9 11 5584 7541
                        </span>
                      </li>
                      <li class="list-group-item">
                      <img
                          src="https://firebasestorage.googleapis.com/v0/b/eco-gm.appspot.com/o/Fotos_Producto%2Fmaps-and-location.png?alt=media&token=36a82119-fbc9-4e7d-9609-fc18c167fe19&_gl=1*qxwh8u*_ga*MjAzOTcxOTU0My4xNjk3MTMwODQ4*_ga_CW55HF8NVT*MTY5ODY3MTE5MS44LjEuMTY5ODY3MTczNy41My4wLjA."
                          alt="Ubicacion"
                          style={{width:40}}
                        ></img>
                        <a  className=" m-lg-4 " href="https://maps.app.goo.gl/yziqL2rw4GAjTfJM9">París 532, Buenos Aires </a>
                      </li>
                    </ul>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row p-5 border  border-5 ">
          <h3>Formulario de Contacto</h3>
          <form action="tu_script_de_procesamiento.php" method="post">
            <div className="row">
              <div className=" col-6 ">
                <div className="mb-3">
                  <label for="nombre" className="form-label">
                    Nombre
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="nombre"
                    name="nombre"
                    required
                  ></input>
                </div>
              </div>
              <div className=" col-6 ">
                <div className="mb-3">
                  <label for="Apellido" className="form-label">
                    Apellido
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="Apellido"
                    name="Apellido"
                    required
                  ></input>
                </div>
              </div>
            </div>
            <div className="mb-3">
              <label for="email" className="form-label">
                Correo Electrónico
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                required
              ></input>
            </div>
            <div className="mb-3">
              <label for="mensaje" className="form-label">
                Mensaje
              </label>
              <textarea
                className="form-control"
                id="mensaje"
                name="mensaje"
                rows="4"
                required
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary align-items-end ">
              Enviar
            </button>
          </form>
        </div>
      </main>
      <Footer/>
    </div>
    
  );
};

export default Contact;
