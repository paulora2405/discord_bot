module.exports = {
  name: 'avatar',
  description: 'Avatar',
  execute(msg, args) {
    msg.react('🤢');
    if (!msg.mentions.users.size) {
      msg.channel.send(`Olha essa porra feia aqui: ${msg.author.username}`)
      return msg.channel.send(`${msg.author.displayAvatarURL({ format: "png", dynamic: true })}`);
    }

    return msg.mentions.users.forEach(user => {
      msg.channel.send(`Olha essa porra feia de ${user.username}:`);
      return msg.channel.send(`${user.displayAvatarURL({ format: "png", dynamic: true })}`);
    });
  }
}