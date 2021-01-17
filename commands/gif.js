const fetch = require('node-fetch');
const { using_giphy } = require('../config.json');

module.exports = {
  name: 'gif',
  description: 'Procura um gif com um termo inserido - Powered by Tenor (Paga nóis).',
  args: true,
  usage: '<termo(s) para pesquisa>',
  async execute(msg, args) {
    let termo = '';

    if (msg.mentions.size)
      return msg.channel.send('Não precisa marca ngm burro! Só coloca um termo pra pesquisa caralho')


    if (args.length > 1) {
      termo = args.join('-');
    }
    else {
      termo = args.shift();
    }

    console.log(using_giphy);

    if (using_giphy) {
      let url = `https://api.giphy.com/v1/gifs/search?api_key=${process.env.GIPHY_KEY}&q=${termo}&limit=10&lang=pt`;
      let response = await fetch(url);
      let json = await response.json();
      // console.log(url);
      let index = Math.floor(Math.random() * json.data.length);
      return msg.channel.send(json.data[index].url);
    }
    else {
      let url = `https://api.tenor.com/v1/search?key=${process.env.TENOR_KEY}&q=${termo}&locale=pt_BR&contentFilter=off&media_filter=basic&ar_range=standard&limit=10`
      let response = await fetch(url);
      let json = await response.json();
      // console.log(url);
      let index = Math.floor(Math.random() * json.results.length);
      return msg.channel.send(json.results[index].url);
    }
  }
}