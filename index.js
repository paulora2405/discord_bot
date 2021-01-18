require('dotenv').config();

const Datastore = require('nedb');
const { prefix } = require('./config.json');
const fs = require('fs');
const Discord = require('discord.js');
const client = new Discord.Client();
client.commands = new Discord.Collection();

const guildsDatabase = new Datastore({
  filename: `databases/guildsPrefixes.db`,
  corruptAlertThreshold: 0,
  autoload: true
});


console.log('Inicializando o bot...');

client.once('ready', () => {
  console.log('Pai ta online!');
  client.user.setPresence({
    status: "online",
    activity: {
      type: "WATCHING",
      name: "tu fazendo merda"
    }
  }).catch(console.error);
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

  // guildsDatabase.insert({
  //   guild_name: msg.guild.name,
  //   guild_id: msg.guild.id,
  //   guild_prefix: prefix
  // }, err => {
  //   console.error(`Ocorreu um erro ao inserir o servidor ${msg.guild.name} (id=${msg.guild.id})`, err);
  // });
  // cria uma array de strings contendo todos os argumentos passados com o comando
  const args = msg.content.slice(prefix.length).trim().split(/ +/);
  // o comando em si, sem o prefixo, somente com minusculas
  const commandName = args.shift().toLowerCase();
  // pega o comando com um nome de comando direto ou uma das variantes do nome do comando
  const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
  if (!command) return;

  if (command.args && !args.length) {
    let reply = `<@${msg.author.id}> você não inseriu nenhum argumento com o comando animal!`

    if (command.usage)
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