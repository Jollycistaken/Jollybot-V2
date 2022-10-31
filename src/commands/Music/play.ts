import * as discord from "discord.js"
import { EmbedBuilder } from "../../structures/embed"
import * as distube from "distube"

export default {
    name: "play",
    description: "Play music",
    category: "Music",
    run: async (message: discord.Message<true>, args: string[], client: discord.Client<true>, _, player: distube.DisTube) => {
        if (!args[0] || args[0]?.toLowerCase() === "help") {
            const playHelpEmbed = new EmbedBuilder()
                .setTitle("Command: play")
                .setDescription(`**Description:** Play music\n**Usage:**\n${process.env["PREFIX"]}play [song]\n**Examples: **\n${process.env["PREFIX"]}play Yeat - Killin Em`)
            return await message.reply({embeds: [playHelpEmbed]})
        }
        if (!message.member.voice.channel) {
            const notVCErrorEmbed = new EmbedBuilder("Error")
                .setTitle("Error!")
                .setDescription(`You are not in a voice channel!`)
            return await message.reply({embeds: [notVCErrorEmbed]})
        }
        const song = args.join(" ")
        try {

            await player.play(message.member.voice.channel, song, {
                member: message.member,
                textChannel: message.channel,
                message
            })

        } catch (err) {
            console.error(err)
            const errorEmbed = new EmbedBuilder("Error")
                .setTitle("Error!")
                .setDescription(`Error: ${err}`)
            return await message.reply({embeds: [errorEmbed]})
        }
    }
}