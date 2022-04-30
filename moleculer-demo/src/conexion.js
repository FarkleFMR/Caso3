const mongoose = require('mongoose');

const uri = 'mongodb://25.0.1.62:27021/pruebaApi'

const db = mongoose.connection;

mongoose.connect(uri)
.catch(err=>console.log(err));

db.on('open',_=>{
    console.log('Base de datos conectada..')
});

db.on('error',err=>{
    console.log(err)
});

