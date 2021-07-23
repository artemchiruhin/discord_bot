const Discord = module.require("discord.js");
module.exports.run = async (bot, message, args) => {
    if (!message.member.hasPermission("ADMINISTRATOR")) {
        return message.channel.send("Только админ может сделать это!");
    }
    if(!args[0]) {
        return message.channel.send("Введите название канала!");
    }
    // Пользователи в канале
    const channel = message.guild.channels.cache.find(c => c.name == args[0]);
    if(!channel) {
        return message.channel.send("Такого канала нет!");
    }
    const members = channel.members;
    // Ники пользователей
    const names = [];
    members.forEach(member => {
        names.push(member.user.username);
    });
    // Команда А
    let teamA = [];
    while(true) {
        // Случайное число
        let random = Math.floor(Math.random() * members.size);
        // Если человека нет в команде А
        if(!teamA.includes(names[random])) {
            // То добавить его
            teamA.push(names[random]);
        }
        // Если команда полная, то выйти из цикла
        if(teamA.length === Math.ceil(members.size / 2)) {
            break;
        }
    }
    // Команда Б - все, кого нет в команде А
    let teamB = names.filter(x => !teamA.includes(x));
    // Отформатированное сообщение
    const embed = new Discord.MessageEmbed()
    .setColor('#0099ff')
    .setTitle('Команды для игры');
    // Текст в описании
    let text = "";
    for(let i = 0; i < teamA.length; i++) {
        text += teamA[i] + "\n";
    }

    if(text === "") {
        text = "Нет игроков";
    }

    embed.addField("Команда А:", text);

    text = "";
    for(let i = 0; i < teamB.length; i++) {
        text += teamB[i] + "\n";
    }

    if(text === "") {
        text = "Нет игроков";
    }

    embed.addField("Команда B:", text);
    
    message.channel.send(embed);
};
module.exports.help = {
    name: "teams"
}