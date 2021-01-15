module.exports = {
  name: 'avatar',
  description: 'Avatar',
  execute(msg, args) {
    if (!msg.mentions.users.size) {
      // return msg.channel.send(`Olha essa porra feia aqui:\n<${msg.author.displayAvatarURL({ format: "png", dynamic: true })}>`);
      // return msg.channel.send(`Olha essa porra feia aqui:\n${msg.author.displayAvatarURL({ format: "png", dynamic: true })}`);
      msg.channel.send(`Olha essa porra feia aqui: ${msg.author.username}`)
      return msg.channel.send(`${msg.author.displayAvatarURL({ format: "png", dynamic: true })}`);
    }

    // return msg.mentions.users.forEach(user => {
    //   msg.channel.send(`Olha essa porra feia de ${user.username}:`);
    //   return msg.channel.send(`${user.displayAvatarURL({ format: "png", dynamic: true })}`);
    // });

    for (const user of msg.mentions.users) {
      msg.channel.send(`Olha essa porra feia de ${user.username}:`);
      msg.channel.send(`${user.displayAvatarURL({ format: "png", dynamic: true })}`);
    }
    return;
  }
}