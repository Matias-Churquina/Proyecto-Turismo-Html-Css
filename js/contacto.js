document.addEventListener("DOMContentLoaded", () => {
    const formulario = document.getElementById("formulario");
    const loading = document.getElementById("loading");
    const modalElement = document.getElementById("modalExito");

    const nombre = document.getElementById("nombre");
    const email = document.getElementById("email");
    const mensaje = document.getElementById("mensaje");
    const apellido = document.getElementById("apellido");
    const celular = document.getElementById("celular");

    const modalExito = new bootstrap.Modal(modalElement);

    /* ==========================================
       EXPRESIONES REGULARES SEGURAS
    ========================================== */
    const regexNombre = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{3,50}$/;
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const regexScript = /(<[^>]*>|javascript:|onerror=|onload=|eval\(|script)/gi;

    /* ==========================================
       FUNCIÓN DE SANITIZACIÓN
    ========================================== */
    function contieneCodigoMalicioso(texto) {
        return regexScript.test(texto);
    }

    function mostrarError(campo, mensaje) {
        campo.classList.add("is-invalid");
        campo.classList.remove("is-valid");
        campo.setCustomValidity(mensaje);
        campo.reportValidity();
    }

    function mostrarValido(campo) {
        campo.classList.remove("is-invalid");
        campo.classList.add("is-valid");
        campo.setCustomValidity("");
    }

    /* ==========================================
       VALIDACIÓN EN TIEMPO REAL
    ========================================== */

    nombre.addEventListener("input", () => {
        if (!regexNombre.test(nombre.value.trim())) {
            mostrarError(
                nombre,
                "Ingrese un nombre válido (solo letras y espacios)."
            );
        } else {
            mostrarValido(nombre);
        }
    });

    apellido.addEventListener("input", () => {
        if (!regexApellido.test(apellido.value.trim())) {
            mostrarError(
                apellido,
                "Ingrese un apellido válido (solo letras y espacios)."
            );
        } else {
            mostrarValido(apellido);
        }
    });

    email.addEventListener("input", () => {
        if (!regexEmail.test(email.value.trim())) {
            mostrarError(
                email,
                "Ingrese un correo electrónico válido."
            );
        } else {
            mostrarValido(email);
        }
    });

    celular.addEventListener("input", () => {
        if (!regexCelular.test(celular.value.trim())) {
            mostrarError(
                celular,
                "Ingrese un número de celular válido."
            );
        } else {
            mostrarValido(celular);
        }
    });


    mensaje.addEventListener("input", () => {
        const texto = mensaje.value.trim();

        if (texto.length < 10) {
            mostrarError(
                mensaje,
                "El mensaje debe contener al menos 10 caracteres."
            );
            return;
        }

        if (contieneCodigoMalicioso(texto)) {
            mostrarError(
                mensaje,
                "No se permite ingresar código HTML, JavaScript o scripts."
            );
            return;
        }

        mostrarValido(mensaje);
    });

    /* ==========================================
       ENVÍO DEL FORMULARIO
    ========================================== */

    formulario.addEventListener("submit", function (e) {
        e.preventDefault();

        const nombreValor = nombre.value.trim();
        const emailValor = email.value.trim();
        const mensajeValor = mensaje.value.trim();

        // Validaciones finales
        if (!regexNombre.test(nombreValor)) {
            mostrarError(nombre, "Nombre inválido.");
            return;
        }

        if (!regexEmail.test(emailValor)) {
            mostrarError(email, "Email inválido.");
            return;
        }

        if (
            mensajeValor.length < 10 ||
            contieneCodigoMalicioso(mensajeValor)
        ) {
            mostrarError(
                mensaje,
                "El mensaje contiene contenido no permitido."
            );
            return;
        }

        // Mostrar loading
        loading.classList.add("active");

        const boton = formulario.querySelector("button[type='submit']");
        boton.disabled = true;
        boton.innerHTML = `
            <span class="spinner-border spinner-border-sm me-2"></span>
            Enviando...
        `;

        setTimeout(() => {
            loading.classList.remove("active");
            modalExito.show();

            formulario.reset();

            document.querySelectorAll(".is-valid").forEach(campo => {
                campo.classList.remove("is-valid");
            });

            boton.disabled = false;
            boton.innerHTML = "Enviar Mensaje";
        }, 1000);
    });

    /* ==========================================
       FOCO AL CERRAR MODAL
    ========================================== */

    modalElement.addEventListener("hidden.bs.modal", () => {
        nombre.focus();
    });
});

/* ==========================================
   VALIDACIÓN SEGURA DEL CAMPO MENSAJE
========================================== */

const LONGITUD_MAXIMA = 500;
const LINEAS_MAXIMAS = 8;

function contieneCodigoMalicioso(texto) {
    const patronesPeligrosos = [
        /<[^>]+>/gi,                    // HTML
        /<\/?[a-z][\s\S]*>/gi,           // Etiquetas
        /javascript:/gi,                // javascript:
        /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
        /on\w+\s*=/gi,                   // onclick=, onload=, etc.
        /eval\s*\(/gi,
        /document\./gi,
        /window\./gi,
        /innerHTML/gi,
        /outerHTML/gi,
        /fetch\s*\(/gi,
        /XMLHttpRequest/gi,
        /localStorage/gi,
        /sessionStorage/gi,
        /SELECT\s.+FROM/gi,              // SQL Injection
        /INSERT\s+INTO/gi,
        /UPDATE\s.+SET/gi,
        /DELETE\s+FROM/gi,
        /DROP\s+TABLE/gi,
        /UNION\s+SELECT/gi,
        /--/g,
        /;/g
    ];

    return patronesPeligrosos.some(regex => regex.test(texto));
}

mensaje.addEventListener("input", () => {
    const texto = mensaje.value.trim();
    const cantidadLineas = texto.split("\n").length;

    if (texto.length < 10) {
        mostrarError(
            mensaje,
            "El mensaje debe contener al menos 10 caracteres."
        );
        return;
    }

    if (texto.length > LONGITUD_MAXIMA) {
        mostrarError(
            mensaje,
            `El mensaje no puede superar los ${LONGITUD_MAXIMA} caracteres.`
        );
        return;
    }

    if (cantidadLineas > LINEAS_MAXIMAS) {
        mostrarError(
            mensaje,
            `El mensaje no puede tener más de ${LINEAS_MAXIMAS} líneas.`
        );
        return;
    }

    if (contieneCodigoMalicioso(texto)) {
        mostrarError(
            mensaje,
            "No se permite ingresar código, scripts, HTML o consultas SQL."
        );
        return;
    }

    mostrarValido(mensaje);
});
// document.addEventListener("DOMContentLoaded", () => {
//     const formulario = document.getElementById("formulario");
//     const loading = document.getElementById("loading");
//     const modalElement = document.getElementById("modalExito");

//     const modalExito = new bootstrap.Modal(modalElement);

//     formulario.addEventListener("submit", function (e) {
//         e.preventDefault();

//         // Mostrar pantalla de carga
//         loading.classList.add("active");

//         // Deshabilitar botón mientras se envía
//         const boton = formulario.querySelector("button[type='submit']");
//         boton.disabled = true;
//         boton.innerHTML = `
//             <span class="spinner-border spinner-border-sm me-2"></span>
//             Enviando...
//         `;

//         // Simulación de envío
//         setTimeout(() => {
//             loading.classList.remove("active");

//             // Mostrar modal
//             modalExito.show();

//             // Limpiar formulario
//             formulario.reset();

//             // Restaurar botón
//             boton.disabled = false;
//             boton.innerHTML = "Enviar Mensaje";
//         }, 2500);
//     });

//     // Al cerrar el modal, enfocar el primer campo
//     modalElement.addEventListener("hidden.bs.modal", () => {
//         document.getElementById("nombre").focus();
//     });
// });