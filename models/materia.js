var mongoose = require('mongoose');
const config = require('../config/database');

//esquema de materias
var materiaEsquema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    codigo:{
        type: String,
        required: true
    },
    periodo:{
        type: Number,
        required: true
    },
    prelacion1:{
        type: String,
        required: false
    },
    prelacion2:{
        type: String,
        required: false
    },
    antelacion1:{
        type: String,
        required: false
    },
    antelacion2:{
        type: String,
        required: false
    },
    antelacion3:{
        type: String,
        required: false
    },
    creditosParaVer:{
        type: Number,
        required: false
    },
    T1:{
        type: Boolean,
        required: true
    },
    T2:{
        type: Boolean,
        required: true
    },
    T3:{
        type: Boolean,
        required: true
    }
});

var Materia = module.exports = mongoose.model('Materia', materiaEsquema);

//get materias
module.exports.getMaterias = function(callback, limit){
    Materia.find(callback).limit(limit);
}

module.exports.getMateriasById = function(id, callback){
    Materia.findById(id, callback);
}

//agregar materias
module.exports.addMateria = function(materia, callback){
    Materia.create(materia, callback);
}

//actualizar materia
module.exports.updateMateria = function(id, materia, options, callback){
    var query = {_id: id};
    var update = {
        name: materia.name
    }
    Materia.findOneAndUpdate(query, update, options, callback);
}

//no hay delete por ahora porque en realidad no borraremos algo del flujograma... creo