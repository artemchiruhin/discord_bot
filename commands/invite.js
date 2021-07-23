const Discord = module.require("discord.js");
module.exports.run = async (bot, message, args) => {
    message.channel.createInvite({unique: true})
    .then(invite => {
        message.channel.send("Ссылка для приглашения: https://discord.gg/" + invite.code)
    }).catch(console.error);
};
module.exports.help = {
    name: "invite"
}