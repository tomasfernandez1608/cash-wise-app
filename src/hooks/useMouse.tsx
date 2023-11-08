import { useEffect } from 'react';

export function useMouse() {
    // FUNCIONALIDAD DE MOUSE
    const usuarioRollViewMouse = true; // HABILITA O NO EL EFECTO
    const movementThreshold = 150; // Cantidad mínima de píxeles que el mouse debe moverse para cambiar el cursor

    useEffect(() => {
        let lastX = 0;
        let lastY = 0;
        const changeCursor = (event) => {
            const deltaX = Math.abs(event.clientX - lastX);
            const deltaY = Math.abs(event.clientY - lastY);

            if (deltaX + deltaY < movementThreshold) {
                return; // No hacer nada si el mouse no se ha movido lo suficiente
            }

            lastX = event.clientX;
            lastY = event.clientY;

            const randomSize = Math.floor(Math.random() * 25) + 15; // Tamaño entre 20 y 50
            const randomRotation = Math.floor(Math.random() * 360); // Rotación de 0 a 360 grados

            const imageUrl = "https://cdn-icons-png.flaticon.com/512/126/126179.png";

            const cursorElement = document.createElement("div");
            cursorElement.style.position = "absolute";
            cursorElement.style.left = `${event.clientX}px`;
            cursorElement.style.top = `${event.clientY}px`;
            cursorElement.style.width = `${randomSize}px`;
            cursorElement.style.height = `${randomSize}px`;
            cursorElement.style.backgroundImage = `url('${imageUrl}')`;
            cursorElement.style.backgroundSize = "cover";
            cursorElement.style.transform = `rotate(${randomRotation}deg)`;
            cursorElement.style.pointerEvents = "none"; // Para evitar que el elemento interfiera con el clic

            document.body.appendChild(cursorElement);

            setTimeout(() => {
                document.body.removeChild(cursorElement);
            }, 500); // Elimina el elemento después de un breve período para evitar el desorden en el DOM
        };

        if (usuarioRollViewMouse) {
            window.addEventListener("mousemove", changeCursor);
        }

        return () => {
            window.removeEventListener("mousemove", changeCursor);
        };
    }, [usuarioRollViewMouse]);
}