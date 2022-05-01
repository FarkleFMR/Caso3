use taquitosTest
db.tacos.insertMany(
    [
        {
            "nombre":"Pastor", 
            "sku":5,
            "precio":"10$"
        },
        {
            "nombre":"Birria",
            "sku":2,
            "precio":"12$"
        },
        {
            "nombre":"Choriz",
            "sku":3,
            "precio":"15$"
        }
    ]
)

db.tacos.find().pretty();

use Jenaro
db.prueba.save({"Jenaro":"Murillo"})
db.prueba.find().pretty();