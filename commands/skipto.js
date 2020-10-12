const { canModifyQueue } = require("../util/botutil");

module.exports = {
  name: "skipto",
  aliases: ["st"],
  description: "Salta a una canción de la cola",
  execute(message, args) {
    if (!args.length)
      return message
        .reply(`Usa: ${message.client.prefix}${module.exports.name} <Numero de la cola>`)
        .catch(console.error);

    if (isNaN(args[0]))
      return message
        .reply(`Usa: ${message.client.prefix}${module.exports.name} <Numero de la cola>`)
        .catch(console.error);

    const queue = message.client.queue.get(message.guild.id);
    if (!queue) return message.channel.send("There is no queue.").catch(console.error);
    if (!canModifyQueue(message.member)) return;

    if (args[0] > queue.songs.length)
      return message.reply(`La cola es solo ${queue.songs.length} canciones largas!`).catch(console.error);

    queue.playing = true;
    if (queue.loop) {
      for (let i = 0; i < args[0] - 2; i++) {
        queue.songs.push(queue.songs.shift());
      }
    } else {
      queue.songs = queue.songs.slice(args[0] - 2);
    }
    queue.connection.dispatcher.end();
    queue.textChannel.send(`${message.author} ⏭ salto ${args[0] - 1} canciones`).catch(console.error);
  }
};