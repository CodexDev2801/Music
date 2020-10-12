const fs = require("fs");
const config = require("../config.json");

module.exports = {
  name: "pruning",
  description: "Cambia la eliminación de los mensajes del bot",
  execute(message) {
    config.PRUNING = !config.PRUNING;

    fs.writeFile("./config.json", JSON.stringify(config, null, 2), (err) => {
      if (err) {
        console.log(err);
        return message.channel.send("Hubo un error al escribir en el archivo.").catch(console.error);
      }

      return message.channel
        .send(`La eliminación de mensajes esta: ${config.PRUNING ? "**habilitada**" : "**deshabilitada**"}`)
        .catch(console.error);
    });
  }
};
