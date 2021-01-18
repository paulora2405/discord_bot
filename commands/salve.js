module.exports = {
  name: 'salve',
  description: 'Salva todos do servidor.',
  args: false,
  execute(msg, args, prefix) {
    if (msg.channel.type === 'dm')
      return msg.channel.send(`Um salve pra você ${msg.author.username}!`);

    return msg.channel.send(`Um salve pros gurios e pras gurias do ${msg.guild.name}!`);
  }
}