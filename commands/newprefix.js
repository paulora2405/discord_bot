const { defaultPrefix } = require('../config.json');
const fs = require('fs');

module.exports = {
  name: 'newprefix',
  description: 'Altera o prefixo padrão do servidor.',
  args: true,
  aliases: ['prefixo', 'prefix', 'novoprefixo'],
  usage: '[novo prefixo]',
  async execute(msg, args, prefix = defaultPrefix) {
    if (msg.channel.type === 'dm') {
      msg.react('🚫').catch(err => console.error(`Não consegui reagir a mensagem de ${msg.author.tag}.\n`, err));
      msg.reply('Este comando só serve para servidores, não para mensagens privadas.');
    }

    if (args.length > 1) {
      return msg.reply(`O prefixo deve ser apenas uma cadeia de caracteres sem espaços.`);
    }
    else if (args[0] === prefix) {
      msg.react('🚫').catch(err => console.error(`Não consegui reagir a mensagem de ${msg.author.tag}.\n`, err));
      return msg.channel.send(`\`${args[0]}\` já é o prefixo deste servidor.`);
    }

    else {
      msg.react('✍️').catch(err => console.error(`Não consegui reagir a mensagem de ${msg.author.tag}.\n`, err));
      msg.channel.send(`To mudando aqui o prefixo, perai...`);
      const rawDb = fs.readFileSync(`databases/guildPrefixes.json`);
      let guildsDatabaseJson = JSON.parse(rawDb);

      if (guildsDatabaseJson.hasOwnProperty(msg.guild.id)) {
        if (args[0] === defaultPrefix)
          delete guildsDatabaseJson[msg.guild.id];
        else
          guildsDatabaseJson[msg.guild.id] = args[0];
      }
      else {
        guildsDatabaseJson[msg.guild.id] = args[0];
      }

      const guildsDatabaseJsonToRawString = JSON.stringify(guildsDatabaseJson, null, 2);
      fs.writeFileSync(`databases/guildPrefixes.json`, guildsDatabaseJsonToRawString);

      return msg.channel.send(`O prefixo foi alterado para \`${args[0]}\` com sucesso!`);
    }
  }
}