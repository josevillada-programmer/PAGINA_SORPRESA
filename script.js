document.addEventListener('DOMContentLoaded', () => {

    const infoForm = document.getElementById('info-form');
    const flowerContainer = document.getElementById('flower-container');
    const submitBtn = document.getElementById('submit-btn');
    const nameInput = document.getElementById('name');
    const birthdayInput = document.getElementById('birthday');
    const greeting = document.getElementById('greeting');
    const music = document.getElementById('background-music');

    submitBtn.addEventListener('click', async() => {
        const name = nameInput.value;
        const birthday = birthdayInput.value;

        if (name === '' || birthday === '') {
            alert('Por favor, completa todos los campos.');
            return;
        }

        submitBtn.disabled = true;

        try {
            const response = await fetch('/guardar-registro', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nombre: name, cumpleanos: birthday }),
            });

            const result = await response.json();

            if (result.success) {
                // Inicia la animación de salida para el formulario
                infoForm.classList.add('fade-out');

                // Muestra el contenedor de las flores inmediatamente
                flowerContainer.classList.remove('hidden');

                // Actualiza el saludo
                greeting.textContent = `¡Flores especialmente para ${name}!`;

                // Reproduce la música
                if (music) {
                    music.volume = 0.3;
                    music.play().catch(e => console.log("Error al reproducir audio:", e));
                }
            } else {
                // Si el servidor responde con un error, reactiva el botón
                alert('Hubo un problema al guardar los datos.');
                submitBtn.disabled = false;
            }

        } catch (error) {
            console.error('Error de conexión:', error);
            alert('No se pudo conectar con el servidor. Asegúrate de que esté corriendo.');
            submitBtn.disabled = false; // Reactiva el botón si hay un error de conexión
        }
    });
});