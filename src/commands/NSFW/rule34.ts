import * as discord from "discord.js"
import { search } from "booru"
import { EmbedBuilder } from "../../structures/embed"

export default {
    name: "rule34",
    description: "Searches rule34",
    category: "NSFW",
    nsfw: true,
    run: async (message: discord.Message, args: string[], client: discord.Client<true>) => {
        if (args[0]?.toLowerCase() === "help") {
            const e621HelpEmbed = new EmbedBuilder()
                .setTitle("Command: rule34")
                .setDescription(`**Description:** Searches rule34\n**Usage:**\n${process.env["PREFIX"]}rule34 [tag?, ...]\n**Examples: **\n${process.env["PREFIX"]}rule34\n${process.env["PREFIX"]}rule34 gay`)
            return await message.reply({embeds: [e621HelpEmbed]})
        }
        const query = args.join(" ")
        const images = await search("rule34", args, {
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
                .setTitle("rule34: ")
                .setImage(image.file_url)
                .setFooter({
                    text: `Tags: rule34 ${query}`
                })
                .setURL(image.file_url);
            return message.reply({ embeds: [embed] });
        }
    }
}