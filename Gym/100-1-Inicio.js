document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('.menu-hamburguesa').addEventListener('click', function () {
        document.getElementById('barra-lateral').classList.toggle('open');
        document.getElementById('overlay').classList.toggle('show');
    });

    document.getElementById('overlay').addEventListener('click', function () {
        document.getElementById('barra-lateral').classList.remove('open');
        document.getElementById('overlay').classList.remove('show');
    });

    document.querySelector('.barra-lateral .blog-item > a').addEventListener('click', function (e) {
        e.preventDefault();
        this.parentElement.classList.toggle('open');
    });
});

