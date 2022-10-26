import * as discord from "discord.js"

export default {
    name: "help",
    description: "The help command",
    category: "Utility",
    needsPermissions: false,
    run: async (message: discord.Message, args: string[], client: discord.Client<true>, commands: Map<string, any>) => {
        const categories = new Array<string>();
        commands.forEach( async (cmd) => {
            if (!categories.includes(cmd.category)) {
                categories.push(cmd.category);
            }
        })
        const setsembed = function (title) {
            let helpEmbed = new discord.EmbedBuilder()
            helpEmbed.setColor(0x2ecc71)
            helpEmbed.setTitle(`${title}: `);
            commands.forEach( async (cmd) => {
                if (cmd.category.toLowerCase() === title.toLowerCase()) {
                    helpEmbed.addFields({
                        name: `**j!${cmd.name}**`,
                        value: `${cmd.description}`,
                        inline: false
                    });
                }
            })
            return helpEmbed
        }
        let firstEmbed = setsembed(categories[0]);
        const row = new discord.ActionRowBuilder<discord.SelectMenuBuilder>()
        const selectmenu = new discord.SelectMenuBuilder()
            .setCustomId(`helpmenuselect`)
            .setPlaceholder("Make a selection")
        categories.forEach( async (cag) => {
            selectmenu.addOptions(
                 {
                    label: cag,
                    value: cag
                }
            )
        })
        row.addComponents(
            selectmenu
        )
        let currentembed = [firstEmbed];
        message.reply({
            embeds: [firstEmbed],
            components: [row]
        }).then(async (msg) => {
            const filter = (i) => i.isSelectMenu() && i.user.id === message.author.id;
            let colletor = msg.createMessageComponentCollector({filter: filter});

            async function disableAll() {
                row.components[0].setDisabled(true);

                await msg.edit({
                    embeds: [currentembed[0]],
                    components: [row]
                });
            }

            let timeout = setTimeout(disableAll, 5000)

            colletor.on("collect", async (interaction) => {
                categories.forEach( async (cag) => {
                    console.log("place holder")
                })
                if (timeout) clearTimeout(timeout);
                timeout = setTimeout(disableAll, 5000)
            })
        })
    }
}