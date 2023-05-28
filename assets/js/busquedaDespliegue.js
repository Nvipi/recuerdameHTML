// JS utilizado para realizar la busqueda de etiqueta y hacer scroll a la misma

// Obtener los datos del JSON
fetch("assets/content/etiquetas.json")
    .then(function (response) {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error("Error al cargar el archivo JSON.");
        }
    })
    .then(function (data) {
        // Obtener los IDs desde el JSON
        const idEtiquetas = Object.values(data).flatMap((section) => section.map((item) => item.etiqueta));

        // Resto del código que utiliza los IDs de las etiquetas
        const btnbuscar = document.getElementById("buscar"); // boton
        const inputBusqueda = document.getElementById("texto"); // input
        const datalist = document.getElementById("sugerencias"); // datalist

        // Función para buscar y mover el scroll a la etiqueta
        function buscarYDesplazarse() {
            const valorBusqueda = inputBusqueda.value.toLowerCase();
            const elemento = idEtiquetas.find((etiqueta) => etiqueta.toLowerCase() === valorBusqueda);

            // ¿Existe la etiqueta?
            if (elemento) {
                const posicion = document.getElementById(elemento).offsetTop;

                // Nos movemos a la etiqueta
                window.scrollTo({
                    top: posicion,
                    behavior: "smooth", // forma suave de mover el scroll
                });
            }
        }

        // Función para rellenar el datalist
        function mostrarResultados(resultados) {
            datalist.innerHTML = "";

            // recorremos el resultado y escribimos o anidamos las opciones al datalist
            resultados.forEach(function (id) {
                const opcion = document.createElement("option");
                opcion.value = id;
                datalist.appendChild(opcion);
            });
        }

        // Función para ocultar/limpiar el datalist
        function ocultarResultados() {
            datalist.innerHTML = "";
        }

        // Detectamos el click del usuario
        btnbuscar.addEventListener("click", buscarYDesplazarse);

        // Detectamos al usuario usando el input
        inputBusqueda.addEventListener("input", function () {
            const valorBusqueda = inputBusqueda.value.toLowerCase();
            const resultados = idEtiquetas.filter((id) =>
                id.toLowerCase().includes(valorBusqueda)
            ); // Filtramos las etiquetas que contengan el valor del input

            // comprobar si el valor es el exacto o no, para así mostrar el datalist
            if (
                resultados.length > 0 &&
                resultados[0].toLowerCase() !== valorBusqueda
            ) {
                mostrarResultados(resultados.slice(0, 5)); // Entregamos solo las 5 primeras coincidencias
            } else {
                ocultarResultados();
            }
        });
    })
    .catch(function (error) {
        console.error("Error:", error);
    });
