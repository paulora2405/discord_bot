module.exports = {
  name: 'online',
  description: 'Verifica se o pai está online.',
  args: false,
  aliases: ['online?', 'on', 'on?'],
  execute(msg, args) {
    return msg.channel.send(`**O pai tá\tO N L I N E**`);
  }
}