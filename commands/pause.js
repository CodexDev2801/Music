const { canModifyQueue } = require("../util/botutil");

module.exports = {
  name: "pause",
  description: "Pausa correctamente la musica",
  execute(message) {
    const queue = message.client.queue.get(message.guild.id);
    if (!queue) return message.reply("Actualmente no hay nada sonando.").catch(console.error);
    if (!canModifyQueue(message.member)) return;

    if (queue.playing) {
      queue.playing = false;
      queue.connection.dispatcher.pause(true);
      return queue.textChannel.send(`${message.author} ⏸ ha pausado la musica.`).catch(console.error);
    }
  }
};