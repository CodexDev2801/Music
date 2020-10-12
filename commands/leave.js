const { canModifyQueue } = require("../util/botutil");

module.exports = {
  name: "leave",
  description: "El bot saldra del canal de voz",
  async execute(message) {
    const { voiceChannel } = message.member.voice;
    const { channel } = message.member.voice;
    
    if (!channel) return message.reply("No estas en un canal de voz!").catch(console.error);

    const permissions = channel.permissionsFor(message.client.user);
    if (!permissions.has("CONNECT"))
      return message.reply("No puedo acceder al canal, no tengo los permisos necesarios");
    if (!permissions.has("SPEAK"))
      return message.reply("No tengo los permisos necesarios para hablar en este canal de voz!");
      message.member.voice.channel.leave();
   return message.channel.send("Desconectado del canal exitosamente")
  }
}