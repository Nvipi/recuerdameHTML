// JS utilizado para leer etiquetas.json y mostrar la informacion

// Esperar a que el contenido del DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", function () {
    // Obtener el contenedor donde se agregarán las etiquetas
    const etiquetasContainer = document.getElementById("etiquetasContenido");

    // Realizar una solicitud fetch al archivo JSON de etiquetas
    fetch("assets/content/etiquetas.json")
        .then(function (response) {
            // Verificar si la respuesta de la solicitud es exitosa
            if (response.ok) {
                // Convertir la respuesta a formato JSON
                return response.json();
            } else {
                // Lanzar un error si la respuesta no es exitosa
                throw new Error("Error al cargar el archivo JSON.");
            }
        })
        .then(function (data) {
            // Crear un objeto para almacenar las claves de los objetivos
            const objetivos = {};

            // Iterar sobre cada sección en los datos recibidos
            for (const section in data) {
                if (data.hasOwnProperty(section)) {
                    const etiquetas = data[section];

                    // Iterar sobre cada etiqueta en la sección
                    etiquetas.forEach(function (etiqueta) {
                        const clave = section;

                        // Verificar si la clave ya existe en el objeto de objetivos
                        if (!objetivos[clave]) {
                            // Crear la etiqueta div y su contenido para la clave y agregarla al contenedor
                            const claveDiv = document.createElement("div");
                            claveDiv.className = "d-flex justify-content-center align-items-center";
                            const claveH1 = document.createElement("h1");
                            claveH1.className = "titulo";
                            claveH1.textContent = clave;
                            claveDiv.appendChild(claveH1);
                            etiquetasContainer.appendChild(claveDiv);

                            // Agregar la clave al objeto de objetivos
                            objetivos[clave] = true;
                        }

                        // Crear elementos HTML para representar la etiqueta y su contenido
                        const etiquetaDiv = document.createElement("div");
                        etiquetaDiv.id = etiqueta.etiqueta;
                        etiquetaDiv.className = "d-flex justify-content-center align-items-center";

                        const libroDiv = document.createElement("div");
                        libroDiv.className = "libro";

                        const circulosDiv = document.createElement("div");
                        circulosDiv.className = "circulos";
                        const lineasDiv = document.createElement("div");
                        lineasDiv.className = "lineas";
                        circulosDiv.appendChild(lineasDiv);

                        const containerDiv = document.createElement("div");
                        containerDiv.className = "container contenido";

                        const row1Div = document.createElement("div");
                        row1Div.className = "row";
                        const col1Div = document.createElement("div");
                        col1Div.className = "col-md-12";
                        const h3Etiqueta = document.createElement("h3");
                        h3Etiqueta.className = "sub-titulo";
                        h3Etiqueta.textContent = etiqueta.etiqueta;
                        const pInformacion = document.createElement("p");
                        pInformacion.className = "texto";
                        pInformacion.innerHTML = etiqueta.informacion;
                        col1Div.appendChild(h3Etiqueta);
                        col1Div.appendChild(pInformacion);
                        row1Div.appendChild(col1Div);

                        const row2Div = document.createElement("div");
                        row2Div.className = "row";
                        const col2Div1 = document.createElement("div");
                        col2Div1.className = "col-md-3";
                        const col2Div2 = document.createElement("div");
                        col2Div2.className = "col-md-6";
                        const h4Codigo = document.createElement("h4");
                        h4Codigo.className = "sub-titulo";
                        h4Codigo.textContent = "Codigo:";

                        const contenedorPreDiv = document.createElement("div");
                        contenedorPreDiv.className = "contenedor-pre";

                        const copDiv = document.createElement("div");
                        const copDivSpan = document.createElement("span");
                        copDivSpan.className = "text-left";
                        copDivSpan.textContent = "Html";
                        const copDivDiv = document.createElement("div");
                        const copDivDivI = document.createElement("i");
                        copDivDivI.className = "fas fa-book";
                        const copDivDivSpan = document.createElement("span");
                        copDivDivSpan.className = "text";
                        copDivDivSpan.textContent = "Copiar";

                        const preCode = document.createElement("pre");
                        const code = document.createElement("code");
                        code.innerHTML = etiqueta.codigo;

                        preCode.appendChild(code);
                        col2Div2.appendChild(h4Codigo);
                        col2Div2.appendChild(contenedorPreDiv);
                        contenedorPreDiv.appendChild(copDiv);
                        copDiv.appendChild(copDivSpan);
                        copDiv.appendChild(copDivDiv);
                        copDivDiv.appendChild(copDivDivI);
                        copDivDiv.appendChild(copDivDivSpan);
                        contenedorPreDiv.appendChild(preCode);
                        row2Div.appendChild(col2Div1);
                        row2Div.appendChild(col2Div2);

                        containerDiv.appendChild(row1Div);
                        containerDiv.appendChild(row2Div);

                        libroDiv.appendChild(circulosDiv);
                        libroDiv.appendChild(containerDiv);

                        etiquetaDiv.appendChild(libroDiv);

                        etiquetasContainer.appendChild(etiquetaDiv);
                    });
                }
            }

            // Disparar evento personalizado para indicar que el contenido ha sido creado
            const contenidoCreadoEvent = new CustomEvent("etiquetasContenido");
            document.dispatchEvent(contenidoCreadoEvent);
        })
        .catch(function (error) {
            // Capturar y manejar cualquier error que ocurra durante el proceso
            console.error("Error:", error);
        });
});
