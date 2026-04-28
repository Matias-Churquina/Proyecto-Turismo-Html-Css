$(document).ready(function () {

    // FLIP
    $(".card-agencia").click(function () {
        $(this).toggleClass("flip");
    });

    // RATING
    $(".rating").each(function () {
        let valor = Math.floor(Math.random() * 5) + 1;
        let estrellas = "";

        for (let i = 1; i <= 5; i++) {
            if (i <= valor) {
                estrellas += `<span class="star active" style="--delay:${i * 0.2}s">★</span>`;
            } else {
                estrellas += `<span class="star" style="--delay:${i * 0.2}s">★</span>`;
            }
        }

        $(this).html(estrellas);
    });

});
