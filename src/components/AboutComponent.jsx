const AboutComponent = () => {
  return (
    <>
      <main className="bg-white">
        <div className="row">
          <div className="col-12 d-flex justify-content-center ">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/eco-gm.appspot.com/o/Fotos_Producto%2F2.jpg?alt=media&token=5d91ce71-5ef1-479e-8cf2-6d20522048b0&_gl=1*x46w8k*_ga*MjAzOTcxOTU0My4xNjk3MTMwODQ4*_ga_CW55HF8NVT*MTY5ODUwMjc0Mi42LjEuMTY5ODUwMjc3NC4yOC4wLjA."
              className="card-img-top  w-auto h-auto mx-5"
              alt="..."
            ></img>
            <div className="card m-2 text-white bg-dark ">
              <div className="card-body">
                <h5 className="card-title">Acerca de Cashwise App</h5>
                <p className="card-text">
                  Bienvenidos a Cashwise App, donde creemos que el control
                  financiero es la base para una vida más segura y próspera.
                  Nuestra pasión por la gestión inteligente de gastos nos llevó
                  a desarrollar, una solución innovadora que pone el control de
                  tus finanzas en tus manos.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className=" col-12 d-flex  justify-content-center  align-content-center  ">
            <div className=""></div>
            <div className="card m-5 text-white bg-dark ">
              <div className="card-body">
                <h5 className="card-title">¿Quienes somos?</h5>
                <p className="card-text">
                  Somos un equipo de expertos en tecnología y finanzas
                  comprometidos en brindarte las herramientas necesarias para
                  tomar el control de tus gastos de manera efectiva. Con años de
                  experiencia en desarrollo de software y una profunda
                  comprensión de las necesidades financieras de las personas,
                  creamos Cashwise App con un enfoque claro: simplificar la
                  gestión de tus finanzas personales y empresariales.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default AboutComponent;
