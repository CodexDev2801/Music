const { canModifyQueue } = require("../util/botutil");

module.exports = {
  name: "loop",
  aliases: ['l'],
  description: "Cambia el loop de la musica",
  execute(message) {
    const queue = message.client.queue.get(message.guild.id);
    if (!queue) return message.reply("Actualmente no hay nada reproduciendo.").catch(console.error);
    if (!canModifyQueue(message.member)) return;

    queue.loop = !queue.loop;
    return queue.textChannel
      .send(`Loop esta ${queue.loop ? "**on**" : "**off**"}`)
      .catch(console.error);
  }
};