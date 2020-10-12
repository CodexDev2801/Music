const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "invite",
  aliases: ["inv"],
  description: "Invita al bot a tu servidor!",
  execute(message, args) {

    let embed = new MessageEmbed()
    .setColor("RANDOM")
    .setDescription("**Invita al bot a tu servidor!** \n\`Link:\` https://discord.com/api/oauth2/authorize?client_id=759919752973123661&permissions=133548881&scope=bot")
    message.channel.send(embed)

  }
};