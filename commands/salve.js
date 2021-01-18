module.exports = {
  name: 'salve',
  description: 'Salva todos do servidor.',
  args: false,
  execute(msg, args, prefix) {
    return msg.channel.send(`Um salve pros gurios e pras gurias do ${msg.guild.name}!`);
  }
}