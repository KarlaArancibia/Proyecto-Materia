document.addEventListener("DOMContentLoaded", function () {
    const monthSelector = document.getElementById("monthSelector");
    const daysGrid = document.getElementById("daysGrid");
    const countdown = document.getElementById("countdown");
    const markCompleteButton = document.getElementById("markComplete");

    const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", 
                    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    let currentMonth = new Date().getMonth();
    let currentYear = new Date().getFullYear();
    let currentDay = new Date().getDate();

    // Set the month selector to the current month
    monthSelector.value = currentMonth;

    monthSelector.addEventListener("change", () => {
        currentMonth = parseInt(monthSelector.value);
        generateCalendar(currentMonth, currentYear);
    });

    function generateCalendar(month, year) {
        // Clear the existing calendar
        daysGrid.innerHTML = "";

        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const daysInPreviousMonth = new Date(year, month, 0).getDate();

        // Add days from the previous month
        for (let i = firstDay === 0 ? 6 : firstDay - 1; i >= 0; i--) {
            const day = document.createElement("div");
            day.classList.add("inactive");
            day.innerHTML = `<span>${daysInPreviousMonth - i}</span>`;
            daysGrid.appendChild(day);
        }

        // Add days for the current month
        for (let i = 1; i <= daysInMonth; i++) {
            const day = document.createElement("div");
            day.innerHTML = `<span>${i}</span>`;
            day.dataset.date = `${year}-${month + 1}-${i}`;

            // Add points based on local storage
            if (localStorage.getItem(`${year}-${month + 1}-${i}-attendance`)) {
                const attendancePoint = document.createElement("div");
                attendancePoint.classList.add("attendance");
                day.appendChild(attendancePoint);
            }

            if (localStorage.getItem(`${year}-${month + 1}-${i}-note`)) {
                const notePoint = document.createElement("div");
                notePoint.classList.add("note");
                day.appendChild(notePoint);
            }

            if (i === currentDay && month === new Date().getMonth() && year === new Date().getFullYear()) {
                day.classList.add("today");
            }

            day.addEventListener("click", () => openModal(i));
            daysGrid.appendChild(day);
        }
    }

    function startCountdown(duration) {
        let timer = duration, minutes, seconds;
        setInterval(function () {
            if (timer > 0) {
                minutes = parseInt(timer / 60, 10);
                seconds = parseInt(timer % 60, 10);

                minutes = minutes < 10 ? "0" + minutes : minutes;
                seconds = seconds < 10 ? "0" + seconds : seconds;

                countdown.textContent = minutes + ":" + seconds;

                if (--timer < 0) {
                    countdown.textContent = "TIEMPO COMPLETO";
                }
            }
        }, 1000);
    }

    startCountdown(3600);

    // Mark attendance and complete task
    document.getElementById("markAttendance").addEventListener("click", function () {
        const date = `${currentYear}-${currentMonth + 1}-${currentDay}`;
        localStorage.setItem(`${date}-attendance`, true);
        generateCalendar(currentMonth, currentYear);
        markCompleteButton.disabled = false;
        alert("Asistencia marcada");
    });

    markCompleteButton.addEventListener("click", function () {
        alert("Tarea completada");
        markCompleteButton.disabled = true;
    });

    // Modal logic
    const modal = document.getElementById("noteModal");
    const modalDate = document.getElementById("modalDate");
    const modalNoteArea = document.getElementById("modalNoteArea");
    const closeModal = document.querySelector(".close");
    const saveNoteButton = document.getElementById("saveNote");

    function openModal(day) {
        const date = `${currentYear}-${currentMonth + 1}-${day}`;
        modalDate.textContent = `${day} de ${months[currentMonth]} ${currentYear}`;
        modalNoteArea.value = localStorage.getItem(`${date}-note`) || "";
        modal.style.display = "flex";
        saveNoteButton.onclick = () => {
            localStorage.setItem(`${date}-note`, modalNoteArea.value);
            generateCalendar(currentMonth, currentYear);
            modal.style.display = "none";
        };
    }

    closeModal.addEventListener("click", () => {
        modal.style.display = "none";
    });

    window.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.style.display = "none";
        }
    });

    // Generate the initial calendar
    generateCalendar(currentMonth, currentYear);
});
