export async function obtenerUsuario(correo) {
    try {
        const API_KEY = `http://localhost/serverWiseApp/obtenerUsuario.php?user=${correo}`;
        const response = await fetch(API_KEY);

        if (!response.ok) {
            throw new Error('No se pudo obtener el usuario');
        }
        const usuario = await response.json();
        return usuario;
    } catch (error) {
        console.error('Error al obtener usuario:', error);
        throw error;
    }
}