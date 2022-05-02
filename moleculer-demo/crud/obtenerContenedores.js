require('../src/conexion');
const redis = require("redis"); 
const ContenedorModel = require('../models/Contenedor');

async function buscarContenedores(pPais){

    const redisClient = redis.createClient({
        socket: {
          host: '25.5.33.88',
          port: 6380
        }
    });

    await redisClient.connect();
   
    try{
        const reply = await redisClient.get(pPais);
        
        if (reply){
            console.log("usando los datos de la cache");
            return JSON.parse(reply)
        }

        const contenedores = await ContenedorModel.find({ubicacion_actual:pPais});
        const saveResult = await redisClient.set(
            pPais,
            JSON.stringify(contenedores), { EX: 15,}
        );
        await redisClient.disconnect();
        return contenedores
    } catch (error){
        console.log(error);    
    }
}

async function buscarContenedor(pId){
    const contenedor = await ContenedorModel.find({_id:pId});
    return contenedor
}

module.exports = { buscarContenedores, buscarContenedor }
