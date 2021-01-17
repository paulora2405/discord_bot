const { prefix } = require('../config.json');

module.exports = {
  name: 'help',
  description: 'Ajuda com os comandos.',
  args: false,
  aliases: ['socorro', 'ajuda', 'comandos', 'commands'],
  usage: '[nome de um comando]',
  execute(msg, args) {
    msg.react('✍️').catch(err => console.error(`Não consegui reagir a mensagem de ${msg.author.tag}.\n`, err));

    const data = [];
    const { commands } = msg.client;

    if (!args.length) {
      data.push('Aqui ta uma lista de todos os meus comandos:');
      data.push(commands.map(command => command.name).join('\t'));
      data.push(`\nVocê pode mandar \`${prefix}help [nome do comando]\` pra saber mais sobre um comando.`);

      return msg.author.send(data, { split: true })
        .then(() => {
          if (msg.channel.type === 'dm') return;
          msg.reply('Eu te mandei na DM todos os meus comandos.');
        })
        .catch(err => {
          console.error(`Não consegui enviar ajuda na DM de ${msg.author.tag}.\n`, err);
          msg.reply('Parece que não consegui te mandar ajuda na DM, talvez suas DM\'s estejam desligadas?');
        });
    }

    const name = args[0].toLowerCase();
    const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

    if (!command) {
      return msg.reply('Esse comando não existe.');
    }

    data.push(`**Nome:** ${command.name}`);

    if (command.aliases) data.push(`**Variantes:** ${command.aliases.join('\t')}`);
    if (command.description) data.push(`**Descrição:** ${command.description}`);
    if (command.usage) {
      data.push(`**Uso:** ${prefix}${command.name} ${command.usage} ${(!command.args) ? ' -> argumento opcional' : ''}`);
    }
    // se cooldown de comandos for implementado, tirar essa linha do if
    if (command.cooldown) data.push(`**Tempo de espera:** ${command.cooldown || 3} segundos`);

    msg.channel.send(data, { split: true });
  }
}