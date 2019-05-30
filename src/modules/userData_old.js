module.exports.get = async (client, userID) => {
    console.time(`UserData for ${client.users.get(userID).tag}`);

    // let userData = (await client.db.query(`SELECT * FROM users WHERE id = '${userID}'`));

    let userData = await client.redis.get(`users_${userID}`);

    if(!userData) {
        userData = await client.db.query(`SELECT * FROM users WHERE id = '${userID}'`);

        if(!userData) {
            await client.db.execute(`INSERT INTO users VALUES ('${userID}', '0', '0', '0', '0', '0', '0', '0')`);

            userData = await client.db.query(`SELECT * FROM users WHERE id = '${userID}'`);

            await client.redis.set(`users_${userID}`, JSON.stringify(userData));
        }else {
            await client.redis.set(`users_${userID}`, JSON.stringify(userData));

            userData = userData
        }

        // userData = (await client.db.query(`SELECT * FROM users WHERE id = '${userID}'`));
    }

    console.timeEnd(`UserData for ${client.users.get(userID).tag}`);

    return userData;
};

module.exports.update = async (client, userID) => {
    
}