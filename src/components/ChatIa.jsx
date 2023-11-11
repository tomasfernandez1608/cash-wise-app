import { useState } from 'react';
import { obtenerChatRespuesta } from '../services/ObtenerRespuesta';

export const ChatIa = () => {
  const [respuesta, setRespuesta] = useState('');

  const pregunta = 'cuales son las mejores manera de ahorrar?';

  const obtenerRespuesta = async () => {
    try {
      const respuesta = await obtenerChatRespuesta(pregunta);
      setRespuesta(respuesta);
      console.log(respuesta);
    } catch (error) {
      console.error('Error al obtener respuesta: ', error);
    }
  };

  return (
    <>
      <button onClick={obtenerRespuesta}>Obtener Respuesta</button>
      {respuesta && <p>Respuesta: {respuesta}</p>}
    </>
  );
};