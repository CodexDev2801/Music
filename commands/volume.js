const { canModifyQueue } = require("../util/botutil");

module.exports = {
  name: "volume",
  aliases: ["v"],
  description: "Cambia el volumen la musica correctamente",
  execute(message, args) {
    const queue = message.client.queue.get(message.guild.id);

    if (!queue) return message.reply("Actualmente no hay nada sonando.").catch(console.error);
    if (!canModifyQueue(message.member))
      return message.reply("Debes ingresar a un canal de musica!").catch(console.error);

    if (!args[0]) return message.reply(`🔊 El volumen actual es: **${queue.volume}%**`).catch(console.error);
    if (isNaN(args[0])) return message.reply("Usa un numero para definir el nivel de volumen.").catch(console.error);
    if (parseInt(args[0]) > 100 || parseInt(args[0]) < 0)
      return message.reply("Ocupa un numero del  0 - 100.").catch(console.error);

    queue.volume = args[0];
    queue.connection.dispatcher.setVolumeLogarithmic(args[0] / 100);

    return queue.textChannel.send(`El volumen se ha establecido: **${args[0]}%**`).catch(console.error);
  }
};