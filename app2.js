// Selecciona los elementos del DOM necesarios
const container = document.querySelector('.container'); // Contenedor principal
const resultado = document.querySelector('#resultado'); // Div para mostrar el resultado
const formulario = document.querySelector('#Formulario'); // Formulario para buscar el clima

// Añade un event listener al cargar la ventana
window.addEventListener('load', () => {
    formulario.addEventListener('submit', buscarClima); // Escucha el evento submit del formulario y llama a la función buscarClima
});

// Función para manejar la búsqueda del clima
function buscarClima(e) {
    e.preventDefault(); // Previene el comportamiento por defecto del formulario

    // Obtiene y limpia los valores ingresados por el usuario
    const ciudad = document.querySelector('#ciudad').value.trim();
    const pais = document.querySelector('#pais').value.trim();

    // Verifica si ambos campos están llenos
    if (ciudad === "" || pais === "") {
        mostrarError("Ambos campos son obligatorios"); // Muestra un error si algún campo está vacío
        return; // Sale de la función
    }

    // Llama a la función para consultar la API
    consultarAPI(ciudad, pais);
}

// Función para mostrar errores
function mostrarError(mensaje) {
    const alerta = document.querySelector('.bg-red-100'); // Verifica si ya existe una alerta
    if (!alerta) {
        // Crea una nueva alerta si no existe
        const alerta = document.createElement('div');
        alerta.classList.add('bg-red-100', 'border-red-400', 'text-red-700', 'px-4',
            'py-3', 'rounded', 'relative', 'max-w-md', 'mx-auto', 'mt-6', 'text-center');
        alerta.innerHTML = `<strong class="font-bold">Error!</strong>
            <span class="block sm:inline">${mensaje}</span>`;

        container.appendChild(alerta); // Añade la alerta al contenedor
        setTimeout(() => alerta.remove(), 3000); // Elimina la alerta después de 3 segundos
    }
}

// Función para consultar la API de OpenWeather
function consultarAPI(ciudad, pais) {
    const appId = '7881ba9fe441f4f6f1a86e26146f9a0b'; // ID de la API
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}&units=metric`; // URL de la API con parámetros
    console.log(url);

    fetch(url)
        .then(respuesta => {
            return respuesta.json(); // Convierte la respuesta a JSON
        })
        .then(datos => {
            mostrarClima(datos); // Llama a la función para mostrar el clima con los datos obtenidos
            console.log(datos); // Imprime los datos en la consola
        })
        .catch(error => mostrarError("Hubo un error en la consulta")); // Muestra un error si falla la consulta
}

// Función para mostrar los datos del clima
function mostrarClima(datos) {
    limpiarHTML(); // Limpia el HTML previo
    const { name, main: { temp, temp_max, temp_min } } = datos; // Destructura los datos obtenidos

    // Las temperaturas ya están en Celsius, no es necesario convertir
    const grados = temp;
    const maxima = temp_max;
    const minima = temp_min;

    // Crea elementos para mostrar los datos del clima
    const nombreCiudad = document.createElement('p');
    nombreCiudad.innerHTML = `Clima en: ${name}`;
    nombreCiudad.classList.add('font-bold', 'text-2xl');

    const temperaturaActual = document.createElement('p');
    temperaturaActual.innerHTML = `Actual: ${grados} &#8451;`;
    temperaturaActual.classList.add('font-bold', 'text-4xl');

    const temperaturaMaxima = document.createElement('p');
    temperaturaMaxima.innerHTML = `Max: ${maxima} &#8451;`;
    temperaturaMaxima.classList.add('text-xl');

    const temperaturaMinima = document.createElement('p');
    temperaturaMinima.innerHTML = `Min: ${minima} &#8451;`;
    temperaturaMinima.classList.add('text-xl');

    const resultadoDiv = document.createElement('div');
    resultadoDiv.classList.add('text-center', 'text-white');
    resultadoDiv.appendChild(nombreCiudad);
    resultadoDiv.appendChild(temperaturaActual);


    // Añade el resultadoDiv al div resultado
    resultado.appendChild(resultadoDiv);
    resultado.appendChild(temperaturaActual);
    resultado.appendChild(temperaturaMinima);
    resultado.appendChild(temperaturaMaxima);

}

// Función para limpiar el HTML previo
function limpiarHTML() {
    while (resultado.firstChild) {
        resultado.removeChild(resultado.firstChild); // Elimina todos los elementos hijos de resultado
    }
}

