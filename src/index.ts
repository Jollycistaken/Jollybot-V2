import * as dotEnvExtended from "dotenv-extended";
import * as discord from "discord.js";
import {JollyTypes} from "./types/types";
import { resolve } from "path";
import { promisify } from "util";
import * as globCB from "glob";
import * as distube from "distube"
import { SpotifyPlugin } from "@distube/spotify"
import { SoundCloudPlugin } from "@distube/soundcloud"
import { YtDlpPlugin } from "@distube/yt-dlp"

const config = {
    commandsPath: "./commands",
    eventsPath: "./events",
    intents: [
        discord.GatewayIntentBits.Guilds,
        discord.GatewayIntentBits.GuildMessages,
        discord.GatewayIntentBits.MessageContent,
        discord.GatewayIntentBits.GuildMembers,
        discord.GatewayIntentBits.GuildPresences,
        discord.GatewayIntentBits.GuildVoiceStates
    ],

}

console.clear();

dotEnvExtended.load({
    path: ".env",
    errorOnRegex: true
});
const client = new discord.Client(
    config as unknown as JollyTypes.clientOptions
);
client.login(process.env["TOKEN"]);
client["musicPlayer"] = new distube.DisTube(client, {
    leaveOnStop: false,
    leaveOnFinish: true,
    leaveOnEmpty: true,
    emitNewSongOnly: true,
    emitAddSongWhenCreatingQueue: false,
    emitAddListWhenCreatingQueue: false,
    plugins: [
        new SpotifyPlugin({
            emitEventsAfterFetching: true,
        }),
        new SoundCloudPlugin(),
        new YtDlpPlugin(),
    ],
});

client["commands"] = new discord.Collection<string, JollyTypes.Command>();
const start = async () => {
    const setCommands = async () => {
        let glob = promisify(globCB);
        const commandFiles = await glob(resolve(__dirname, "./", "./commands", "**", "*.{ts,js}"))
        commandFiles.map(
            async (filepath) => {
                const real = (await import(filepath)).default ||
                (await import(filepath))
                real.path = filepath;
            }
        )
        const commands2 = (await Promise.all(
            commandFiles.map(
                async (commandFilePath) => (await import(commandFilePath)).default ||
                    (await import(commandFilePath))

            ))) as JollyTypes.Command[];

        for (const command of commands2) {
            client["commands"].set(command.name, command);
        }

        return
    }
    await setCommands()
    const setTubeEvents = async () => {
        let glob = promisify(globCB);
        const eventFiles = await glob(resolve(__dirname, "./", "./TubeEvents", "**", "*.{ts,js}"))
        const events2 = (await Promise.all(
            eventFiles.map(
                async (commandFilePath) =>
                    (await import(commandFilePath)).default ||
                    (await import(commandFilePath))
            ))) as JollyTypes.tubeEvent<distube.Events>[];
        for (const event of events2) {
            client["musicPlayer"].on(event.event, event.run.bind(null))
        }
        client["musicEvents"] = events2
        return;
    }

    await setTubeEvents()
    const setEvents = async () => {
        let glob = promisify(globCB);
        const eventFiles = await glob(resolve(__dirname, "./", "./events", "**", "*.{ts,js}"))
        const events2 = (await Promise.all(
            eventFiles.map(
                async (commandFilePath) =>
                    (await import(commandFilePath)).default ||
                    (await import(commandFilePath))
            ))) as JollyTypes.Event<keyof discord.ClientEvents>[];
        client["discordEvents"] = events2
        for (const event of events2) {
            client.on(event.event, event.run.bind(null, client))
        }
        return;
    }
    await setEvents()
}
start()
