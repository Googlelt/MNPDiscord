module.exports = async (client, msg) => {
    let userData = (await client.db.query(`SELECT * FROM users WHERE id = '${msg.author.id}'`));

    if(userData.length < 1) {
        await client.db.execute(`INSERT INTO users VALUES ('${msg.author.id}', 0, '0')`);

        userData = (await client.db.query(`SELECT * FROM users WHERE id = '${msg.author.id}'`));
    }

    return userData;
};