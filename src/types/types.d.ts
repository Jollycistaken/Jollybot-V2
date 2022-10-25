
import * as Discord from "discord.js";

declare namespace JollyTypes {
    export interface clientOptions extends Discord.ClientOptions {
        commandsPath: string;
        eventsPath: string;
    }
    interface Event<E extends keyof Discord.ClientEvents> {
        event: E;
        run: (client: any, ...eventArgs: Discord.ClientEvents[E]) => void;
    }
    interface Command<> {
        name: string;
        description?: string;
        category: string;
        needsPermissions?: boolean;
        run: (
            message: Discord.Message,
            args: string[],
            client: any
        ) => void;
    }
}