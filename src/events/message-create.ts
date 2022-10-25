export default {
    event: "messageCreate",
    run: async (client, commands, message) => {
        const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        if (message.author.bot) return;
        if (!message.guild) return;
        const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(process.env["PREFIX"])})\\s*`);
        if (!prefixRegex.test(message.content)) return;
        const [, matchedPrefix] = message.content.match(prefixRegex);
        const args = message.content.slice(matchedPrefix.length).trim().split(/ +/);
        const commandName = args.shift().toLowerCase();
        const command = commands.get(commandName);
        if (!command) return;
        try {
            command.run(message, args, client);
        } catch(error) {
            console.error(error);
            message.reply("Command has errored" + error);
        }
    }
}