import Footer from "../components/Footer";

const Contact = () => {
  return (
    <div id="layoutSidenav_content">

      <main className=" w-75  m-5   ">
        
        <h3>Formulario de Contacto</h3>
        <form  action="tu_script_de_procesamiento.php" method="post">
          <div className="row">
            <div className=" col-6 ">
                <div class="mb-3">
                  <label for="nombre" class="form-label">
                    Nombre
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="nombre"
                    name="nombre"
                    required
                  ></input>
                </div>
            </div>
            <div className=" col-6 ">
              <div class="mb-3">
                <label for="Apellido" class="form-label">
                Apellido
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="Apellido"
                  name="Apellido"
                  required
                ></input>
              </div>

            </div>
          </div>
          <div class="mb-3">
            <label for="email" class="form-label">
              Correo Electrónico
            </label>
            <input
              type="email"
              class="form-control"
              id="email"
              name="email"
              required
            ></input>
          </div>
          <div class="mb-3">
            <label for="mensaje" class="form-label">
              Mensaje
            </label>
            <textarea
              class="form-control"
              id="mensaje"
              name="mensaje"
              rows="4"
              required
            ></textarea>
          </div>
          <button type="submit" class="btn btn-primary align-items-end ">
            Enviar
          </button>
        </form>
        </main>
    </div>
  );
};

export default Contact;
