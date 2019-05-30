module.exports =  {
    token: "",
    prefix: ".",
    color: 0x00AE86,
    development: false,
    debug: true,
    economy: {
        currencyName: "TwoBits",
        currencyLogo: "https://i.imgur.com/JL1ogMT.png",
        dailyAmount: 15,
        gamble: {
            max: 2000
        }
    },
    guilds: {
        staff: ""
    },
    roles: [
        "", //owner
        "", //admin
        "", //mod
        "" //trail mod
    ],
    database: {
        host: "localhost",
        user: "root",
        database: ""
    },
    website: {
        port: 3000,
        title: "",
        links: {
            donate: "",
            discord: ""
        }
    }
};