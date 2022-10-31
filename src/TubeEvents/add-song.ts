import {EmbedBuilder} from "../structures/embed";
import * as distube from "distube"

export default {
    event: "addSong",
    run: async (queue: distube.Queue, song: distube.Song) => {
        const playEmbed = new EmbedBuilder("Success")
            .setTitle("Added song: ")
            .setURL(song.url)
            .setDescription(`**Name: **${song.name}\n**Duration: **${song.formattedDuration}\n**URL: **${song.url}`)
            .setImage(song.thumbnail)
            .setFooter({
                text: `Added to queue by ${song.user.tag}`
            })
        return await queue.textChannel?.send({embeds: [playEmbed]})
    }
}