import React, { useState } from 'react';
import { obtenerChatRespuesta } from '../services/ObtenerRespuesta';

export const ChatIa = () => {
  const [respuesta, setRespuesta] = useState('');

  const pregunta = 'Hola como estas?'

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
      <h4>Hola</h4>
      <button onClick={obtenerRespuesta}>Obtener Respuesta</button>
      {respuesta && <p>Respuesta: {respuesta}</p>}
    </>
  );
};