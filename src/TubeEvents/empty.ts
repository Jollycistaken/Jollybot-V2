import {EmbedBuilder} from "../structures/embed";
import * as distube from "distube"

export default {
    event: "empty",
    run: async (queue: distube.Queue) => {
        const playEmbed = new EmbedBuilder("Success")
            .setTitle("Empty VC!")
            .setDescription(`This vc is empty so I am going to leave this vc!`)
        return await queue.textChannel?.send({embeds: [playEmbed]})
    }
}