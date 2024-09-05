$(document).ready(function () {
    let registros = JSON.parse(localStorage.getItem('progresos')) || [];

    inicializarGrafico();

    $('#form-progreso').on('submit', function (e) {
        e.preventDefault();

        let fecha = $('#fecha').val();
        let peso = parseFloat($('#peso').val());
        let cintura = parseFloat($('#cintura').val());
        
        if (!fecha || !peso || !cintura) {
            alert('Complete todos los campos.');
            return;
        }

        let nuevoRegistro = {
            fecha: fecha,
            peso: peso,
            cintura: cintura,
        };

        registros.push(nuevoRegistro);
        localStorage.setItem('progresos', JSON.stringify(registros));

        actualizarGrafico();

        this.reset();
    });

    function inicializarGrafico() {
        const ctx = document.getElementById('chartProgreso').getContext('2d');
        window.miGrafico = new Chart(ctx, {
            type: 'line',
            data: {
                labels: registros.map(registro => registro.fecha),
                datasets: [
                    {
                        label: 'Peso (kg)',
                        data: registros.map(registro => registro.peso),
                        borderColor: '#F10505',
                        fill: false,
                        tension: 0.1,
                    },
                    {
                        label: 'Cintura (cm)',
                        data: registros.map(registro => registro.cintura),
                        borderColor: '#e24242',
                        fill: false,
                        tension: 0.1,
                    }
                ]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    tooltip: {
                        mode: 'index',
                        intersect: false,
                    }
                },
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Fecha'
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Medida'
                        },
                        beginAtZero: true
                    }
                }
            }
        });
    }

    function actualizarGrafico() {
        window.miGrafico.data.labels = registros.map(registro => registro.fecha);
        window.miGrafico.data.datasets[0].data = registros.map(registro => registro.peso);
        window.miGrafico.data.datasets[1].data = registros.map(registro => registro.cintura);
        window.miGrafico.update();
    }
}); 