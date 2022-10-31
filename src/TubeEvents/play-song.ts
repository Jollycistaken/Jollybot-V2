import {EmbedBuilder} from "../structures/embed";
import * as distube from "distube";

export default {
    event: "playSong",
    run: async (queue: distube.Queue, song: distube.Song) => {
        const playEmbed = new EmbedBuilder()
            .setTitle("Started Playing: ")
            .setURL(song.url)
            .setDescription(`**Name: **${song.name}\n**Duration: **${song.formattedDuration}\n**URL: **${song.url}`)
            .setImage(song.thumbnail)
            .setFooter({
                text: `Requested by: ${song.user.tag}`
            })
        return await queue.textChannel?.send({embeds: [playEmbed]})
    }
}