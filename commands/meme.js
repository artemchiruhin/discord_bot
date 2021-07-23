const Discord = module.require("discord.js");
const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

module.exports.run = async (bot, message, args) => {
    let links = [];
    const getHTML = async (url) => {
        const { data } = await axios.get(url);
        return cheerio.load(data);
    }
    const $ = await getHTML('https://trinixy.ru/demotivators/');
    const pagesCount = $('.navigation-inner a').eq(-2).text();
    const randomPage = Math.floor(Math.random() * (pagesCount - 1 + 1)) + 1;
    for(let i = 1; i <= Number(pagesCount); i++) {
        const selector = await getHTML(`https://trinixy.ru/demotivators/page/${i}/`);
        selector('article.typical').each((index, element) => {
        const memeLink = selector(element).find('.newsarea > img').attr('src');
        links.push(memeLink);
        fs.appendFile('inc/memes.txt', memeLink.replace('undefined', '').trim() + "\n", (err) => {
            if (err) throw err;
            console.log(`Ссылка ${memeLink} записана`);
            });
        });
    }
    try {
        const random = Math.floor(Math.random() * links.length);
        if(links[random] !== undefined) {
            message.channel.send("Смешно. Смеёмся.", {files: [links[random]]});
        } else {
            message.channel.send("Смешно. Смеёмся.", {files: ["inc/nomeme.png"]});
        }
    } catch {
        message.channel.send("Мема не будет :(");
    }
};
module.exports.help = {
    name: "meme"
}