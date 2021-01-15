require('dotenv').config();
const { prefix } = require('./config.json');
const fetch = require('node-fetch');
const Discord = require('discord.js');
const client = new Discord.Client();
console.log('Inicializando o bot...');

client.login(process.env.DISCORD_TOKEN);

client.once('ready', () => {
  console.log('Pai ta online!');
});

client.on('message', async msg => {
  // se a mensagem nao começa com o prefixo ou o autor da mensagem é um bot, nao faz nada
  if (!msg.content.startsWith(prefix) || msg.author.bot)
    return;

  // cria uma array de strings contendo todos os argumentos passados com o comando
  const args = msg.content.slice(prefix.length).trim().split(/ +/);
  // o comando em si, sem o prefixo
  const command = args.shift().toLowerCase();


  if (command === 'salve') {
    return msg.channel.send(`Um salve pros gurios e pras gurias do ${msg.guild.name}!`);
  }


  else if (command === 'população') {
    return msg.channel.send(`${msg.guild.name} tem ${msg.guild.memberCount} arrombados!`);
  }


  else if (command === 'autor') {
    // 323098525766385665 meu id
    return msg.channel.send(`O meu autor é o Paulo Roberto Albuquerque!`);
    // return;
  }


  else if (command === 'apagar') {
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


  else if (command === 'eh?') {
    if (!msg.mentions.users.size) {
      return msg.reply('Marque alguem para saber se essa pessoa é');
    }

    const taggedUser = msg.mentions.users.first();
    msg.channel.send(`Caso encerrado, ${taggedUser.username} é`);
    return msg.channel.send(`https://i.imgur.com/9oh6RMw.jpg`);
  }


  else if (command === 'avatar') {
    if (!msg.mentions.users.size) {
      // return msg.channel.send(`Olha essa porra feia aqui:\n<${msg.author.displayAvatarURL({ format: "png", dynamic: true })}>`);
      // return msg.channel.send(`Olha essa porra feia aqui:\n${msg.author.displayAvatarURL({ format: "png", dynamic: true })}`);
      msg.channel.send(`Olha essa porra feia aqui: ${msg.author.username}`)
      return msg.channel.send(`${msg.author.displayAvatarURL({ format: "png", dynamic: true })}`);
    }

    return msg.mentions.users.forEach(user => {
      msg.channel.send(`Olha essa porra feia de ${user.username}:`);
      return msg.channel.send(`${user.displayAvatarURL({ format: "png", dynamic: true })}`);
    });
  }


  else if (command === 'gif') {
    let termo = '';

    if (msg.mentions.size)
      return msg.channel.send('Não precisa marca ngm burro! Só coloca um termo pra pesquisa caralho')

    if (args.length == 0)
      return msg.reply(`Bota um termo para pesquisa ai porra`);
    else if (args.length > 1) {
      termo = args.join('-');
    }
    else {
      termo = args.pop();
    }

    let url = `https://api.tenor.com/v1/search?key=${process.env.TENOR_KEY}&q=${termo}&locale=pt_BR&contentFilter=off&media_filter=basic&ar_range=standard&limit=10`
    let response = await fetch(url);
    let json = await response.json();
    // console.log(json);
    return msg.channel.send(json.results[Math.floor(Math.random() * json.results.length)].url);
  }
});