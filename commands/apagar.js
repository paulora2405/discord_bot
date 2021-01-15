module.exports = {
  name: 'apagar',
  description: 'NOT WORKING - Apaga uma quandidade x de mensagens de um certo canal.',
  execute(msg, args) {
    // NAO TA FUNCIONANDO AINDA
    const qnt = parseInt(args[0]) + 1;

    if (isNaN(qnt))
      return msg.reply('Tem q manda um numero junto animal!');

    else if (qnt < 1 || qnt > 100) {
      return msg.reply('Tem q ser no minimo 2 e no maximo 99 porra!');
    }

    return msg.channel.bulkDelete(qnt, true).catch(err => {
      console.error(err);
      msg.channel.send('Deu uma merda aqui qnt tentei apagar as msg tlg');
    });
  }
}