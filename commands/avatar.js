module.exports = {
  name: 'avatar',
  description: 'Mostra como você ou quem você marcar são feios.',
  args: false,
  usage: '[@pessoa]+',
  aliases: ['foto', 'fotos'],
  execute(msg, args) {
    msg.react('🤢').catch(err => console.error(`Não consegui reagir a mensagem de ${msg.author.tag}.\n`, err));
    if (!msg.mentions.users.size) {
      const user = msg.author;
      // return msg.channel.send(`Olha essa porra:\n${user.displayAvatarURL({ dynamic: true })}`);
      msg.channel.send(`Olha essa porra feia aqui:`)
      return msg.channel.send(`${msg.author.displayAvatarURL({ format: "png", dynamic: true })}`);
    }

    return msg.mentions.users.forEach(user => {
      msg.channel.send(`Olha essa porra feia de ${user.username}:`);
      return msg.channel.send(`${user.displayAvatarURL({ format: "png", dynamic: true })}`);
    });
  }
}