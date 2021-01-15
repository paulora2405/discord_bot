module.exports = {
  name: 'população',
  description: 'População',
  execute(msg, args) {
    msg.channel.send(`${msg.guild.name} tem ${msg.guild.memberCount} arrombados!`);
  }
}