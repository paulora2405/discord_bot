module.exports = {
  name: 'autor',
  description: 'Autor',
  execute(msg, args) {
    return msg.channel.send(`O meu autor é o Paulo Roberto Albuquerque!`);
  }
}