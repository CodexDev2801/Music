const Discord = require("discord.js");
const db = require("megadb")
const prefix_db = new db.crearDB("prefixes")

module.exports = {
    name: "setprefix",
    aliases: ["changeprefix"],
    description: "Cambia el prefix del bot",
    async execute(message, args) {
        
        let permisos = message.member.hasPermission("ADMINISTRATOR");
if (!permisos){
let embed = new Discord.MessageEmbed()
.setDescription("No cuentas con los permisos necesarios para utilizar el comando")
.setColor("RED")
  return message.channel.send(embed)
}

        let prefijo = args[0]
        if(!prefijo) return message.channel.send("Debes ingresar el nuevo prefijo que utilizaras")

        prefix_db.establecer(`${message.guild.id}`, prefijo)
        message.channel.send("Mi prefijo acaba de ser cambiado a  `"+prefijo+"`")


    }
}