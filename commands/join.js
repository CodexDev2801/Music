const { canModifyQueue } = require("../util/botutil");

module.exports = {
  name: "join",
  description: "El bot ingresara al canal sin reproducir nada",
  async execute(message) {
    const { voiceChannel } = message.member.voice;
    const { channel } = message.member.voice;
    
    if (!channel) return message.reply("Debes ingresar a un canal de voz primero!").catch(console.error);

    const permissions = channel.permissionsFor(message.client.user);
    if (!permissions.has("CONNECT"))
      return message.reply("No puedo acceder al canal, no tengo los permisos necesarios");
    if (!permissions.has("SPEAK"))
      return message.reply("No tengo los permisos necesarios para hablar en este canal de voz!");
      message.member.voice.channel.join();
   return message.channel.send("Conectado al canal exitosamente")
  }
}
