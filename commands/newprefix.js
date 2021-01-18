const Datastore = require('nedb'); // NeDB database package

module.exports = {
  name: 'newprefix',
  description: 'Altera o prefixo padrão do servidor.',
  args: true,
  aliases: ['prefixo', 'prefix', 'novoprefixo'],
  usage: '[novo prefixo]',
  async execute(msg, args, prefix = '!') {
    if (msg.channel.type === 'dm') {
      msg.react('🚫').catch(err => console.error(`Não consegui reagir a mensagem de ${msg.author.tag}.\n`, err));
      msg.reply('Este comando só serve para servidores, não para mensagens privadas.');
    }

    if (args.length > 1) {
      msg.reply(`O prefixo deve ser apenas uma cadeia de caracteres sem espaços.`);
    }

    // base de dados para armazenar prefixos customizados
    const guildsDatabase = new Datastore({
      filename: `databases/guildsPrefixes.db`,
      corruptAlertThreshold: 0,
      autoload: true
    });

    // const doc = {
    //   guild_name: msg.guild.name,
    //   guild_id: msg.guild.id,
    //   guild_prefix: args[0]
    // };
    await guildsDatabase.update({ guild_id: `${msg.guild.id}` }, { $set: { guild_prefix: args[0] } }, {}, err => {
      if (err) {
        console.error(`Ocorreu um problema ao mudar o prefixo do servidor ${msg.guild.name} (id=${msg.guild.id})\n`, err);
      }
      msg.channel.send(`O prefixo foi alterado para \`${args[0]}\` com sucesso!`);
      // console.log(args[0]);
      return;
    });
  }
}