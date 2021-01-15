module.exports = {
  name: 'salve',
  description: 'Salve',
  execute(msg, args) {
    return msg.channel.send(`Um salve pros gurios e pras gurias do ${msg.guild.name}!`);
  }
}