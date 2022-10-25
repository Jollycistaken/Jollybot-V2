export default {
    event: "ready",
    run: async (client, commands, events) => {
        console.log(`Jolly Bot has successfully loaded ${commands.size} commands and ${events.length} events!`)
    }
}