//Creo las variables y/o constante/s necesarias
let contenedor = document.getElementById("contador");
let boton = document.createElement("button");
let inputNuevo = document.createElement("input");
let parrafo = document.createElement("h1");
const body = document.getElementsByTagName('body')[0];

// Configuro los inputs 
inputNuevo.setAttribute("type", "datetime-local");
boton.textContent = "Añadir fecha";
inputNuevo.setAttribute("id", "input");
boton.setAttribute("id", "boton");
parrafo.setAttribute("id", "parrafo");

// Añado elementos al contenedor
contenedor.appendChild(inputNuevo);
contenedor.appendChild(boton);
contenedor.appendChild(parrafo);

//Creo los elementos de la fecha
let monthsElement = document.createElement('h2');
let daysElement = document.createElement('h2');
let hoursElement = document.createElement('h2');
let minsElement = document.createElement('h2');
let secondsElement = document.createElement('h2');

//Añado los elementos de la fecha al contenedor
contenedor.appendChild(monthsElement);
contenedor.appendChild(daysElement);
contenedor.appendChild(hoursElement);
contenedor.appendChild(minsElement);
contenedor.appendChild(secondsElement);

// Creo una variable global para la fecha objetivo
let fechaFutura; 

parrafo.innerHTML="Por favor, introduzca una fecha";

//Este método se encarga de realizar la cuenta atrás de la fecha que hemos puesto y también la muestra
const cuentaAtras = () => {
    let currentDate = new Date().getTime();
    let myDate = fechaFutura - currentDate;

    //Controlo que la fecha no sea nula
    if (myDate <= 0 ||isNaN(myDate)) {
        monthsElement.textContent = "Meses: 0";
        monthsElement.classList.add("negro");
        daysElement.textContent = "Días: 0";
        daysElement.classList.add("negro");
        hoursElement.textContent = "Horas: 0";
        hoursElement.classList.add("negro");
        minsElement.textContent = "Minutos: 0";
        minsElement.classList.add("negro");
        secondsElement.textContent = "Segundos: 0";
        secondsElement.classList.add("negro");
        clearInterval(contadorInterval);
        return;
    }//FinIf

    //Hago los cálculos para mostrar la cuenta atras
    let months = Math.floor(myDate / (1000 * 60 * 60 * 24 * 30));
    let days = Math.floor((myDate % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24));
    let hours = Math.floor((myDate % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let mins = Math.floor((myDate % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((myDate % (1000 * 60)) / 1000);

    //Muestro los elementos de la fecha y de paso les cambio el color
    monthsElement.textContent = `Meses: ${months}`;
    monthsElement.classList.add("negro");
    daysElement.textContent = `Días: ${days}`;
    daysElement.classList.add("negro");
    hoursElement.textContent = `Horas: ${hours}`;
    hoursElement.classList.add("negro");
    minsElement.textContent = `Minutos: ${mins}`;
    minsElement.classList.add("negro");
    secondsElement.textContent = `Segundos: ${seconds}`;
    secondsElement.classList.add("negro");

    
    //Cambio los colores de los meses
    colorCuentaAtras(months);
};

//Este método se encarga de cambiar el color de la cuenta atras dependiendo de la fecha seleccionada
const colorCuentaAtras = (months) => {
    //Dependiendo de lo cerca que esté la fecha, la fecha objetivo se pondrá de un color determinado
    if (months >= 2) {
        parrafo.className = "mostrarVerde";
    } else if (months < 2 && months >= 1) {
        parrafo.className = "mostrarAmarillo";
    } else if (months < 1) {
        parrafo.className = "mostrarRojo";
    }//FinElseIf
};

// Este método se encarga de validar la fecha introducida por el usuario
const validarFecha = () => {
    let fechaActual = new Date();
    let fechaIntroducida = new Date(inputNuevo.value);

    if (fechaIntroducida <= fechaActual) {
        alert("La fecha debe ser posterior a la actual.");
        return false;
    }//FinIf

    return true;
};

//Añado un evento al botón para añadir la fecha y empezar la cuenta atrás
boton.addEventListener("click", () => {
    if (inputNuevo.value && validarFecha()) {
        fechaFutura = new Date(inputNuevo.value).getTime();
        parrafo.textContent = `Fecha objetivo: ${inputNuevo.value}`;
        clearInterval(contadorInterval);
        contadorInterval = setInterval(cuentaAtras, 1000);
        cuentaAtras(); //Iniciar inmediatamente la cuenta atrás
    }//FinIf
});

//Inicio la cuenta atrás cuando el usuario se mete en la página web
let contadorInterval = setInterval(cuentaAtras, 1000);