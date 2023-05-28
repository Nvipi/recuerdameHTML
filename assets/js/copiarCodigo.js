// JS utilizado para realizar el copiar de los ejemplos de codigo

// Escuchar el evento personalizado creado y lanzado al crear contenido
document.addEventListener("etiquetasContenido", function () {

    // Obtener la seccion de click
    const copiar = document.querySelectorAll("#etiquetasContenido .contenedor-pre >div div");

    function copiarCodigo() {
        // Definir elementos
        const contenedor = event.currentTarget.parentElement.parentElement; // Obtener el contenedor del botón clickeado
        const icon = contenedor.querySelector("i");
        const msg = contenedor.querySelector(".text");
        const code = contenedor.querySelector("pre code");

        if (!navigator.clipboard) {
            // Selecionar el contenido de code a copiar
            const code = document.querySelector(".contenedor-pre > pre code");
            const range = document.createRange();
            range.selectNode(code);
            window.getSelection().addRange(range);

            // Copiar
            document.execCommand("copy");

            // Desmarcar
            window.getSelection().removeAllRanges();
        } else {
            const contenido = code.textContent || code.innerText;

            navigator.clipboard.writeText(contenido).then(() => {
                /* console.log("Copiado"); */
            })
                .catch((error) => {
                    console.error('Error al copiar: ', error);
                });
        }

        // Cambiar icon
        icon.classList.remove("fa-book");
        icon.classList.add("fa-check", "rotate");

        // Cambiar mensaje
        msg.innerText = "Copiado";

        // Efecto visual
        setTimeout(function () {
            // Cambiar icon
            icon.classList.remove("fa-check", "rotate");
            icon.classList.add("fa-book");

            // Cambiar mensaje
            msg.innerText = "Copiar";

        }, 3500);

    }

    // Detectamos click del usuario
    copiar.forEach(clickear => {
        // Ejecutar la funcion al dar click en el boton
        clickear.addEventListener("click", copiarCodigo);
    });

});