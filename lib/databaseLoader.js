const mysql = require("mysql2/promise");

module.exports = async (client) => {
    let db = await mysql.createConnection(client.config.database);

    client.db = {
        query: async (sql) => (await db.query(sql))[0][0],
        execute: async (sql) => (await db.execute(sql)),
        raw: db
    };

    // const cacheDB = new sqlite("", { verbose: console.log, memory: true });
    //
    // client.db = {
    //     query: async (sql) => {
    //         let cached = cacheDB.prepare(sql).get();
    //
    //         if(cached === undefined) {
    //             let data = (await db.query(sql))[0];
    //
    //             if(data !== undefined) {
    //                 return data;
    //             }
    //         }
    //
    //         console.log(cached);
    //     },
    //     execute: async (sql) => {
    //         cacheDB.exec(sql);
    //         // await db.execute(sql);
    //     }
    // };
    //
    // console.log(client.db);

    await db.execute("CREATE TABLE IF NOT EXISTS users (id TEXT, balance BIGINT, lastDaily BIGINT(20), afk_enabled TINYINT(4), afk_reason TEXT, afk_date BIGINT(20), afk_messages INT(11), afk_lastMessageDate BIGINT(20))");

    await db.execute("CREATE TABLE IF NOT EXISTS settings (name TEXT, value TEXT)");

    await db.execute("CREATE TABLE IF NOT EXISTS bans (id TEXT, date BIGINT)");

    let requiredValues = [
        {
            name: "welcome",
            value : {
                enabled: false,
                channel: null
            }
        }
        // {
        //     name: "welcomeenabled",
        //     value: "0"
        // },
        // {
        //     name: "welcomechannel",
        //     value: "0"
        // }
    ];

    let values = (await db.query("SELECT * FROM settings"))[0].map(row => {
        return row.name;
    });

    requiredValues.map(async row => {
        if(values.includes(row.name)) return;

        await db.execute(`INSERT INTO settings VALUES ('${row.name}', '${JSON.stringify(row.value)}')`);
    });
};