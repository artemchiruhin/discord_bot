const Discord = module.require("discord.js");
const axios = require('axios');
const cheerio = require('cheerio');
module.exports.run = async (bot, message, args) => {
    let jokes = [];
    const getHTML = async (url) => {
        const { data } = await axios.get(url);
        return cheerio.load(data);
    }
    const selector = await getHTML('https://www.anekdot.ru');
    selector('.topicbox').each((i, element) => {
        const joke = selector(element).find('.text').text();
        jokes.push(joke);
    });
    const random = Math.floor(Math.random() * jokes.length);
    try {
        const embed = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle('Шутка от бота')
        .addField('Разрывная!!!', jokes[random]);
        message.channel.send(embed);
    } catch {
        message.channel.send("Шутки не будет :(");
    }
};
module.exports.help = {
    name: "joke"
}