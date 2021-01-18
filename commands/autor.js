module.exports = {
  name: 'autor',
  description: 'Quem é autor deste bot.',
  args: false,
  aliases: ['criador'],
  execute(msg, args, prefix = '!') {
    msg.react('💯').catch(err => console.error(`Não consegui reagir a mensagem de ${msg.author.tag}.\n`, err));
    return msg.channel.send(`O meu autor é o <@323098525766385665>!`);
  }
}