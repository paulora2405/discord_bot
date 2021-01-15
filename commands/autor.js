module.exports = {
  name: 'autor',
  description: 'Quem é autor deste bot.',
  execute(msg, args) {
    msg.react('💯');
    return msg.channel.send(`O meu autor é o <@323098525766385665>!`);
  }
}