module.exports = {
  name: 'eh',
  description: 'Confirma se a pessoa marcada é',
  args: true,
  usage: '<pessoa>',
  aliases: ['eh?', 'é', 'é?'],
  execute(msg, args, prefix = '!') {
    if (!msg.mentions.users.size) {
      msg.react('🚫').catch(err => console.error(`Não consegui reagir a mensagem de ${msg.author.tag}.\n`, err));
      return msg.reply('Marque alguem para saber se essa pessoa é');
    }

    if (msg.mentions.users.size > 1) {
      msg.react('🚫').catch(err => console.error(`Não consegui reagir a mensagem de ${msg.author.tag}.\n`, err));
      return msg.reply(`Marca um filha da puta só seu burro!`);
    }


    const taggedUser = msg.mentions.users.first();
    msg.channel.send(`Caso encerrado, ${taggedUser.username} é`);
    return msg.channel.send(`https://i.imgur.com/9oh6RMw.jpg`);
  }
}