const { canModifyQueue } = require("../util/botutil");

module.exports = {
  name: "skip",
  aliases: ["s"],
  description: "Skipea (salta) la cancón actual",
  execute(message) {
    const queue = message.client.queue.get(message.guild.id);
    if (!queue)
      return message.reply("No hay nada sonando actualmente.").catch(console.error);
    if (!canModifyQueue(message.member)) return;

    queue.playing = true;
    queue.connection.dispatcher.end();
    queue.textChannel.send(`${message.author} ⏭ salto la canción`).catch(console.error);
  }
};