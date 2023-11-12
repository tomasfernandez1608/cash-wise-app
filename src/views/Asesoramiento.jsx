import { useState, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import { obtenerChatRespuesta } from "../services/ObtenerRespuesta";
import { useMouse } from "../hooks/useMouse";

const Asesoramiento = () => {
  const form = useRef();
  const [pregunta, setPregunta] = useState("");
  const [errorPregunta, setErrorPregunta] = useState(""); //manejo de errores en form

  const handleChange = (e) => {
    setPregunta(e.target.value);
  };

  const [respuesta, setRespuesta] = useState(
    "Por favor solo realice preguntas relacionadas al ambito Economico y Financiero"
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!pregunta.trim()) {
      // Si el campo está vacío, muestra el error y detiene la función
      setErrorPregunta(
        "Este campo debe de completarse para enviar el formulario"
      );
    } else {
      // Si no hay error, limpia el mensaje de error y procede con la lógica de envío
      setErrorPregunta(""); // Limpia el mensaje de error
      showToast();
      setRespuesta("Esperando Respuesta...");

      try {
        const respuestaApi = await obtenerChatRespuesta(pregunta);
        setRespuesta(respuestaApi);
        setPregunta(""); // Limpia la pregunta después de obtener la respuesta
        console.log(respuestaApi);
      } catch (error) {
        console.error("Error al obtener respuesta: ", error);
      }
    }
  };

  const showToast = () => {
    toast.success("Pregunta enviada, espere respuesta!", {
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

  useMouse();

  return (
    <main className="container mt-5">
      <div className="row p-5 border border-5 bg-white">
        <h3>Asesoramiento Financiero</h3>
        <form ref={form} onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="pregunta" className="form-label">
              Pregunta
            </label>
            <input
              type="text"
              className={`form-control ${errorPregunta ? "is-invalid" : ""}`}
              id="pregunta"
              name="pregunta"
              placeholder="Realice su Consulta Aqui"
              value={pregunta}
              onChange={handleChange}
            />
            {errorPregunta && (
              <div className="invalid-feedback d-block">{errorPregunta}</div>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="respuesta" className="form-label">
              Respuesta
            </label>
            <textarea
              className="form-control"
              id="respuesta"
              name="respuesta"
              value={respuesta}
              onChange={handleChange}
              rows="4"
              disabled
            />
          </div>
          <div className="d-flex justify-content-end">
            <button
              type="submit"
              className="btn btn-outline-dark align-items-end"
            >
              Consultar
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

export default Asesoramiento;
