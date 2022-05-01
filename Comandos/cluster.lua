-- myHamachiIP: 25.5.183.73

-- Creo volumen LOCAL y su container
    docker volume create local_volume
    docker run -d -p 27023:27017 -v local_volume:/data/db --name Mexico mongo mongod --port 27017 --bind_ip_all --shardsvr --replSet "repMex" --dbpath /data/db

-- Creo volumen FORÁNEO y su container
    docker volume create foreign_volume
    docker run -d -p 27020:27017 -v foreign_volume:/data/db --name MexicoRep mongo mongod --port 27017 --bind_ip_all --shardsvr --replSet "repcr" --dbpath /data/dbls

-- Inicio la replicaSet
    rs.initiate(
      {
        _id: "repMex",
        members: [
          { _id : 0, host : "25.5.183.73:27023" },
          { _id : 1, host : "25.0.1.62:27023" }
        ]
      }
    );

-- Forzar que nuestro servidor sea primario cada vez que se inicia.
  cfg = rs.conf();
  cfg.members[0].priority = 1;
  cfg.members[1].priority = 0.5;
  rs.reconfig(cfg);

-- Crear el arbitro
    docker run -d -p 27033:27017 --narsme arbMex mongo mongod --port 27017 --replSet "repMex"

-- Dentro del servidor principal:
    rs.addArb("25.5.183.73:27033");

-- Prueba de conexión con USA(Fabián)
    docker exec -it Mexico mongo
    use pruebaMexico

    db.tacos.save({"nombre":"Pastor", "cantidad":5});
    db.tacos.save({"nombre":"Birria", "cantidad":2});
    db.tacos.save({"nombre":"Chorizo", "cantidad":3});

    db.tacos.find();

docker start Mexico
docker start MexicoRep

docker exec -it Mexico mongo
docker exec -it MexicoRep mongo



