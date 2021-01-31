const { defaultPrefix } = require('../config.json');

module.exports = {
  name: 'convite',
  description: 'Manda o link para convidar o Bot para outros servidores.',
  args: false,
  aliases: ['convidar', 'link'],
  execute(msg, args, prefix = defaultPrefix) {
    msg.react('💯').catch(err => console.error(`Não consegui reagir a mensagem de ${msg.author.tag}.\n`, err));
    const data = [];
    data.push(`Para convidar o bot, basta clicar no seguinte link:`);
    data.push(`https://discord.com/oauth2/authorize?client_id=799425639219462176&scope=bot&permissions=11328`);
    return msg.send(data);
  }
}