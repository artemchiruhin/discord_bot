const Discord = module.require("discord.js");
module.exports.run = async (bot, message, args) => {
    if (!message.member.hasPermission("ADMINISTRATOR")) {
        return message.channel.send("Только админ может сделать это!");
    }
    if(!args[0] || !Number.isInteger(parseInt(args[1]))) {
        return message.channel.send("Введите корректные данные!");;
    }
    // Пользователи в канале
    const channel = message.guild.channels.cache.find(c => c.name == args[0]);
    if(!channel) {
        return message.channel.send("Такого канала нет!");
    }
    const members = channel.members;
    if(parseInt(args[1]) > members.size) {
        return message.channel.send("Маньяков не может быть больше игроков!");
    }
    // Ники пользователей
    const names = [];
    members.forEach(member => {
        names.push(member.user.username);
    });
    // Команда маньяков
    let maniacs = [];
    while(true) {
        // Случайное число
        let random = Math.floor(Math.random() * members.size);
        // Если человека нет в команде маньяков
        if(!maniacs.includes(names[random])) {
            // То добавить его
            maniacs.push(names[random]);
        }
        // Если команда полная, то выйти из цикла
        if(maniacs.length === parseInt(args[1])) {
            break;
        }
    }
    
    // Отформатированное сообщение
    const embed = new Discord.MessageEmbed()
    .setColor('#0099ff')
    .setTitle('Маньяк в CS:GO');
    // Текст в описании
    let text = "";
    for(let i = 0; i < maniacs.length; i++) {
        text += maniacs[i] + "\n";
    }

    if(text === "") {
        text = "Нет игроков";
    }

    embed.addField("Команда маньяков:", text);
    
    message.channel.send(embed);
};
module.exports.help = {
    name: "maniac"
}