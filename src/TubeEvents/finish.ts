import {EmbedBuilder} from "../structures/embed";
import * as distube from "distube"

export default {
    event: "finish",
    run: async (queue: distube.Queue) => {
        const playEmbed = new EmbedBuilder("Success")
            .setTitle("Finished!")
            .setDescription(`The queue has been finished!`)
        return await queue.textChannel?.send({embeds: [playEmbed]})
    }
}