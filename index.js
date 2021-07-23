const Discord = require('discord.js');
const bot = new Discord.Client();
bot.commands = new Discord.Collection();
// Файловая система
const fs = require('fs');
// Конфиг бота
const config = require('./botconfig.json');
// Токен бота
const token = config.token;
// Префикс для команд
const prefix = config.prefix;
// Получение всех команд
fs.readdir('./commands/', (error, files) => {
    if(error) {
        console.log(error);
    }
    const jsFiles = files.filter(file => file.split(".").pop() === "js");
    jsFiles.forEach((file, i) => {
        const props = require(`./commands/${file}`);
        bot.commands.set(props.help.name, props);
    });
});

bot.on('ready', () => {
	console.log(`Запущен бот ${bot.user.username}!`);
    bot.generateInvite({
        permissions: ["ADMINISTRATOR"],
    })
    .then(link => {
        console.log(link);
    })
    .catch(console.error);
});

bot.on('message', async message => {
    if(message.author.bot) {
        return;
    }
    // Массив слов из строки
    const messageArray = message.content.trim().split(" ");
    // Команда
    const command = messageArray[0].toLowerCase().trim();
    // Аргументы
    const args = messageArray.slice(1);

    if(!message.content.startsWith(prefix)) {
        return;
    }
    // Получение команды из списка команд
    const cmd = bot.commands.get(command.slice(prefix.length))
    // Если команда есть, то запуск
    if(cmd) {
        cmd.run(bot, message, args);
    } else {
        message.channel.send("Такой команды я не знаю!");
    }
})

bot.login(token);