const fetch = require('node-fetch');

module.exports = {
  name: 'gif',
  description: 'Procura um gif com um termo inserido - Powered by Tenor (Paga nóis).',
  async execute(msg, args) {
    let termo = '';

    if (msg.mentions.size)
      return msg.channel.send('Não precisa marca ngm burro! Só coloca um termo pra pesquisa caralho')

    if (args.length == 0)
      return msg.reply(`Bota um termo para pesquisa ai porra`);
    else if (args.length > 1) {
      termo = args.join('-');
    }
    else {
      termo = args.pop();
    }

    let url = `https://api.tenor.com/v1/search?key=${process.env.TENOR_KEY}&q=${termo}&locale=pt_BR&contentFilter=off&media_filter=basic&ar_range=standard&limit=10`
    let response = await fetch(url);
    let json = await response.json();
    // console.log(json);
    return msg.channel.send(json.results[Math.floor(Math.random() * json.results.length)].url);
  }
}