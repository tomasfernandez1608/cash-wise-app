export async function obtenerTipoDeGasto() {
    try {

        const API_KEY = 'http://localhost/serverWiseApp/obtenerTipoDeGasto.php';
        const response = await fetch(API_KEY);

        if (!response.ok) {
            throw new Error('No se pudo obtener la lista de tipos de gasto');
        }
        const tipoDeGasto = await response.json();
        return tipoDeGasto;
    } catch (error) {
        console.error('Error al obtener los tipos de gasto:', error);
        throw error;
    }
}