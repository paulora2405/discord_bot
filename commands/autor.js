const { defaultPrefix } = require('../config.json');

module.exports = {
  name: 'autor',
  description: 'Quem é autor deste bot.',
  args: false,
  aliases: ['criador'],
  execute(msg, args, prefix = defaultPrefix) {
    msg.react('💯').catch(err => console.error(`Não consegui reagir a mensagem de ${msg.author.tag}.\n`, err));
    const data = [];
    data.push(`O meu autor é o <@323098525766385665>!`);
    data.push(`Código fonte do Bot em:`);
    data.push(`https://github.com/paulora2405/discord_bot`);
    return msg.channel.send(data);
  }
}