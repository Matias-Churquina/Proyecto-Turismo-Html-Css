document.querySelectorAll(".rating").forEach(rating => {
    // número aleatorio de 1 a 5
    const valor = Math.floor(Math.random() * 5) + 1;

    rating.setAttribute("data-rating", valor);

    let estrellas = "";

    for (let i = 1; i <= 5; i++) {
        if (i <= valor) {
            estrellas += "<span>★</span>";
        } else {
            estrellas += "☆";
        }
    }

    rating.innerHTML = estrellas;
});