const form = document.getElementById("formulario");
const loading = document.getElementById("loading");
const modal = document.getElementById("modal");
const cerrar = document.getElementById("cerrarModal");

form.addEventListener("submit", function(e) {
    e.preventDefault();

    loading.style.display = "flex";

    setTimeout(() => {
        loading.style.display = "none";
        modal.style.display = "flex";
    }, 1000);
});

cerrar.addEventListener("click", () => {
    modal.style.display = "none";
    form.reset();
});