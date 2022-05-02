const mongoose = require('mongoose');

// const uri = 'mongodb://25.0.1.62:27021/pruebaApi'

const uri = 'mongodb://localhost:27017/test'

// const uriAct = 'mongodb://localhost:27017/actualizacion'

const db = mongoose.connection;

mongoose.connect(uriAct)
.catch(err=>console.log(err));

db.on('open',_=>{
    console.log('Base de datos conectada..')
});

db.on('error',err=>{
    console.log(err)
});

