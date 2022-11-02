import * as discord from "discord.js";
import { JollyTypes } from "../types/types";
import { EmbedBuilder } from "../structures/embed"

export default {
    event: "messageCreate",
    run: async (client: discord.Client<true>, message: discord.Message<true>) => {
        const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        if (message.author.bot) return;
        if (!message.guild) return;
        const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(process.env["PREFIX"])})\\s*`);
        if (!prefixRegex.test(message.content)) return;
        const [, matchedPrefix] = message.content.match(prefixRegex);
        const args = message.content.slice(matchedPrefix.length).trim().split(/ +/);
        const commandName = args.shift().toLowerCase();
        const command: JollyTypes.Command = client["commands"].get(commandName);
        if (!command) return;
        if (command.nsfw && !(message.channel as discord.TextChannel).nsfw) {
            const nsfwEmbed = new EmbedBuilder("Error")
                .setTitle("Error!")
                .setDescription("You are not in a nsfw channel!")
            return await message.reply({embeds: [nsfwEmbed]})
        }
        if (command.needsPermissions && command.permissionLevel) {
            if ((command.permissionLevel.toLowerCase() === "owner") && (message.author.id !== "416380624337764352")) {
                const permEmbed = new EmbedBuilder("Error")
                    .setTitle("Error!")
                    .setDescription("You are not the owner of this bot!")
                return await message.reply({embeds: [permEmbed]})
            }
        }
        try {
            command.run(message, args, client);
        } catch(error) {
            console.error(error);
            const errorEmbed = new EmbedBuilder("Error")
                .setTitle("Error!")
                .setDescription(`Error: ${error}`)
            return await message.reply({embeds: [errorEmbed]})
        }
    }
}