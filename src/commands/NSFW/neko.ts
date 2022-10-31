import * as discord from "discord.js"
import { EmbedBuilder } from "../../structures/embed"
const axios = require("axios")
export default {
    name: "neko",
    description: "Sends hentai of nekos",
    category: "NSFW",
    nsfw: true,
    run: async (message: discord.Message, args: string[], client: discord.Client<true>) => {
        if (args[0]?.toLowerCase() === "help") {
            const e621HelpEmbed = new EmbedBuilder()
                .setTitle("Command: neko")
                .setDescription(`**Description:** Sends hentai of nekos\n**Usage:**\n${process.env["PREFIX"]}neko\n**Examples: **\n${process.env["PREFIX"]}neko`)
            return await message.reply({embeds: [e621HelpEmbed]})
        }
        const res = await axios.get("https://nekobot.xyz/api/image?type=hneko")
        const nekoEmbed = new EmbedBuilder()
            .setTitle("Neko: ")
            .setImage(res.data.message);
        message.reply({embeds: [nekoEmbed]})
    }
}