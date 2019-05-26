const express = require("express");
const expressLayouts = require("express-ejs-layouts");

const app = express();

module.exports = (client) => {
    app.use(expressLayouts);

    app.set("view engine", "ejs");
    app.set("views", `${__dirname}/views`);
    app.use(express.static(`${__dirname}/public`));

    app.get("/", (req, res) => {
        res.render("index", {
            client: client,
        });
    });

    app.get("/rules", (req, res) => {
        res.render("rules", {
            client: client,
            header: "Rules"
        });
    });

    app.get("/staff", (req, res) => {
        res.render("staff", {
            client: client,
            header: "Staff Team"
        });
    });

    app.get("/stats", (req, res) => {
        res.render("stats", {
            client: client,
            header: "Stats",
            mem: process.memoryUsage().heapUsed / 1024 / 1024
        });
    });

    app.get("/leaderboard", async (req, res) => {
        // let results = await Promise.all((await client.db.query("SELECT * FROM users ORDER BY balance"))[0].map(row => {
        //     return client.utils.getUserInfo(client, row);
        // }));

        let results = await (await client.db.query("SELECT * FROM users ORDER BY balance DESC"));

        let resultsNew = [];

        results.map(row => {
            let user = client.users.get(row.id);
            if(!user) return;

            row.username = user.username;
            row.tag = user.tag;
            row.avatar = user.displayAvatarURL({ size: 32 });

            resultsNew.push(row);
        });

        res.render("leaderboard", {
            client: client,
            headers: "Leaderboard",
            results: resultsNew
        });
    });

    app.listen(process.env.PORT || client.config.website.port);
};