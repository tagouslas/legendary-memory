// CHART TITLES (Utilities)
const rowTitles   = ['Conocimiento disciplinar', 'Comunicación', 'Competencias digitales', 'Pedagogía y didáctica', 'Evaluación', 'Disposición y motivación'];
const columnNames = ['CATEGORÍAS DE EVALUACIÓN', 'DOCENTE', 'ESTUDIANTES', 'COORDINACIÓN', 'PROMEDIO'];

// TABLES AVERAGE FOR EACH EVALUATION CATEGORIES
let average_CDIS    = [];
let average_COM     = [];
let average_CDIG    = [];
let average_PD      = [];
let average_EVA     = [];
let average_DyM     = [];

let averages_Total_autoeva       = [];
let averages_Total_estudiantes   = [];
let averages_Total_coordinadores = [];
let averages_Total_promedio      = [];

let edu_programs    = [];
let professors      = [];

let professor_selected;
let program_selected;

// DOM SELECTORS
let btn_ver             = document.querySelector('#ver');
let select              = document.querySelector('#prof');
let columnsContainer    = document.querySelector('#columnsContainer');
let rowsContainer       = document.querySelector('#rowsContainer');
let text_nombre         = document.querySelector('#nombre');
let text_programa       = document.querySelector('#programa');


// LOAD THE PROGRAM FOR INIT ALL 
document.addEventListener('DOMContentLoaded',()=>{
    start();
});

// LOAD THE PROGRAM FOR THE PROFESSOR SELECTED
btn_ver.addEventListener('click', ()=>{
    professor_selected = select.value;
    start(professor_selected);
});

// CORE FUNCTIONS
async function start(prof) {
    await dropData();
    await getData(prof);
    await fillUpDOM(professors);
    await tableIt();
    await graphIt();
    
}

async function getData(prof){
    

    // AUTOEVALUACIÓN
    const response_autoeva  = await fetch('/data/datosAUTO.csv');
    const data_autoeva      = await response_autoeva.text();
    const table_autoeva     = await data_autoeva.split('\n').slice(1);

    table_autoeva.forEach(row => {
        let columns    = row.split(';'||',');

        professors  .push(columns[7]);
        edu_programs.push(columns[10]);

        if (String(prof) == String(columns[7])) {
            average_CDIS .push((Number(columns[11]) + Number(columns[12]))/2);
            average_COM  .push((Number(columns[13]) + Number(columns[14]))/2);
            average_CDIG .push((Number(columns[15]) + Number(columns[16]) + Number(columns[17]))/3);
            average_PD   .push((Number(columns[18]) + Number(columns[19]) + Number(columns[20]) + Number(columns[21]) + Number(columns[22]))/5);
            average_EVA  .push((Number(columns[23]) + Number(columns[24]) + Number(columns[25]))/3);
            average_DyM  .push((Number(columns[26]) + Number(columns[27]) + Number(columns[28]) + Number(columns[29]))/4);
            program_selected = columns[10];
        }
    });

    professors   = await removeDuplicates(professors);
    edu_programs = await removeDuplicates(edu_programs);
    professors  .pop();
    edu_programs.pop();
    
    averages_Total_autoeva.push(
        await doTableAverage(average_CDIS), 
        await doTableAverage(average_COM), 
        await doTableAverage(average_CDIG), 
        await doTableAverage(average_PD), 
        await doTableAverage(average_EVA),
        await doTableAverage(average_DyM)
    );
    await emptyAverageTables();
    

    // ESTUDIANTES
    const response_estudiantes  = await fetch('/data/datosESTU.csv');
    const data_estudiantes      = await response_estudiantes.text();
    const table_estudiantes     = await data_estudiantes.split('\n').slice(1); 

    
    table_estudiantes.forEach(row => {
        let columns    = row.split(';'||',');

        professors  .push(columns[11]);
        edu_programs.push(columns[9]);

        if (String(prof) == String(columns[11])) {
            average_CDIS .push((Number(columns[13]) + Number(columns[14]))/2);
            average_COM  .push((Number(columns[17]) + Number(columns[18]))/2);
            average_CDIG .push((Number(columns[20]) + Number(columns[21]) + Number(columns[22]))/3);
            average_PD   .push((Number(columns[24]) + Number(columns[25]) + Number(columns[26]) + Number(columns[27]) + Number(columns[28]))/5);
            average_EVA  .push((Number(columns[30]) + Number(columns[31]) + Number(columns[32]))/3);
            average_DyM  .push((Number(columns[35]) + Number(columns[36]) + Number(columns[37]) + Number(columns[38]))/4);
        }
    });

    professors   = await removeDuplicates(professors);
    edu_programs = await removeDuplicates(edu_programs);
    professors.pop();
    edu_programs.pop();
    

    await averages_Total_estudiantes.push(
        await doTableAverage(average_CDIS), 
        await doTableAverage(average_COM), 
        await doTableAverage(average_CDIG), 
        await doTableAverage(average_PD), 
        await doTableAverage(average_EVA),
        await doTableAverage(average_DyM)
    );
    await emptyAverageTables();
    

    // COORDINADORES
    const response_coordinadores  = await fetch('/data/datosCOOR.csv');
    const data_coordinadores      = await response_coordinadores.text();
    const table_coordinadores     = await data_coordinadores.split('\n').slice(1);

    table_coordinadores.forEach(row => {
        let columns    = row.split(';'||','||'","');

        professors  .push(columns[7]);
        edu_programs.push(columns[10]);

        if (String(prof) == String(columns[7])) {
            average_CDIS .push((Number(columns[11]) + Number(columns[12]))/2);
            average_COM  .push((Number(columns[13]) + Number(columns[14]))/2);
            average_CDIG .push((Number(columns[15]) + Number(columns[16]) + Number(columns[17]))/3);
            average_PD   .push((Number(columns[18]) + Number(columns[19]) + Number(columns[20]) + Number(columns[21]) + Number(columns[22]))/5);
            average_EVA  .push((Number(columns[23]) + Number(columns[24]) + Number(columns[25]))/3);
            average_DyM  .push((Number(columns[26]) + Number(columns[27]) + Number(columns[28]) + Number(columns[29]))/4);
        }
    });

    professors   = await removeDuplicates(professors);
    edu_programs = await removeDuplicates(edu_programs);
    professors.pop();
    edu_programs.pop();

    averages_Total_coordinadores.push(
        await doTableAverage(average_CDIS), 
        await doTableAverage(average_COM), 
        await doTableAverage(average_CDIG), 
        await doTableAverage(average_PD), 
        await doTableAverage(average_EVA),
        await doTableAverage(average_DyM)
    );
    await emptyAverageTables();
    
    // PROMEDIO
    for (let i = 0; i < rowTitles.length; i++) {
        await averages_Total_promedio.push(
            await doTableAverage([averages_Total_autoeva[i], averages_Total_estudiantes[i], averages_Total_coordinadores[i]])
        ); 
    }
    
}

async function graphIt() {
    await createGraph('graph-autoeva', 'Autoevaluación', averages_Total_autoeva, '#48dbfb9f');
    await createGraph('graph_estudiantes', 'Estudiantes', averages_Total_estudiantes, '#ff9f439f');
    await createGraph('graph-coordinadores', 'Coordinadores', averages_Total_coordinadores, '#1dd1a19f');
    await createGraph('graph_promedios', 'Promedios', averages_Total_promedio, '#ff9ff39f');
}

async function tableIt() {
    
    // PLACE THE TABLE TITLES
    await columnNames.forEach(columnName => {
        columnsContainer.innerHTML += "<th>"+columnName+"</th>";
    });

    // FILL UP EACH TABLE ROWS
    for (let i = 0; i < rowTitles.length; i++) {
        rowsContainer.innerHTML += "<tr>" 
                                +   "<td>"+rowTitles[i]+"</td>"
                                +   "<td style='color: #48dbfb'>"+averages_Total_autoeva[i]+"</td>"
                                +   "<td style='color: #ff9f43'>"+averages_Total_estudiantes[i]+"</td>"
                                +   "<td style='color: #1dd1a1'>"+averages_Total_coordinadores[i]+"</td>"
                                +   "<td style='color: #ff9ff3'>"+averages_Total_promedio[i]+"</td>"
                                +   "</tr>";
    }

}

async function fillUpDOM(table){
    table.forEach(element => {
        select.innerHTML += '<option>'+element+'</option>';
    });

    text_nombre.innerHTML   = "Nombre: "    + professor_selected;
    text_programa.innerHTML = "Programa: "  + program_selected;
}

// UTILS FUNCTIONS
async function dropData(){
    averages_Total_autoeva       = [];
    averages_Total_estudiantes   = [];
    averages_Total_coordinadores = [];
    averages_Total_promedio      = [];
    average_CDIS    = [];
    average_COM     = [];
    average_CDIG    = [];
    average_PD      = [];
    average_EVA     = [];
    average_DyM     = [];
    edu_programs    = [];
    professors      = [];
    select.innerHTML            = "<option selected >Elegir...</option>";
    columnsContainer.innerHTML  = "";
    rowsContainer.innerHTML     = "";
}

async function emptyAverageTables(){
    average_CDIS    = [];
    average_COM     = [];
    average_CDIG    = [];
    average_PD      = [];
    average_EVA     = [];
    average_DyM     = [];
}

async function createGraph(idCanva, title, data, bg_color){
    const canva = document.getElementById(idCanva).getContext('2d');
    const chart = new Chart(canva, {
        // The type of chart we want to create
        type: 'radar',

        // The data for our dataset
        data: {
            labels: rowTitles,
            datasets: [{
                label: title,
                fill: true,
                backgroundColor: bg_color,
                borderColor: 'black',
                borderWidth: 2,
                data: data
            }]
        },

        // Configuration options go here
        options: {
            tooltips :{
                enabled : false
            },
            scale: {
                angleLines: {
                    display: true
                },
                ticks: {
                    suggestedMin: 0,
                    suggestedMax: 5,
                }
            },
            legend: {
                labels: {
                    // This more specific font property overrides the global property
                    fontColor: 'black',
                    fontSize: 20
                }
            }
        }
    });
}

async function doTableAverage(table){
    let result = 0;
    let sum = 0;
    for (let i = 0; i < table.length - 1; i++) {
        sum += Number(table[i]);
        
    }
    result = Number(sum / (table.length - 1));
    return Math.round(result * 100) / 100;
}

async function removeDuplicates(table){
    let unique = {};

    table.forEach(function(i){
        if (!unique[i]) {
            unique[i] = true;
        }
    });
    return Object.keys(unique);
}
