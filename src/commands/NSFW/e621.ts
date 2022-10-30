import * as discord from "discord.js"
import { search } from "booru"
import { EmbedBuilder } from "../../structures/embed"

export default {
    name: "e621",
    description: "Searches e621",
    category: "NSFW",
    nsfw: true,
    run: async (message: discord.Message, args: string[], client: discord.Client<true>) => {
        if (args[0]?.toLowerCase() === "help") {
            const e621HelpEmbed = new EmbedBuilder()
                .setTitle("Command: e621")
                .setDescription(`**Description:** Searches e621\n**Usage:**\n${process.env["PREFIX"]}e621 [tag?, ...]\n**Examples: **\n${process.env["PREFIX"]}e621\n${process.env["PREFIX"]}e621 gay`)
            return await message.reply({embeds: [e621HelpEmbed]})
        }
        const query = args.join(" ")
        const images = await search("e621", args, {
            limit: 1,
            random: true
        })
        if (!images.length) {
            return message.reply("No results found!");
        }
        for (let image of images) {
            if (image.file_url.includes(".webm") || image.file_url.includes(".mp4") || image.file_url.includes(".swf")) {
                return message.channel.send(image.file_url);
            }
            const embed = new EmbedBuilder("Success")
                .setTitle("E621: ")
                .setImage(image.file_url)
                .setFooter({
                    text: `Tags: e621 ${query}`
                })
                .setURL(image.file_url);
            return message.reply({ embeds: [embed] });
        }
    }
}