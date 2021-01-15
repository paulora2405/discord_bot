require('dotenv').config();

const { prefix } = require('./config.json');
const fs = require('fs');
const Discord = require('discord.js');
const client = new Discord.Client();
client.commands = new Discord.Collection();

console.log('Inicializando o bot...');

client.once('ready', () => {
  console.log('Pai ta online!');
});


const commandFiles = fs.readdirSync(`./commands`).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

client.on('message', msg => {
  // se a mensagem nao começa com o prefixo ou o autor da mensagem é um bot, nao faz nada
  if (!msg.content.startsWith(prefix) || msg.author.bot)
    return;
  // cria uma array de strings contendo todos os argumentos passados com o comando
  const args = msg.content.slice(prefix.length).trim().split(/ +/);
  // o comando em si, sem o prefixo
  const commandName = args.shift().toLowerCase();

  if (!client.commands.has(commandName))
    return;

  const command = client.commands.get(commandName);

  if (command.args && !args.length) {
    let reply = `<@${msg.author.id}> você não inseriu nenhum argumento com o comando animal!`

    reply += `\nO jeito certo é: \`${prefix}${command.name} ${command.usage}\``;
    return msg.channel.send(reply);
  }

  try {
    command.execute(msg, args);
  } catch (err) {
    console.error(err);
    msg.reply('deu alguma bosta aqui qnd tentei executa isso dai');
  }

});

client.login(process.env.DISCORD_TOKEN);