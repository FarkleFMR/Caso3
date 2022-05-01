const redis = require('redis');

redisClient = createClient ({
	url: process.env.REDIS_CONNECTION
});

redisClient.on('error', (err) => console.log('Redis Client Error', err));

redisClient.connect().then(() => {
	getTacos("Costa Rica", "Mexico");
});

function spacesByCountry() {
    const key = 'spacesByCountry' + country + destCountry;
    return redis.get(key).then((value) => {
		if(!value) {
			return app.locals.containerModel
				.find({country: country, destCountry: destCountry} )
				.then( (arr) => {
					redis.set(key, JSON.stringify(arr), { EX:10 });
					return arr;
				});
		}
		return JSON.parse(value);
    });
};
