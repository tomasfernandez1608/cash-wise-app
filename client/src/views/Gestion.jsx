


const Gestion = () =>{
    const ejecutarFuncionPHP = async (idusuario) => {
    try {
      const response = await fetch('http://localhost/serverWiseApp/obtenerOperacionesUser.php', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id:idusuario
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
      } else {
        setRespuesta('Error al ejecutar la función PHP');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  return (
    <form onSubmit={ejecutarFuncionPHP(1)}>
        <button type="submit">Enviar</button>
    </form>
        

  );
}