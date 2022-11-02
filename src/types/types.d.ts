import * as discord from "discord.js";
import * as distube from "distube"

declare namespace JollyTypes {
    export interface clientOptions extends Discord.ClientOptions {
        commandsPath: string;
        eventsPath: string;
        intents: discord.GatewayIntentBits[];
    }

    interface Event<E extends keyof Discord.ClientEvents> {
        event: E;
        run: (client: discord.Client<true>, ...eventArgs: discord.ClientEvents[E]) => void;
    }

    interface tubeEvent<E extends distube.Events> {
        event: E;
        run: (...eventArgs: distube.Events[E]) => void;
    }

    interface Command<> {
        name: string;
        path: string;
        description?: string;
        category: string;
        needsPermissions?: boolean;
        permissionLevel?: string;
        nsfw?: boolean;
        run: (
            message: discord.Message,
            args: string[],
            client: discord.Client<true>,
        ) => void;
    }
}