module.exports = {
  canModifyQueue(member) {
    const { channel } = member.voice;
    const botChannel = member.guild.me.voice.channel;

    if (channel !== botChannel) {
      member.send("Debes ingresar a un canal de voz primero!").catch(console.error);
      return false;
    }

    return true;
  }
};