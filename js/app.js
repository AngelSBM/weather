const container = document.querySelector('.container');
const formulario = document.querySelector('#formulario');
const resultadoHTML = document.querySelector('#resultado');

window.addEventListener('load', ()=>{

    formulario.addEventListener('submit', buscarClima);

});

function buscarClima(e){
    e.preventDefault();

    //Validar formulario
    const ciudad = document.querySelector('#ciudad').value;
    const pais = document.querySelector('#pais').value;

    limpiarHTML()
    if( ciudad === '' || pais === '' ){
        imprimirAlerta('Todos los campos son obligatorios', 'error');

        return
    }

    consultarAPI(ciudad, pais);

}

function imprimirAlerta(mensaje, tipo){
    
    const noRepeatAlert = document.querySelector('.alerta');

    if( !noRepeatAlert ){
        const alerta = document.createElement('div');
        alerta.classList.add('bg-red-100', 'border-red-400', 'text-red-700', 'px-4', 'py-3', 'rounded', 'max-w-md', 'mx-auto', 'mt-6', 'text-center', 'alerta');
    
        alerta.innerHTML = `
            <strong class="font-bold">Error!</strong>
            <span class="block">${mensaje}</span>
        `;
    
        container.appendChild(alerta);
        setTimeout(() => {
            alerta.remove();
        }, 5000);    
    }

}

function consultarAPI(ciudad, pais){

    const appId = '828d677ceecfd3be603978e63bbbc947';

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;

    spinner(); //Muestra el spinner de carga

    fetch(url)
        .then( respuesta => respuesta.json() )
        .then( resultado => {
            if( resultado.cod === '404' ){
                imprimirAlerta('Ciudad no encontrada', 'error');
                return
            }

            limpiarHTML(); //Borra el HTML previo

            //imprime la respuesta en el HTML
            mostrarClima(resultado);
        } )

}

function mostrarClima(resultado){
    const { name, main:{ temp, temp_max, temp_min } } = resultado;

    const nombreCiudad = document.createElement('p');
    nombreCiudad.textContent = `Clima en ${name}`;
    nombreCiudad.classList.add('font-bold', 'text-2xl')

    const centigrados = kelvinACentigrados(temp);
    const max = kelvinACentigrados(temp_max);
    const min = kelvinACentigrados(temp_min);

    const actual = document.createElement('p');
    actual.innerHTML = `${centigrados} &#8451;`;
    actual.classList.add('font-bold', 'text-6xl');

    const tempMax = document.createElement('p');
    tempMax.innerHTML = `Max. ${max} &#8451;`
    tempMax.classList.add('text-xl')

    const tempMin = document.createElement('p');
    tempMin.innerHTML = `Min. ${min} &#8451;`
    tempMin.classList.add('text-xl')

    const resultadoDiv = document.createElement('div');
    resultadoDiv.classList.add('text-center', 'text-white');
    resultadoDiv.appendChild(nombreCiudad)
    resultadoDiv.appendChild(actual);
    resultadoDiv.appendChild(tempMax);
    resultadoDiv.appendChild(tempMin);

    resultadoHTML.appendChild(resultadoDiv)
}

const kelvinACentigrados = grados => parseInt( grados - 273.15 );


function limpiarHTML() {
    while( resultadoHTML.firstChild ){
        resultadoHTML.firstChild.remove();
    }
}

function spinner(){

    limpiarHTML()

    const spinner = document.createElement('div');
    spinner.classList.add('sk-fading-circle');

    spinner.innerHTML = `
        <div class="sk-circle1 sk-circle"></div>
        <div class="sk-circle2 sk-circle"></div>
        <div class="sk-circle3 sk-circle"></div>
        <div class="sk-circle4 sk-circle"></div>
        <div class="sk-circle5 sk-circle"></div>
        <div class="sk-circle6 sk-circle"></div>
        <div class="sk-circle7 sk-circle"></div>
        <div class="sk-circle8 sk-circle"></div>
        <div class="sk-circle9 sk-circle"></div>
        <div class="sk-circle10 sk-circle"></div>
        <div class="sk-circle11 sk-circle"></div>
        <div class="sk-circle12 sk-circle"></div>
    `;

    resultadoHTML.appendChild(spinner)
}