module.exports = {
  name: 'população',
  description: 'Diz quantos arrombados o servidor tem.',
  args: false,
  aliases: ['gente'],
  execute(msg, args, prefix) {
    if (msg.channel.type === 'dm')
      return msg.channel.send(`Parece q vc ta sozinho por aqui ${msg.author.username}`);
    msg.channel.send(`${msg.guild.name} tem ${msg.guild.memberCount} arrombados!`);
  }
}