module.exports.get = async (client, userID) => {
    let userData = JSON.parse(await client.redis.get(`user_${userID}`));

    let hasToReCache = false;

    if(!userData) {
        userData = await client.db.query(`SELECT * FROM users WHERE id = '${userID}'`);

        if(!userData) {
            await client.db.execute(`INSERT INTO users VALUES ('${userID}', '0', '0', '0', '0', '0', '0', '0')`);

            userData = await client.db.query(`SELECT * FROM users WHERE id = '${userID}'`);
        }

        hasToReCache = true;
    }

    if(hasToReCache) {
        await client.redis.set(`user_${userID}`, JSON.stringify(userData));

        console.log(`Recaching for ${client.users.get(userID).tag}`);
    }

    return userData;
};

module.exports.update = async (client, userID, field) => {
    let userData = await JSON.parse(await client.redis.get(`user_${userID}`));

    if(field instanceof Array) {
        field.map(async row => {
            userData[row.name] = row.value;

            await client.redis.set(`user_${userID}`, JSON.stringify(userData));

            await client.db.execute(`UPDATE users SET ${row.name} = '${row.value}' WHERE id = '${userID}'`);
        });
    }else {
        userData[field.name] = field.value;

        await client.redis.set(`user_${userID}`, JSON.stringify(userData));
        await client.db.execute(`UPDATE users SET ${field.name} = '${field.value}' WHERE id = '${userID}'`);
    }
    
    return;
}