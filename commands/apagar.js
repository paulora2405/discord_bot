module.exports = {
  name: 'apagar',
  description: 'NOT WORKING - Apaga uma quandidade X de mensagens de um certo canal.',
  args: true,
  usage: '<X>',
  execute(msg, args) {
    const qnt = parseInt(args[0]) + 1;

    if (isNaN(qnt))
      return msg.reply('Tem q manda um numero junto animal!');

    else if (qnt < 1 || qnt > 100) {
      return msg.reply('Tem q ser no minimo 2 e no maximo 99 porra!');
    }

    msg.channel.bulkDelete(qnt, true).catch(err => {
      console.error(err);
      msg.channel.send('Deu uma merda aqui qnt tentei apagar as msg tlg');
    })
      .then(msg.channel.send(`${qnt - 1} foram apagadas`));
  }
}