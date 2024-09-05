document.getElementById('actualizarBtn').addEventListener('click', function() {
    const objetivo = document.getElementById('objetivo').value;
    const nivel = document.getElementById('nivel').value;
    const rutinaContainer = document.getElementById('rutinaContainer');
    const rutinaDiv = document.getElementById('rutina');

    const dias = ['lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado', 'domingo'];
    
    let rutina = '';

    dias.forEach(dia => {
        rutina += `<div id="${dia}" class="rutina-display hidden">${getRutinaDia(dia, objetivo)}</div>`;
    });

    rutinaDiv.innerHTML = rutina;
    rutinaContainer.classList.remove('hidden');
    
    // Inicialmente mostrar el lunes
    mostrarDia('lunes');
});

document.getElementById('diaSiguienteBtn').addEventListener('click', function() {
    const dias = ['lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado', 'domingo'];
    let diaActual = document.querySelector('.rutina-display:not(.hidden)').id;
    let indiceDiaActual = dias.indexOf(diaActual);
    
    if (indiceDiaActual < dias.length - 1) {
        mostrarDia(dias[indiceDiaActual + 1]);
    } else {
        mostrarDia(dias[0]); // Volver al primer día si estamos en el último
    }
});

function mostrarDia(dia) {
    const dias = ['lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado', 'domingo'];
    dias.forEach(d => {
        document.getElementById(d).classList.add('hidden');
    });
    document.getElementById(dia).classList.remove('hidden');
}

function getRutinaDia(dia, objetivo) {
    const rutinas = {
        musculo: {
            lunes: `
                <h3>Rutina de Lunes - Ganar Masa Muscular</h3>
                <p>Press de banca: 4 series de 8-12 repeticiones</p>
                <p>Press inclinado con mancuernas: 3 series de 8-12 repeticiones</p>
                <p>Aperturas con mancuernas: 3 series de 12-15 repeticiones</p>
                <p>Fondos en paralelas: 3 series al fallo</p>
                <p>Extensiones de tríceps en polea: 3 series de 10-12 repeticiones</p>
            `,
            martes: `
                <h3>Rutina de Martes - Ganar Masa Muscular</h3>
                <p>Dominadas: 4 series al fallo</p>
                <p>Remo con barra: 3 series de 8-12 repeticiones</p>
                <p>Jalón al pecho en polea: 3 series de 10-12 repeticiones</p>
                <p>Curl con barra: 3 series de 10-12 repeticiones</p>
                <p>Curl martillo: 3 series de 12-15 repeticiones</p>
            `,
            miercoles: `
                <h3>Rutina de Miércoles - Ganar Masa Muscular</h3>
                <p>Sentadillas: 4 series de 8-12 repeticiones</p>
                <p>Prensa de piernas: 3 series de 10-12 repeticiones</p>
                <p>Extensiones de piernas: 3 series de 12-15 repeticiones</p>
                <p>Curl de piernas: 3 series de 12-15 repeticiones</p>
                <p>Elevaciones de talones (gemelos): 4 series de 15-20 repeticiones</p>
                <p>Crunches: 3 series de 15-20 repeticiones</p>
            `,
            jueves: `
                <h3>Rutina de Jueves - Ganar Masa Muscular</h3>
                <p>Día de Descanso o Cardio Ligero</p>
            `,
            viernes: `
                <h3>Rutina de Viernes - Ganar Masa Muscular</h3>
                <p>Press militar: 4 series de 8-12 repeticiones</p>
                <p>Elevaciones laterales: 3 series de 12-15 repeticiones</p>
                <p>Elevaciones frontales: 3 series de 12-15 repeticiones</p>
                <p>Pájaros con mancuernas: 3 series de 12-15 repeticiones</p>
                <p>Extensiones de tríceps con mancuernas: 3 series de 10-12 repeticiones</p>
            `,
            sabado: `
                <h3>Rutina de Sábado - Ganar Masa Muscular</h3>
                <p>Sentadillas búlgaras: 3 series de 10-12 repeticiones por pierna</p>
                <p>Peso muerto rumano: 3 series de 8-12 repeticiones</p>
                <p>Prensa de piernas: 3 series de 10-12 repeticiones</p>
                <p>Elevaciones de talones: 4 series de 15-20 repeticiones</p>
                <p>Elevaciones de piernas: 3 series de 15-20 repeticiones</p>
            `,
            domingo: `
                <h3>Rutina de Domingo - Ganar Masa Muscular</h3>
                <p>Día de Descanso</p>
            `
        },
        peso: {
            lunes: `
                <h3>Rutina de Lunes - Perder Peso</h3>
                <p>30 minutos de entrenamiento en intervalos de alta intensidad (HIIT)</p>
                <p>Circuito de cuerpo completo (3 rondas):</p>
                <ul>
                    <li>Burpees: 15 repeticiones</li>
                    <li>Flexiones: 15 repeticiones</li>
                    <li>Sentadillas: 20 repeticiones</li>
                    <li>Saltos de tijera: 20 repeticiones</li>
                </ul>
            `,
            martes: `
                <h3>Rutina de Martes - Perder Peso</h3>
                <p>45 minutos de carrera o bicicleta a ritmo moderado</p>
                <p>Rutina de abdomen:</p>
                <ul>
                    <li>Crunches: 3 series de 20 repeticiones</li>
                    <li>Planchas: 3 series de 30 segundos</li>
                    <li>Elevaciones de piernas: 3 series de 15 repeticiones</li>
                </ul>
            `,
            miercoles: `
                <h3>Rutina de Miércoles - Perder Peso</h3>
                <p>30 minutos de entrenamiento en circuito con pesas (3 rondas):</p>
                <ul>
                    <li>Press de banca: 15 repeticiones</li>
                    <li>Remo con mancuernas: 15 repeticiones</li>
                    <li>Sentadillas con mancuernas: 15 repeticiones</li>
                    <li>Curl de bíceps: 15 repeticiones</li>
                </ul>
            `,
            jueves: `
                <h3>Rutina de Jueves - Perder Peso</h3>
                <p>30 minutos de entrenamiento en elíptica o nadar</p>
                <p>30 minutos de estiramientos y yoga</p>
            `,
            viernes: `
                <h3>Rutina de Viernes - Perder Peso</h3>
                <p>30 minutos de HIIT</p>
                <p>Circuito de cuerpo completo (3 rondas):</p>
                <ul>
                    <li>Kettlebell swings: 15 repeticiones</li>
                    <li>Flexiones con rodillas en el suelo: 15 repeticiones</li>
                    <li>Sentadillas con salto: 15 repeticiones</li>
                </ul>
            `,
            sabado: `
                <h3>Rutina de Sábado - Perder Peso</h3>
                <p>45 minutos de entrenamiento en bicicleta o remo</p>
                <p>Rutina de abdomen:</p>
                <ul>
                    <li>Crunches en bicicleta: 3 series de 20 repeticiones</li>
                    <li>Planchas laterales: 3 series de 30 segundos por lado</li>
                    <li>Elevaciones de piernas colgado: 3 series de 15 repeticiones</li>
                </ul>
            `,
            domingo: `
                <h3>Rutina de Domingo - Perder Peso</h3>
                <p>Día de Descanso</p>
            `
        },
        resistencia: {
            lunes: `
                <h3>Rutina de Lunes - Mejorar Resistencia</h3>
                <p>Circuito (4 rondas):</p>
                <ul>
                    <li>Sentadillas: 20 repeticiones</li>
                    <li>Flexiones: 15 repeticiones</li>
                    <li>Saltos de tijera: 30 segundos</li>
                    <li>Burpees: 15 repeticiones</li>
                </ul>
            `,
            martes: `
                <h3>Rutina de Martes - Mejorar Resistencia</h3>
                <p>30 minutos de carrera continua a ritmo moderado</p>
                <p>Rutina de abdomen:</p>
                <ul>
                    <li>Planchas: 3 series de 1 minuto</li>
                    <li>Crunches con giro: 3 series de 20 repeticiones</li>
                    <li>Elevaciones de piernas: 3 series de 15 repeticiones</li>
                </ul>
            `,
            miercoles: `
                <h3>Rutina de Miércoles - Mejorar Resistencia</h3>
                <p>Circuito (4 rondas):</p>
                <ul>
                    <li>Press de banca con mancuernas: 15 repeticiones</li>
                    <li>Remo con barra: 15 repeticiones</li>
                    <li>Sentadillas con mancuernas: 15 repeticiones</li>
                    <li>Flexiones: 15 repeticiones</li>
                </ul>
            `,
            jueves: `
                <h3>Rutina de Jueves - Mejorar Resistencia</h3>
                <p>30 minutos de entrenamiento HIIT (alternando entre 1 minuto de alta intensidad y 1 minuto de baja intensidad)</p>
            `,
            viernes: `
                <h3>Rutina de Viernes - Mejorar Resistencia</h3>
                <p>Circuito (4 rondas):</p>
                <ul>
                    <li>Peso muerto con mancuernas: 15 repeticiones</li>
                    <li>Elevaciones de talones: 15 repeticiones</li>
                    <li>Flexiones con rodillas en el suelo: 15 repeticiones</li>
                    <li>Saltos en el lugar: 30 segundos</li>
                </ul>
            `,
            sabado: `
                <h3>Rutina de Sábado - Mejorar Resistencia</h3>
                <p>45 minutos de bicicleta o natación a ritmo moderado</p>
                <p>30 minutos de estiramientos y yoga</p>
            `,
            domingo: `
                <h3>Rutina de Domingo - Mejorar Resistencia</h3>
                <p>Día de Descanso</p>
            `
        }
    };
    

    return rutinas[objetivo][dia] || '';
}
