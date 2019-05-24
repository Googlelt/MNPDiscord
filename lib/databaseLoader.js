const mysql = require("mysql2/promise");
module.exports = async (client) => {
    let db = await mysql.createConnection({
        host: "localhost",
        user: "root",
        database: "mnp",
        queueLimit: 0,
        waitForConnections: false
    });

    client.db = db;

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

    await client.db.execute("CREATE TABLE IF NOT EXISTS users (id TEXT, balance BIGINT, lastDaily TEXT, afk_enabled TINYINT(4), afk_reason TEXT, afk_date BIGINT(20), afk_messages INT(11), afk_lastMessageDate BIGINT(20))");

    // await client.db.execute("CREATE TABLE IF NOT EXISTS users (id TEXT, balance BIGINT, lastDaily TEXT)");
};