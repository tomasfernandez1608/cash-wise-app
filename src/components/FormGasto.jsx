import { useEffect, useState } from "react";
import { obtenerTipoDeGasto } from "../services/obtenerTipoDeGasto";

const FormGasto = () => {

  const [tipoDeGasto, setTipoDeGasto] = useState([]);

  console.log(tipoDeGasto);

  useEffect(() => {

    async function cargarTipoDeGasto() {
      try {
        const tipoDeGasto = await obtenerTipoDeGasto();
        setTipoDeGasto(tipoDeGasto);
      } catch (error) {
        console.log(error);
      }
    }

    cargarTipoDeGasto();
  }, []);

  const handleSend = (e) => {
    e.preventDefault();

    // Crea una instancia de FormData con el evento actual del formulario
    const formData = new FormData(e.target);

    // Obtén los valores de los campos 'monto' y 'tipo_de_gasto'
    const monto = formData.get('monto');
    const tipoDeGasto = formData.get('tipo_de_gasto');

    // Muestra los valores en consola
    console.log({ monto, tipoDeGasto });
  }

  return (
      <main>
        <div className="card border border-5  ">
          <div className=" row">
            <div className=" col-xl-5  mt-4">
              <img
                src="https://firebasestorage.googleapis.com/v0/b/eco-gm.appspot.com/o/Fotos_Producto%2Fpresupuesto.png?alt=media&token=0b7d92a3-1172-4556-8f79-8cfcac0eb8bb&_gl=1*s7zmfr*_ga*MjAzOTcxOTU0My4xNjk3MTMwODQ4*_ga_CW55HF8NVT*MTY5ODcwODQ2MS45LjEuMTY5ODcwODQ3Mi40OS4wLjA."
                className="img-fluid rounded-start"
                alt="..."
                style={{ width: 200, height: 200 }}
              ></img>
            </div>
            <div className="col-xl-7 d-flex justify-content-center">
              <div className="card-body">
                <h5 className="card-title">Nuevo consumo</h5>
                <p className="card-text">
                  Complete los datos, para poder guardar su gasto
                </p>
                <div className="card-text">
                  <form onSubmit={handleSend}>
                    <div className="mb-3">
                      <label className="form-label">Ingrese el monto</label>
                      <input
                        type="number"
                        className="form-control"
                        id="monto"
                        name="monto"
                        aria-describedby="monto"
                        min={1}
                        step="0.01"
                        max={9999999}
                        required
                      ></input>
                      <div id="montodesc" className="form-text">
                        Este dato no es visible para otros usuarios
                      </div>
                    </div>
                    <select
                      id="tipo_de_gasto"
                      name="tipo_de_gasto"
                      className="form-select"
                      aria-label="Tipo De Gasto"
                      defaultValue=""
                    >
                      <option disabled value="">Seleccione un gasto</option>

                      { tipoDeGasto.map((gasto, index) => (
                        <option key={index} value={gasto.id_gasto}>
                          {gasto.descripcion}
                        </option>
                      )) }
                      
                    </select>
                    <div className="d-flex justify-content-end">
                      <button
                        // type="submit" 
                        className="btn btn-primary mt-3"
                        // onClick={handleSend}
                      >
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    
  );
};

export default FormGasto;
