var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var cors = require('cors');
const config = require('./config/database');

app.use(bodyParser.json());
app.use(cors());
const port = 3000;

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'DELETE, PUT');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
 });

Materia = require('./models/materia') 

//conectar a mongoose
mongoose.connect(config.database);

mongoose.connection.on('connected', ()=>{
    console.log('Conectado a la base de datos '+config.database);
});

mongoose.connection.on('error', (err)=>{
    console.log('ERROR de base de datos '+err);
});


app.get('/materias', function(req,res){
    console.log("conectando a materias")
    Materia.getMaterias(function(err, materias){
        if(err){
            throw err;
        }
        res.json(materias);
    });
});

app.post('/materias', function(req,res){
    var materia = req.body;
    Materia.addMateria(materia, function(err, materia){
        if(err){
            throw err;
        }
        res.json(materia);
    });
});

app.put('/materias/:id', function(req,res){
    var id = req.params.id;
    var materia = req.body;
    Materia.updateMateria(id, materia, {}, function(err, materia){
        if(err){
            throw err;
        }
        res.json(materia);
    });
});

app.get('/materias/:id', function(req,res){
    Materia.findById(req.params.id, function(err, materia){
        if(err){
            throw err;
        }
        res.json(materia);
    });
});


app.listen(port,()=>{
    console.log('conectado');
});