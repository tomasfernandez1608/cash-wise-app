export async function obtenerChatRespuesta() {

    const api_key = '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';
    
    try {
        const res = await fetch('https://api.openai.com/v1/completions', {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${api_key}`,
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo-instruct',
                prompt: 'Dame un ejemplo de programacion aleatoreo en algun lenguaje',
                max_tokens: 10, // cantidad de palabras aprox contestadas
            })
        });
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
          }
          console.log(await res.json());
          // return await res.json();
    } catch (error) {
        console.error('Error fetching data: ', error);
    }

}