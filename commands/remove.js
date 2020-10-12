const { canModifyQueue } = require("../util/botutil");

module.exports = {
  name: "remove",
  description: "Elimina canciones de la cola",
  execute(message, args) {
    const queue = message.client.queue.get(message.guild.id);
    if (!queue) return message.channel.send("No hay cola de reproducción.").catch(console.error);
    if (!canModifyQueue(message.member)) return;
    
    if (!args.length) return message.reply(`Usa: ${message.client.prefix}remove <Numero de la cancón>`);
    if (isNaN(args[0])) return message.reply(`Usa: ${message.client.prefix}remove <Numero de la cancón>`);

    const song = queue.songs.splice(args[0] - 1, 1);
    queue.textChannel.send(`${message.author} ❌ ha removido **${song[0].title}** de la cola.`);
  }
};