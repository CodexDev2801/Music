const { canModifyQueue } = require("../util/botutil");

module.exports = {
  name: "resume",
  aliases: ["r"],
  description: "Reanuda la musica pausada",
  execute(message) {
    const queue = message.client.queue.get(message.guild.id);
    if (!queue) return message.reply("Actualmente no hay nada sonando.").catch(console.error);
    if (!canModifyQueue(message.member)) return;

    if (!queue.playing) {
      queue.playing = true;
      queue.connection.dispatcher.resume();
      return queue.textChannel.send(`${message.author} ▶ volvio a reproducir la musica!`).catch(console.error);
    }

    return message.reply("La cola no esta en pausa.").catch(console.error);
  }
};