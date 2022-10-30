import * as discord from "discord.js"
import { JollyTypes } from "../types/types";
export default {
    event: "ready",
    run: async (client: discord.Client<true>, commands: discord.Collection<string, JollyTypes.Command>, events) => {
        client.user.setActivity(`Use ${process.env["PREFIX"]}help for commands!`, {
            type: discord.ActivityType.Playing,
        })
        console.log(`Jolly Bot has successfully loaded ${commands.size} commands and ${events.length} events!`)
    }
}