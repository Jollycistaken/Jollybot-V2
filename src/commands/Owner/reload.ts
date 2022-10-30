import * as discord from "discord.js"
import { EmbedBuilder } from "../../structures/embed"
import {JollyTypes} from "../../types/types";

export default {
    name: "reload",
    description: "Reloads a command",
    category: "Owner",
    needsPermissions: true,
    permissionLevel: "Owner",
    run: async (message: discord.Message, args: string[], client: discord.Client<true>, commands: discord.Collection<string, JollyTypes.Command>) => {
        if (!args || args.length < 1) {
            const reloadHelpEmbed = new EmbedBuilder()
                .setTitle("Command: reload")
                .setDescription(`**Description:** Reloads a command\n**Usage:**\n${process.env["PREFIX"]}reload [commandName]\n**Examples: **\n${process.env["PREFIX"]}reload help`)
            return await message.reply({embeds: [reloadHelpEmbed]})
        }
        const cmdName = args[0];
        if (!(commands.has(cmdName))) {
            return message.reply("Jolly, you are trippin");
        }
        const cmdPath = commands.get(cmdName).path
        delete require.cache[require.resolve(cmdPath)];
        commands.delete(cmdName);
        const props = (await import(cmdPath)).default ||
            (await import(cmdPath))
        props.path = cmdPath
        commands.set(cmdName, props);
        return message.reply(`${cmdName} has been reloaded!`)
    }
}