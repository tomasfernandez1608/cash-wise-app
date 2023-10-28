import Footer from "../components/Footer";

const Contact = () => {
  return (
    <div id="layoutSidenav_content">

      <main className=" w-75  m-5   ">
        
        <h3>Formulario de Contacto</h3>
        <form  action="tu_script_de_procesamiento.php" method="post">
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
        </main>
    </div>
  );
};

export default Contact;
