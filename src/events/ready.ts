import * as discord from "discord.js"

export default {
    event: "ready",
    run: async (client: discord.Client<true>) => {
        client.user.setActivity(`Use ${process.env["PREFIX"]}help for commands!`, {
            type: discord.ActivityType.Playing,
        })
        console.log(`Jolly Bot has successfully loaded ${client["commands"].size} commands and ${client["discordEvents"].length + client["musicEvents"].length} events!`)
    }
}