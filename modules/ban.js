module.exports = (client) => {
    setInterval(async () => {
        let bans = (await client.db.raw.query(`SELECT * FROM bans`))[0];

        bans.map(ban => {
            if(604800000 < (Date.now() - ban.date)) {
                try {
                    client.guilds.get(client.config.guilds.staff).members.unban(ban.id).then(() => {
                        client.db.execute(`DELETE FROM bans WHERE id = '${ban.id}'`);
                    })
                }catch(err) {
                    console.log(err);
                }
            }
        });
    }, 300000);

}