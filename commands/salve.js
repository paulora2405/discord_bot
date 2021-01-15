module.exports = {
  name: 'salve',
  description: 'Salva todos do servidor.',
  args: false,
  usage: '',
  execute(msg, args) {
    return msg.channel.send(`Um salve pros gurios e pras gurias do ${msg.guild.name}!`);
  }
}