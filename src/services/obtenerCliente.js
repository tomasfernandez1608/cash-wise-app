export async function obtenerCliente(id) {
    try {
        const API_KEY = `http://localhost/serverWiseApp/obtenerCliente.php?id=${id}`;
        const response = await fetch(API_KEY);

        if (!response.ok) {
            throw new Error('No se pudo obtener el cliente');
        }
        const cliente = await response.json();
        return cliente;
    } catch (error) {
        console.error('Error al obtener cliente:', error);
        throw error;
    }
}