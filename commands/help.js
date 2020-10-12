const { MessageEmbed } = require("discord.js");
const db = require("megadb")
const prefix_db = new db.crearDB("prefixes")


module.exports = {
  name: "help",
  aliases: ["h"],
  description: "Muestra todos los comandos con sus descripciones",
  execute(message, args) {

    

    let commands = message.client.commands.array();

    let helpEmbed = new MessageEmbed()
      .setTitle("Comando Help")
      .setDescription("Lista de todos los comandos")
      .setColor("GREEN");


      
    commands.forEach((cmd) => {
      helpEmbed.addField(
        `**[prefix] ${cmd.name} ${cmd.aliases ? `(${cmd.aliases})` : ""}**`,
        `${cmd.description}`,
        true
      );
    });

    helpEmbed.setTimestamp();

    return message.channel.send(helpEmbed).catch(console.error);
  }
};