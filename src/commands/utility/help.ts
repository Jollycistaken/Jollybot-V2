export default {
    name: "help",
    description: "The help command",
    category: "Utility",
    needsPermissions: false,
    run: async (message, args, client) => {
        message.reply("testing")
    }
}