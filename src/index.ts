import * as dotEnvExtended from "dotenv-extended";
import * as discord from "discord.js";
import {JollyTypes} from "./types/types";
import { resolve } from "path";
import { promisify } from "util";
import * as globCB from "glob";

const config = {
    commandsPath: "./commands",
    eventsPath: "./events",
    intents: [
        discord.GatewayIntentBits.Guilds,
        discord.GatewayIntentBits.GuildMessages,
        discord.GatewayIntentBits.MessageContent,
        discord.GatewayIntentBits.GuildMembers
    ],

}

console.clear();
const mode = "dev";
const env = {
    dev: "dev.env",
    prod: ".env"
}

dotEnvExtended.load({
    path: env[mode],
    errorOnRegex: true
});
const client = new discord.Client(
    config as unknown as JollyTypes.clientOptions
);
client.login(process.env["TOKEN"]);
const commands = new discord.Collection<string, JollyTypes.Command>();
const start = async () => {
    const setCommands = async () => {
        let glob = promisify(globCB);
        const commandFiles = await glob(resolve(__dirname, "./", "./commands", "**", "*.{ts,js}"))
        const commands2 = (await Promise.all(
            commandFiles.map(
                async (commandFilePath) =>
                    (await import(commandFilePath)).default ||
                    (await import(commandFilePath))
            ))) as JollyTypes.Command[];
        for (const command of commands2) {
            commands.set(command.name, command);
        }
        return
    }
    await setCommands()

    const setEvents = async () => {
        let glob = promisify(globCB);
        const eventFiles = await glob(resolve(__dirname, "./", "./events", "**", "*.{ts,js}"))
        const events2 = (await Promise.all(
            eventFiles.map(
                async (commandFilePath) =>
                    (await import(commandFilePath)).default ||
                    (await import(commandFilePath))
            ))) as JollyTypes.Event<keyof discord.ClientEvents>[];

        for (const event of events2) {
            if (event.event == "messageCreate") {
                client.on(event.event, event.run.bind(null, client, commands))
            } else if (event.event == "ready") {
                client.on(event.event, event.run.bind(null, client, commands, events2))
            } else {
                client.on(event.event, event.run.bind(null, client))
            }
        }
        return;
    }
    await setEvents()
}
start()
