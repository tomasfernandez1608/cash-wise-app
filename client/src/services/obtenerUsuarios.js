export async function obtenerUsuarios() {
    try {
        const API_KEY = 'http://localhost/utn/server/obtenerUsuarios.php';
        const response = await fetch(API_KEY);

        if (!response.ok) {
            throw new Error('No se pudo obtener la lista de usuarios');
        }
        const usuarios = await response.json();
        return usuarios;
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
        throw error;
    }
}