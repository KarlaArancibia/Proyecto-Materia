function guardarRespuestas() {
    const respuestas = document.querySelectorAll('input[type="radio"]:checked');
    const totalPreguntas = document.querySelectorAll('.question').length;

    if (respuestas.length === totalPreguntas) {
        // Ocultar el cuestionario
        document.getElementById('cuestionario').classList.add('hidden');

        // Mostrar solo el mensaje de completado y el botón "Volver a contestar"
        document.getElementById('completado').style.display = 'block';
    } else {
        // Mostrar mensaje de advertencia
        alert('Por favor, responde todas las preguntas antes de guardar.');
    }
}

function volverACuestionario() {
    // Restablecer las respuestas seleccionadas manualmente
    const respuestas = document.querySelectorAll('input[type="radio"]:checked');
    respuestas.forEach(radio => radio.checked = false);

    // Mostrar el cuestionario y ocultar el mensaje de completado
    document.getElementById('cuestionario').classList.remove('hidden');
    document.getElementById('completado').style.display = 'none';
}
