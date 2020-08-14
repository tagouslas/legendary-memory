const fileUpload    = require('express-fileupload');
const cors          = require('cors');
const bodyParser    = require('body-parser');
const morgan        = require('morgan');
const _             = require('lodash');
const fs            = require('fs');

const express       = require('express');
const app           = express();


// PUBLIC FILE INITIATION
app.use(express.static('public'));

// VIEW ENGINE CONFIGURATION
app.set('views', './views')
app.set('view engine', 'pug');

// ALLOW ALL DOWNLOADS
app.use(fileUpload({
    createParentPath: true
}));

// ADD MIDDLEWARES
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('dev'));

// URL ROUTES
// app.get('/', function (req, res) {
//     res.render('home', { title: 'Inicio'});
// });

app.get('/import', function (req, res) {
    res.render('import', { title: 'Import'});
});

app.get('/graph', function (req, res) {
    res.render('graph', { title: 'Graficos'});
});

app.post('/import/autoeva', function (req, res){
    try {
        // Return false if a file doesn't exist or isn't uploaded
        if(!req.files) {
            res.send({
                status: false,
                message: 'No file uploaded'
            });
        } else {
            // Use the name of the input field (i.e. "avatar") to retrieve the uploaded file
            let input_autoeva = req.files.import_autoeva;

            // Use the mv() method to place the file in upload directory (i.e. "uploads")
            input_autoeva.mv('./public/data/' + input_autoeva.name, ()=>{
                fs.rename('./public/data/' + input_autoeva.name, './public/data/datosAUTO.csv', function(err) {
                    if ( err ) console.log('ERROR: ' + err);
                });
            });
    
            // send response
            res.status(200);
            res.render('response_200', { title: 'Guardado', response: '200' });
        }
    } catch (err) {
        res.status(500).send(err);
    }
});

app.post('/import/estudiantes', function (req, res){
    try {
        // Return false if a file doesn't exist or isn't uploaded
        if(!req.files) {
            res.send({
                status: false,
                message: 'No file uploaded'
            });
        } else {
            // Use the name of the input field (i.e. "avatar") to retrieve the uploaded file
            let input_estudiantes = req.files.import_estudiantes;

            // Use the mv() method to place the file in upload directory (i.e. "uploads")
            input_estudiantes.mv('./public/data/' + input_estudiantes.name, ()=>{
                fs.rename('./public/data/' + input_estudiantes.name, './public/data/datosESTU.csv', function(err) {
                    if ( err ) console.log('ERROR: ' + err);
                });
            });
            
            

            // send response
            res.status(200);
            res.render('response_200', { title: 'Guardado', response: '200' });
        }
    } catch (err) {
        res.status(500).send(err);
    }
});

app.post('/import/coordinadores', function (req, res){
    try {
        // Return false if a file doesn't exist or isn't uploaded
        if(!req.files) {
            res.send({
                status: false,
                message: 'No file uploaded'
            });
        } else {
            // Use the name of the input field (i.e. "avatar") to retrieve the uploaded file
            let input_coordinadores = req.files.import_coordinadores;
            
            // Use the mv() method to place the file in upload directory (i.e. "uploads")
            input_coordinadores.mv('./public/data/' + input_coordinadores.name, ()=>{
                fs.rename('./public/data/' + input_coordinadores.name, './public/data/datosCOOR.csv', function(err) {
                    if ( err ) console.log('ERROR: ' + err);
                    res.status(500);
                });
            });

            // send response
            res.status(200);
            res.render('response_200', { title: 'Guardado', response: '200' });
        }
    } catch (err) {
        res.status(500).send(err);
    }
});



// THE APP START
app.listen(3000, function () {
    console.log('app listening on port 3000!')
});