export async function obtenerOperaciones() {
    try {
        
        const API_KEY = 'http://localhost/server/obtenerOperaciones.php';
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