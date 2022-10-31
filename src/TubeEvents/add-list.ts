import {EmbedBuilder} from "../structures/embed";
import * as distube from "distube";

export default {
    event: "addList",
    run: async (queue: distube.Queue, playlist: distube.Playlist) => {
        const playEmbed = new EmbedBuilder("Success")
            .setTitle("Added list: ")
            .setURL(playlist.url)
            .setDescription(`**Name: **${playlist.name}\n**Length: **${playlist.songs.length} songs\n**URL: **${playlist.url}`)
            .setImage(playlist.thumbnail)
            .setFooter({
                text: `Added to queue by ${playlist.user.tag}`
            })
        return await queue.textChannel?.send({embeds: [playEmbed]})
    }
}