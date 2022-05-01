docker run -d -p 27043:27017 --name ubertainerRouter2 mongo mongos --port 27017 --configdb repconfig/25.5.33.88:27018,25.0.1.62:27019 --bind_ip_all

sh.addShard("repcr/25.5.33.88:27020");
sh.addShard("repMexico/25.5.183.73:27023");
sh.addShard("repUsa/25.0.1.62:27021");
sh.addShard("repperu/25.8.115.21:27024");
sh.addShard("repPanama/25.52.12.172:27022")

sh.addShardTag("repcr", "costa_rica")
sh.addShardTag("repMex", "mexico")
sh.addShardTag("repUsa", "usa")
sh.addShardTag("repperu", "peru")
sh.addShardTag("repPanama", "panama")


sh.addTagRange( "ordenes.cliente",
                { pais: "costa_rica"},
                { pais: "costa_rica0"},
                "costa_rica"
              );

sh.addTagRange( "ordenes.cliente",
                { pais: "mexico"},
                { pais: "mexico0"},
                "mexico"
              );

sh.addTagRange( "ordenes.cliente",
                { pais: "panama"},
                { pais: "panama0"},
                "panama"
              );

sh.addTagRange( "ordenes.cliente",
                { pais: "usa"},
                { pais: "usa0"},
                "usa"
              );


sh.addTagRange( "ordenes.cliente",
                { pais: "peru"},
                { pais: "peru0"},
                "peru"
              );

sh.addTagRange( "ordenes.pedido",
                { ubicacion_actual: "costa_rica"},
                { ubicacion_actual: "costa_rica0"},
                "costa_rica"
              );

sh.addTagRange( "ordenes.pedido",
                { ubicacion_actual: "mexico"},
                { ubicacion_actual: "mexico0"},
                "mexico"
              );

sh.addTagRange( "ordenes.pedido",
                { ubicacion_actual: "panama"},
                { ubicacion_actual: "panama0"},
                "panama"
              );

sh.addTagRange( "ordenes.pedido",
                { ubicacion_actual: "usa"},
                { ubicacion_actual: "usa0"},
                "usa"
              );


sh.addTagRange( "ordenes.pedido",
                { ubicacion_actual: "peru"},
                { ubicacion_actual: "peru0"},
                "peru"
              );

sh.addTagRange( "ordenes.contenedor",
                { ubicacion_actual: "costa_rica"},
                { ubicacion_actual: "costa_rica0"},
                "costa_rica"
              );

sh.addTagRange( "ordenes.contenedor",
                { ubicacion_actual: "mexico"},
                { ubicacion_actual: "mexico0"},
                "mexico"
              );

sh.addTagRange( "ordenes.contenedor",
                { ubicacion_actual: "panama"},
                { ubicacion_actual: "panama0"},
                "panama"
              );

sh.addTagRange( "ordenes.contenedor",
                { ubicacion_actual: "usa"},
                { ubicacion_actual: "usa0"},
                "usa"
              );


sh.addTagRange( "ordenes.contenedor",
                { ubicacion_actual: "peru"},
                { ubicacion_actual: "peru0"},
                "peru"
              );

sh.addTagRange( "ordenes.barco",
                { ubicacion_actual: "costa_rica"},
                { ubicacion_actual: "costa_rica0"},
                "costa_rica"
              );

sh.addTagRange( "ordenes.barco",
                { ubicacion_actual: "mexico"},
                { ubicacion_actual: "mexico0"},
                "mexico"
              );

sh.addTagRange( "ordenes.barco",
                { ubicacion_actual: "panama"},
                { ubicacion_actual: "panama0"},
                "panama"
              );

sh.addTagRange( "ordenes.barco",
                { ubicacion_actual: "usa"},
                { ubicacion_actual: "usa0"},
                "usa"
              );


sh.addTagRange( "ordenes.barco",
                { ubicacion_actual: "peru"},
                { ubicacion_actual: "peru0"},
                "peru"
              );

sh.enableSharding("ordenes");
sh.shardCollection("ordenes.cliente", { pais : 1 } )
sh.shardCollection("ordenes.pedido", { ubicacion_actual : 1 } )
sh.shardCollection("ordenes.contenedor", { ubicacion_actual : 1 } )
sh.shardCollection("ordenes.barco", { ubicacion_actual : 1 } )

sh.addTagRange( "actualizacion.registro",
                { destino: "costa_rica"},
                { destino: "costa_rica0"},
                "costa_rica"
              );

sh.addTagRange( "actualizacion.registro",
                { destino: "mexico"},
                { destino: "mexico0"},
                "mexico"
              );

sh.addTagRange( "actualizacion.registro",
                { destino: "panama"},
                { destino: "panama0"},
                "panama"
              );

sh.addTagRange( "actualizacion.registro",
                { destino: "usa"},
                { destino: "usa0"},
                "usa"
              );


sh.addTagRange( "actualizacion.registro",
                { destino: "peru"},
                { destino: "peru0"},
                "peru"
              );

sh.addTagRange( "actualizacion.pedido",
                { ubicacion_actual: "costa_rica"},
                { ubicacion_actual: "costa_rica0"},
                "costa_rica"
              );

sh.addTagRange( "actualizacion.pedido",
                { ubicacion_actual: "mexico"},
                { ubicacion_actual: "mexico0"},
                "mexico"
              );

sh.addTagRange( "actualizacion.pedido",
                { ubicacion_actual: "panama"},
                { ubicacion_actual: "panama0"},
                "panama"
              );

sh.addTagRange( "actualizacion.pedido",
                { ubicacion_actual: "usa"},
                { ubicacion_actual: "usa0"},
                "usa"
              );


sh.addTagRange( "actualizacion.pedido",
                { ubicacion_actual: "peru"},
                { ubicacion_actual: "peru0"},
                "peru"
              );

sh.enableSharding("actualizacion");
sh.shardCollection("actualizacion.registro", { destino : 1 } )
sh.shardCollection("actualizacion.pedido", { ubicacion_actual : 1 } )