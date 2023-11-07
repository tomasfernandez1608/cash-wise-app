export async function obtenerChatRespuesta(consultaAlChat) {
  const api_key = "";

  const url = "https://api.openai.com/v1/completions"
  
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + api_key,
        // `Bearer ${api_key}`
      },
      body: JSON.stringify({
        model: "text-davinci-003",
        prompt: `${consultaAlChat}, Dame un ejemplo de lenguajes de programacion para desarrollo web`,
        max_tokens: 7, // cantidad de palabras aprox contestadas
        temperature: 0,
      }),
    });
    // if (res.status === 429) {
    //     // Si obtienes el error 429, espera durante un tiempo y luego realiza la solicitud nuevamente.
    //     await new Promise((resolve) => setTimeout(resolve, 5000)); // Espera 1 segundo
    //     return obtenerChatRespuesta(consultaAlChat); // Llama a la función nuevamente con la misma consulta
    //   }
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error fetching data: ", error);
  }
}
