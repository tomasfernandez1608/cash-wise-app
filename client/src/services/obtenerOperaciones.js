export async function obtenerOperaciones(id) {
    try {

        const API_KEY = `http://localhost/serverWiseApp/obtenerOperaciones.php?id=${id}`;
        const response = await fetch(API_KEY);

        if (!response.ok) {
            throw new Error('No se pudo obtener la lista de operaciones');
        }
        const operaciones = await response.json();
        return operaciones;
    } catch (error) {
        console.error('Error al obtener operaciones:', error);
        throw error;
    }
}