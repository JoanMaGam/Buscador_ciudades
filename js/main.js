
const select = document.querySelector('#select');
const ulCiudades = document.querySelector('.ciudades');
const divMapa = document.querySelector('.mapa iframe');
const urlInicio = divMapa.src; //capturo el iframe y lo guardo en una constante


function printCities(pList, pDom) {
    pDom.innerHTML = ''; //es buena practica siempre borrar el Dom al principio
    pList.forEach(city => {
        printOneCity(city, pDom)
    });
}

function printOneCity(pCity, pDom) {

    const li = document.createElement('li');
    li.textContent = `${pCity.nombre} - ${pCity.habitantes} habitantes`;

    li.dataset.mapa = pCity.mapa;
    li.addEventListener('click', loadMap);

    pDom.appendChild(li);
}

function loadMap(event) {
    let codigoMapa = event.target.dataset.mapa;
    divMapa.src = urlInicio + codigoMapa;
}

printCities(ciudades, ulCiudades);


select.addEventListener('change', selectOption);

function selectOption(event) {
    let resultados = [];
    switch (event.target.value) {
        case '1':
            //buscar de la A-Z
            resultados = filterByName(ciudades, false);
            break;

        case '2':
            //buscar de la Z-A
            resultados = filterByName(ciudades, true);
            break;

        case '3':
            //buscar por numero de habitantes desc
            resultados = filterByNum(ciudades, true);
            break;

        case '4':
            //buscar por numero de habitantes asc
            resultados = filterByNum(ciudades, false);
            break;
        default:
            //cargar los valores iniciales
            break;
    }
    printCities(resultados, ulCiudades)
}

function filterByName(pList, pBoolean) {
    /* orden descendente */
    if (pBoolean) {
        return [...pList].sort((actual, siguiente) => { //el [...array] es para crear una copia virtual del array ya que el sort modifica el original. por eso va a salir el toSorted() pero aun no esta disponlible para todos los nav. solo chrome.
            return actual.nombre < siguiente.nombre ? 1 : -1;
        }); //si no le ponemos nada esto ya lo ordena de A-Z.  .sort utiliza el bubblesort.
    } else {
        /* orden ascendente A-Z pk ascendente empieza por A(regla pnemotec) */
        return [...pList].sort((actual, siguiente) => {
            return actual.nombre > siguiente.nombre ? 1 : -1;
        });
    }
}


//ordenacion numerica

function filterByNum(pList, pBoolean) {
    if (pBoolean) {
        //orden ascendente
        return [...pList].sort((actual, siguiente) => { return siguiente.habitantes - actual.habitantes });
    } else {
        //orden descendente
        return [...pList].sort((actual, siguiente) => { return actual.habitantes - siguiente.habitantes });
    }
}


