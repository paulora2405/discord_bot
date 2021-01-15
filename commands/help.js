module.exports = {
  name: 'help',
  description: 'Ajuda com os comandos.',
  args: false,
  usage: '',
  aliases: ['socorro', 'ajuda'],
  execute(msg, args) {
    msg.react('✍️');
    // return msg.channel.send(`Ajuda?`);
  }
}