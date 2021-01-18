require('dotenv').config(); // dotenv package for hiding environment variables
const fs = require('fs'); // js filesystem
const Discord = require('discord.js'); // discord api
const Datastore = require('nedb'); // NeDB database package
const { defaultPrefix } = require('./config.json'); // default command prefix

const client = new Discord.Client();


// faz a conexão com o discord usando o token do bot
client.login(process.env.DISCORD_TOKEN);


// log ao inicio da execução
console.log('Inicializando o bot...');
// log uma unica vez quando a conexão é bem sucedida
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


// carrega todos os arquivos de comandos
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync(`./commands`).filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}


// base de dados para armazenar prefixos customizados
const guildsDatabase = new Datastore({
  filename: `databases/guildsPrefixes.db`,
  corruptAlertThreshold: 0,
  autoload: false
});


// evento de mensagem
client.on('message', onMessageEvent);


// callback do evento de mensagem
async function onMessageEvent(msg) {
  // se o autor da msg é um bot, retorna
  if (msg.author.bot) return;

  // se mensagem é uma DM, trata de maneira apropriada para tal caso
  if (msg.channel.type === 'dm')
    return commandHandleDM(msg);

  await guildsDatabase.loadDatabase();
  guildsDatabase.findOne({ guild_id: msg.guild.id }, async (err, retDoc) => {
    if (err) {
      console.error(`Ocorreu um erro ao procurar o servidor ${msg.guild.name} (id=${msg.guild.id}) na DB\n`, err);
      return null;
    }

    const response = await checkGuildPrefix(msg, retDoc);
    // console.log(`response=${response}`);
    if (response)
      commandHandleGuild(msg, response);
    else
      commandHandleGuild(msg);
  });
}


function commandHandleGuild(msg, prefix = '!') {
  // checa se o conteúdo da mensagem é apenas uma marcação do bot
  // <@!799425639219462176> tag do bot  
  if (msg.content.trim() === '<@!799425639219462176>' || msg.content.trim() === '<@799425639219462176>') {
    const data = [];
    if (prefix !== defaultPrefix)
      data.push(`O prefixo de comandos neste servidor foi customizado para \`${prefix}\``);
    data.push(`Para receber ajuda com comandos, use \`${prefix}help\``);
    msg.reply(data);
  }

  // checa se a msg começa com o prefixo
  if (!msg.content.startsWith(prefix)) return;

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
    command.execute(msg, args, prefix);
  } catch (err) {
    console.error(err);
    msg.reply('deu alguma bosta aqui qnd tentei executa isso dai');
  }
}


// checa se a guilda já existe na DB, e qual é o prefixo
async function checkGuildPrefix(msg, retDoc) {
  if (!retDoc) {
    // insere na base de dados as informações do servidor de origem da msg
    const doc = {
      guild_name: msg.guild.name,
      guild_id: msg.guild.id,
      guild_prefix: defaultPrefix
    };
    guildsDatabase.insert(doc, (err, newDoc) => {
      if (newDoc) {
        return defaultPrefix;
      }
      if (err) {
        console.error(`Ocorreu um erro ao inserir o servidor ${msg.guild.name} (id=${msg.guild.id})\n`, err);
        return;
      }
    });

  } else {
    return retDoc.guild_prefix;
  }
}


// tratamento de comandos quando a mensagem é uma DM
function commandHandleDM(msg) {
  // checa se a msg começa com o prefixo
  if (!msg.content.startsWith(defaultPrefix)) return;

  // cria uma array de strings contendo todos os argumentos passados com o comando
  const args = msg.content.slice(defaultPrefix.length).trim().split(/ +/);
  // o comando em si, sem o prefixo, somente com minusculas
  const commandName = args.shift().toLowerCase();
  // pega o comando com um nome de comando direto ou uma das variantes do nome do comando
  const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
  if (!command) return;

  if (command.args && !args.length) {
    let reply = `<@${msg.author.id}> você não inseriu nenhum argumento com o comando animal!`

    if (command.usage)
      reply += `\nO jeito certo é: \`${defaultPrefix}${command.name} ${command.usage}\``;

    return msg.channel.send(reply);
  }

  try {
    command.execute(msg, args);
  } catch (err) {
    console.error(err);
    msg.reply('deu alguma bosta aqui qnd tentei executa isso dai');
  }
}
