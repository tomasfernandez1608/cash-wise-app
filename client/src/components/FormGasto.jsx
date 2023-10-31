

const FormGasto =()=>{
    
    return (
        <div id="layoutSidenav_content">
      <main className=" m-5 ">
        <div className="card mb-3  border border-5  ">
          <div className="row g-0">
            <div className="col-md-4 mt-4">
              <img
                src="https://firebasestorage.googleapis.com/v0/b/eco-gm.appspot.com/o/Fotos_Producto%2Fpresupuesto.png?alt=media&token=0b7d92a3-1172-4556-8f79-8cfcac0eb8bb&_gl=1*s7zmfr*_ga*MjAzOTcxOTU0My4xNjk3MTMwODQ4*_ga_CW55HF8NVT*MTY5ODcwODQ2MS45LjEuMTY5ODcwODQ3Mi40OS4wLjA."
                className="img-fluid rounded-start"
                alt="..."
                style={{width:250, height:250}}
              ></img>
            </div>
            <div className="col-md-8 pt-2 d-flex justify-content-center">
              <div className="card-body">
                <h5 className="card-title">Nuevo consumo</h5>
                <p className="card-text">
                  Complete los datos, para poder guardar su gasto
                </p>
                <div className="card-text">
                  <form>
                    <div className="mb-3">
                      <label  className="form-label">
                        Ingrese el monto
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        id="Monto"
                        aria-describedby="monto"
                        min={1}
                        step="0.01"
                        max={9999999}
                      ></input>
                      <div id="montodesc" className="form-text">
                        Este dato no es visible para otros usuarios
                      </div>
                    </div>
                    <select className="form-select" aria-label="Tipo De Gasto">
                      <option disabled>
                        Seleccione Un Gasto
                      </option>
                    </select>
                    <div className="d-flex justify-content-end">
                      <button type="submit" className="btn btn-primary mt-3">
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
    </div>
    );
}

export default FormGasto