const { canModifyQueue } = require("../util/botutil");


module.exports = {
  name: "stop",
  description: "Para la musica",
  execute(message) {
    const queue = message.client.queue.get(message.guild.id);
    
    if (!queue) return message.reply("Actualmente no hay nada reproduciendo.").catch(console.error);
    if (!canModifyQueue(message.member)) return;

    queue.songs = [];
    queue.connection.dispatcher.end();
    queue.textChannel.send(`${message.author} ⏹ paro la musica!`).catch(console.error);
  }
};
