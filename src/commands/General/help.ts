import * as discord from "discord.js"
import { EmbedBuilder } from "../../structures/embed"

export default {
    name: "help",
    description: "The help command",
    category: "General",
    run: async (message: discord.Message, args: string[], client: discord.Client<true>) => {
        const categories = new Array<string>();
        const commands = client["commands"];
        for (const [_, cmd] of commands) {
            if (!categories.includes(cmd.category)) {
                categories.push(cmd.category);
            }
        }
        function makeHelpEmbed(title) {
            let helpEmbed = new EmbedBuilder("Success")
            helpEmbed.setTitle(`${title}: `);
            commands.forEach( async (cmd) => {
                if (cmd.category.toLowerCase() === title.toLowerCase()) {
                    helpEmbed.addFields({
                        name: `**${process.env["PREFIX"]}${cmd.name}**`,
                        value: `${cmd.description}`,
                        inline: false
                    });
                }
            })
            return helpEmbed
        }
        let currentEmbed = makeHelpEmbed("General");
        const row = new discord.ActionRowBuilder<discord.SelectMenuBuilder>()
        const selectMenu = new discord.SelectMenuBuilder()
            .setCustomId(`helpmenuselect`)
            .setPlaceholder("Make a selection")
        for (const cag of categories) {
            selectMenu.addOptions(
                {
                    label: cag,
                    value: cag
                }
            )
        }
        row.addComponents(
            selectMenu
        )
        message.reply({
            embeds: [currentEmbed],
            components: [row]
        }).then(async (msg) => {
            const filter = (i) => i.isSelectMenu() && i.user.id === message.author.id;
            let collector = msg.createMessageComponentCollector({filter: filter});

            async function disableAll() {
                row.components[0].setDisabled(true);

                await msg.edit({
                    embeds: [currentEmbed],
                    components: [row]
                });
            }

            let timeout = setTimeout(disableAll, 5000)

            collector.on("collect", async (interaction: discord.SelectMenuInteraction) => {
                for (const cag of categories) {
                    if (interaction.values[0] === cag) {
                        currentEmbed = makeHelpEmbed(cag);
                        await interaction.update({
                            embeds: [currentEmbed]
                        })
                    }
                }
                if (timeout) clearTimeout(timeout);
                timeout = setTimeout(disableAll, 5000)
            })
        })
    }
}