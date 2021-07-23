const Discord = module.require("discord.js");
// Файловая система
const fs = require('fs');
module.exports.run = async (bot, message, args) => {
    fs.readFile('commands/commands.json', "utf8", (error, data) => {
        if(error) {
            console.log(error);
            process.exit();
        }
        // Отформатированное сообщение
        const embed = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle('Что я умею (Я умный!!!)');
        data = JSON.parse(data);
        for(item in data) {
            embed.addField("!" + data[item].name + " " + data[item].emoji, data[item].description);
        }
        message.channel.send(embed);
    });
};
module.exports.help = {
    name: "help"
}