const { Client, Collection } = require("discord.js");
const { readdirSync } = require("fs");
const { join } = require("path");
const { TOKEN } = require("./config.json");
const db = require("megadb")
const prefix_db = new db.crearDB("prefixes")

const client = new Client({ disableMentions: "everyone" });

client.login(TOKEN);
client.commands = new Collection();

client.queue = new Map();
const cooldowns = new Collection();
const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");


const actividades = [
    "https://twitch.tv/xchavo",
    "SUBTIEMBRE",
    "Chavo Music"
    ];

client.on("ready", () => {
    console.log(`${client.user.username} activo papi!`);
    setInterval(() => {
        const index = Math.floor(Math.random() * (actividades.length - 1) + 1); 
        client.user.setPresence({
        status: "Idle",
        activity: {
            name: actividades[index],
            url: "https://www.twitch.tv/xchavo",
            type: "STREAMING"
            
        }
    })
    }, 5000); 
  });
  client.on("warn", (info) => console.log(info));
  client.on("error", console.error);

  const commandFiles = readdirSync(join(__dirname, "commands")).filter((file) => file.endsWith(".js"));
for (const file of commandFiles) {
  const command = require(join(__dirname, "commands", `${file}`));
  client.commands.set(command.name, command);
}

client.on("message", async (message) => {

  let prefix = prefix_db.tiene(`${message.guild.id}`) ? await
        prefix_db.obtener(`${message.guild.id}`) : ">>"

    if (message.author.bot) return;
    if (!message.guild) return;
  
    const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(prefix)})\\s*`);
    if (!prefixRegex.test(message.content)) return;
  
    const [, matchedPrefix] = message.content.match(prefixRegex);
  
    const args = message.content.slice(matchedPrefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();
  
    const command =
      client.commands.get(commandName) ||
      client.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(commandName));
  
    if (!command) return;
  
    if (!cooldowns.has(command.name)) {
      cooldowns.set(command.name, new Collection());
    }

    const now = Date.now();
    const timestamps = cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown || 1) * 1000;
  
    if (timestamps.has(message.author.id)) {
      const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
  
      if (now < expirationTime) {
        const timeLeft = (expirationTime - now) / 1000;
        return message.reply(
          `debes esperar ${timeLeft.toFixed(1)} segundos, antes de volver a ocupar  el \`${command.name}\` comando.`
        );
      }
    }
  
    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
  
    try {
      command.execute(message, args);
    } catch (error) {
      console.error(error);
      message.reply("Ah ocurrido un error al ejecutar el comando.").catch(console.error);
    }
  });