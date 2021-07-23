const Discord = module.require("discord.js");
module.exports.run = async (bot, message, args) => {
    const random = Math.floor(Math.random() * (1 + 1));
    random === 0 ? message.channel.send(`<@${message.author.id}>, вам выпала решка`) : random === 1 ? message.channel.send(`<@${message.author.id}>, вам выпал орёл`) : message.channel.send(`Fatal error!`);
};
module.exports.help = {
    name: "coin"
}