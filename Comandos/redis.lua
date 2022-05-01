import app from "../app";

export class ContainerRepo {
    const redisClient = createClient({
        url: process.env.REDIS_CONNECTION
    });

    const connection = await redisClient.connect();
    public getAllSapcesByCountry(country:string, destCountry:string): Promise<any> {

        const key = 'getAllSapcesByCountry'+country+destCountry;

        return app.locals.redis.get(key)
        .then((value: any) => {

            if( value ) return JSON.parse(value);

            return app.locals.containerModel
            .find({country: country, destCountry: destCountry} )
            .then( (arr: any) => {

                app.locals.redis
                    .set(key, JSON.stringify(arr), { EX:10 });

                    return arr;
            });
        });
    }
}


redisClient.on('error', (err) => console.log('Redis Client Error', err));


redisClient.connect().then(() => {});