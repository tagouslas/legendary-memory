// DOM SELECTORS
let input_autoeva = document.querySelector('#input_autoeva');
let label_autoeva = document.querySelector('#label_autoeva');

// CHANGE THE LABEL VALUE WITH THE FILE NAME 
input_autoeva.addEventListener('change', () => {
    if (label_autoeva.value == "") {
        label_autoeva.innerHTML = "Elegir un archivo CSV...";
    }else{
        label_autoeva.innerHTML = String(input_autoeva.value);
    }
});

// DOM SELECTORS
let input_estudiantes = document.querySelector('#input_estudiantes');
let label_estudiantes = document.querySelector('#label_estudiantes');

// CHANGE THE LABEL VALUE WITH THE FILE NAME 
input_estudiantes.addEventListener('change', () => {
    if (label_estudiantes.value == "") {
        label_estudiantes.innerHTML = "Elegir un archivo CSV...";
    }else{
        label_estudiantes.innerHTML = String(input_estudiantes.value);
    }
});

// DOM SELECTORS
let input_coordinadores = document.querySelector('#input_coordinadores');
let label_coordinadores = document.querySelector('#label_coordinadores');

// CHANGE THE LABEL VALUE WITH THE FILE NAME 
input_coordinadores.addEventListener('change', () => {
    if (label_coordinadores.value == "") {
        label_coordinadores.innerHTML = "Elegir un archivo CSV...";
    }else{
        label_coordinadores.innerHTML = String(input_coordinadores.value);
    }
});