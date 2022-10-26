
import * as discord from "discord.js";

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
    interface Command<> {
        name: string;
        description?: string;
        category: string;
        needsPermissions?: boolean;
        run: (
            message: discord.Message,
            args: string[],
            client: discord.Client<true>
        ) => void;
    }
}