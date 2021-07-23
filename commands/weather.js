const Discord = module.require("discord.js");
const weather = require("weather-js");
module.exports.run = async (bot, message, args) => {
    if(!args[0]) {
        args[0] = "perm";
    }
    weather.find({
        search: args.join(" "),
        degreeType: `C`
    }, (error, result) => {
        if(error) {
            return message.channel.send(error);
        }
        if(result === undefined || result.length === 0) {
            return message.channel.send("Некорректная локация!");
        }
        const current = result[0].current;
        const location = result[0].location;

        const embed = new Discord.MessageEmbed()
        .setColor("#0099ff")
        .setAuthor(`Прогноз погоды для ${current.observationpoint}`)
        .setThumbnail(current.imageUrl)
        .setDescription(`**${current.skytext}**`)
        .addField(`Временная зона`, `UTC ${location.timezone}`, true)
        .addField(`Ед. измерения`, `Цельсий`, true)
        .addField(`Температура`, `${current.temperature}°`, true)
        .addField(`Ветер`, `${current.winddisplay}`, true)
        .addField(`Ощущается как`, `${current.feelslike}°`)
        .addField(`Влажность`, `${current.humidity}%`, true);

        message.channel.send(embed);
    });
};
module.exports.help = {
    name: "weather"
}