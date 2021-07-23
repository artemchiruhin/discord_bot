const Discord = module.require("discord.js");
module.exports.run = async (bot, message, args) => {
    const random = Math.floor(Math.random() * 99);
    message.channel.send(`<@${message.author.id}>, вам выпало число ${random}`);
};
module.exports.help = {
    name: "rand"
}