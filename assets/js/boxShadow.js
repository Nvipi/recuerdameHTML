// JS utilizado para crear dinamica las boxshadow cuando los divs crecen en tamaño al estar funcionando de manera responsiva

// Escuchar el evento personalizado creado y lanzado al crear contenido
document.addEventListener("etiquetasContenido", function () {

    // Una funcion para cambiar la boxshadow
    const cambiarBoxShadow = (tamaño) => {
        // Si es menor a lo minimo que hemos puesto de base en css las boxshadow
        tamaño = (tamaño < 520) ? 530 : tamaño;

        let sombra = "";

        // Iterar hasta el tamaño dado y restar 10 por un estetico del margen
        for (let valor = 0; valor <= (tamaño - 10); valor += 40) {
            sombra += (valor == 0) ? " 0px " + valor + "px" : ", 0px " + valor + "px";
        }

        return sombra;
    }

    // Obtenemos los divs que queremos observar
    const divElements = document.querySelectorAll('.contenido');

    // Recorremos los divs
    divElements.forEach(function (divElement) {
        // Obtener el div de circulos
        const circulos = divElement.previousElementSibling;
        // Obtener el div de lineas
        const lineas = circulos.firstElementChild;

        // Creamos una instancia de ResizeObserver que permite observar cambios en el tamaño de un elemento
        const observer = new ResizeObserver(function (entries) {
            // Recorremos las entradas observadas por el ResizeObserver
            entries.forEach(function (entry) {
                // Obtenemos el tamaño actual del div
                const currentSize = entry.contentRect;

                // Comparar tamaños
                if (currentSize.height != previousSize.height || currentSize.height != "600") {
                    // Modificar la box-shadow
                    circulos.style.boxShadow = cambiarBoxShadow(parseInt(currentSize.height));
                    lineas.style.boxShadow = cambiarBoxShadow(parseInt(currentSize.height));

                }

                // Actualizar el tamaño anterior para futuras iteraciones
                previousSize = currentSize;
            });
        });

        // Obtener el tamaño inicial del div y guardarlo para futuras iteraciones
        let previousSize = divElement.getBoundingClientRect();

        // Inicia la observación del div con el ResizeObserver
        observer.observe(divElement);
    });

});