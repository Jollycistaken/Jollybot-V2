import {EmbedBuilder} from "../structures/embed";
import * as distube from "distube"

export default {
    event: "disconnect",
    run: async (queue: distube.Queue) => {
        const playEmbed = new EmbedBuilder("Success")
            .setTitle("Disconnected!")
            .setDescription(`I have been disconnected!`)
        return await queue.textChannel?.send({embeds: [playEmbed]})
    }
}