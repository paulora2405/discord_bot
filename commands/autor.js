module.exports = {
  name: 'autor',
  description: 'Quem é autor deste bot.',
  args: false,
  aliases: ['criador'],
  execute(msg, args) {
    msg.react('💯');
    return msg.channel.send(`O meu autor é o <@323098525766385665>!`);
  }
}