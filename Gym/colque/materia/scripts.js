// Funciones para mostrar/ocultar secciones
function showSection(sectionClass) {
    const sections = ['plans-section', 'form-section', 'payment-options-section', 'payment-section', 'qr-section'];
    sections.forEach(section => {
        document.querySelector(`.${section}`).style.display = section === sectionClass ? 'block' : 'none';
    });
}

function showPlans() {
    showSection('plans-section');
}

function showForm() {
    showSection('form-section');
    const selectedPlan = localStorage.getItem('selectedPlan');
    if (selectedPlan) {
        document.getElementById("plan-name").textContent = selectedPlan;
    }
}

function showPaymentOptions() {
    showSection('payment-options-section');
}

function showPaymentMethod(method) {
    if (method === 'card') {
        showSection('payment-section');
    } else if (method === 'qr') {
        showSection('qr-section');
        showQR();
    }
}

function showQR() {
    new QRCode(document.getElementById("qr-code"), {
        text: "https://ejemplo.com/pago-exitoso",
        width: 200,
        height: 200
    });
    setTimeout(showCongratulations, 5000);
}

function showCongratulations() {
    document.getElementById('congratulations-modal').style.display = 'block';
}

function closeModal() {
    document.getElementById('congratulations-modal').style.display = 'none';
    showPlans();
    localStorage.clear(); // Limpiar localStorage después de completar el proceso
}

// Event listeners
document.addEventListener("DOMContentLoaded", function() {
    showPlans(); // Mostrar la sección de planes al cargar la página

    // Event listener para los botones de selección de plan
    document.querySelectorAll('.select-plan-button').forEach(button => {
        button.addEventListener('click', function() {
            const selectedPlan = this.dataset.plan;
            localStorage.setItem('selectedPlan', selectedPlan);
            showForm();
        });
    });

    // Event listener para el formulario de registro
    document.getElementById('registration-form').addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value
        };
        localStorage.setItem('userData', JSON.stringify(formData));
        showPaymentOptions();
    });

    // Event listeners para las opciones de pago
    document.querySelectorAll('.payment-option').forEach(function(button) {
        button.addEventListener('click', function() {
            const paymentMethod = this.dataset.method;
            localStorage.setItem('paymentMethod', paymentMethod);
            showPaymentMethod(paymentMethod);
        });
    });

    // Event listener para el formulario de pago con tarjeta
    document.getElementById('payment-form').addEventListener('submit', function(e) {
        e.preventDefault();
        const cardData = {
            cardNumber: document.getElementById('card-number').value,
            expiryDate: document.getElementById('expiry-date').value,
            cvv: document.getElementById('cvv').value
        };
        localStorage.setItem('cardData', JSON.stringify(cardData));
        showCongratulations();
    });
});

// Función para cargar datos del localStorage (si existen)
function loadStoredData() {
    const selectedPlan = localStorage.getItem('selectedPlan');
    if (selectedPlan) {
        document.getElementById("plan-name").textContent = selectedPlan;
    }

    const userData = JSON.parse(localStorage.getItem('userData'));
    if (userData) {
        document.getElementById('name').value = userData.name;
        document.getElementById('email').value = userData.email;
        document.getElementById('phone').value = userData.phone;
    }

    const cardData = JSON.parse(localStorage.getItem('cardData'));
    if (cardData) {
        document.getElementById('card-number').value = cardData.cardNumber;
        document.getElementById('expiry-date').value = cardData.expiryDate;
        document.getElementById('cvv').value = cardData.cvv;
    }
}

// Llamar a loadStoredData cuando se carga la página
document.addEventListener("DOMContentLoaded", loadStoredData);

// Función para limpiar localStorage
function clearStoredData() {
    localStorage.clear();
}

// Llamar a clearStoredData cuando se cierra el modal de felicitación
function closeModal() {
    document.getElementById('congratulations-modal').style.display = 'none';
    clearStoredData();
    showPlans();
}