module.exports = {
  name: 'eh?',
  description: 'Eh?',
  execute(msg, args) {
    if (!msg.mentions.users.size) {
      return msg.reply('Marque alguem para saber se essa pessoa é');
    }

    const taggedUser = msg.mentions.users.first();
    msg.channel.send(`Caso encerrado, ${taggedUser.username} é`);
    return msg.channel.send(`https://i.imgur.com/9oh6RMw.jpg`);
  }
}