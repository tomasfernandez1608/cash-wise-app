import React, { useState } from "react";
import FormGasto from "../components/FormGasto"
const Gestion = () => {
   const [respuesta, setRespuesta] = useState("");
  
//   async function cargarOperaciones() {
//       try {
//         const operaciones = await obtenerOperaciones();
//         setOperaciones(operaciones);
//       } catch (error) {
//         console.log(error);
//       }
//     }
  const ejecutarFuncionPHP = async (idusuario) => {
    try {
      const response = await fetch(
        `http://localhost/serverWiseApp/obtenerOperacionesUser.php?id=${idusuario}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log(data);
      } else {
        setRespuesta("Error al ejecutar la función PHP");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const idusuario = document.getElementById("idusuario").value; // Obtener el valor del campo de entrada
    ejecutarFuncionPHP(idusuario); // Llama a la función con el ID deseado
  };

  return (
        <FormGasto/>
        // <div>
        //     <form onSubmit={handleSubmit}>
        //       <input id="idusuario" type="text" />{" "}
        //       <button type="submit">Enviar</button>
        //     </form>
        //     <p>{respuesta}</p>
        // </div>
  );
};

export default Gestion;
