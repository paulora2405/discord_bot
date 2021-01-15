module.exports = {
  name: 'população',
  description: 'Diz quantos arrombados o servidor tem.',
  args: false,
  aliases: ['gente'],
  execute(msg, args) {
    msg.channel.send(`${msg.guild.name} tem ${msg.guild.memberCount} arrombados!`);
  }
}