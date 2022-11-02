import * as discord from "discord.js"
import { EmbedBuilder } from "../../structures/embed"

export default {
    name: "serverlist",
    description: "Get every server JollyBot is in",
    category: "Owner",
    needsPermissions: true,
    permissionLevel: "Owner",
    run: async (message: discord.Message, args: string[], client: discord.Client<true>) => {
        const guilds = client.guilds.cache.map((guild) => guild.name);
        const guildsEmbed = new EmbedBuilder("Success")
            .setTitle("Guilds")
            .setDescription(guilds.join("\n"))
        return await message.reply({embeds: [guildsEmbed]})
    }
}