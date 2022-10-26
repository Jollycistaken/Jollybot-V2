import * as discord from "discord.js"
export default {
    event: "ready",
    run: async (client: discord.Client<true>, commands, events) => {
        client.user.setActivity("Use j!help for command list", {
            type: discord.ActivityType.Playing,
        })
        console.log(`Jolly Bot has successfully loaded ${commands.size} commands and ${events.length} events!`)
    }
}