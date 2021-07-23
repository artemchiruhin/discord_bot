const Discord = module.require("discord.js");
const axios = require('axios');
module.exports.run = async (bot, message, args) => {
    if(!args[0]) {
        axios.get("https://www.cbr-xml-daily.ru/daily_json.js")
            .then(response => message.channel.send(`Курс ${response.data.Valute.USD.Name} - ${response.data.Valute.USD.Value} руб.\nКурс ${response.data.Valute.EUR.Name} - ${response.data.Valute.EUR.Value} руб.`));
    } else {
        axios.get("https://www.cbr-xml-daily.ru/daily_json.js")
            .then(response => response.data.Valute[args[0]] ? message.channel.send(`Курс ${response.data.Valute[args[0]].Name} - ${response.data.Valute[args[0]].Value} руб.`) : message.channel.send("Такой валюты нет!"))
    }
};
module.exports.help = {
    name: "currency"
}