module.exports.convertTime = (millisec) => {
    let seconds = (millisec / 1000).toFixed(0);
    let minutes = Math.floor(seconds / 60);
    let hours = "";
    if (minutes > 59) {
        hours = Math.floor(minutes / 60);
        hours = (hours >= 10) ? hours : "0" + hours;
        minutes = minutes - (hours * 60);
        minutes = (minutes >= 10) ? minutes : "0" + minutes;
    }
    seconds = Math.floor(seconds % 60);
    seconds = (seconds >= 10) ? seconds : "0" + seconds;
    if (hours != "") {
        return hours + ":" + minutes + ":" + seconds;
    }
    return minutes + ":" + seconds;
};

module.exports.getUserInfo = async (client, user) => {
    try {
        let data = client.users.get(user.id) || (await client.users.fetch(user.id));

        user.username = data.username;
        user.tag = data.tag;
        user.displayAvatarURL = data.displayAvatarURL({ size: 48 });

        return await user;
    }catch(err) {
        return;
    }
};

module.exports.capitalize = (text) => {
    return text.charAt(0).toUpperCase() + text.slice(1);
};