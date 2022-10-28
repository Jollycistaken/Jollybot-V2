import * as discord from "discord.js"

export class EmbedBuilder extends discord.EmbedBuilder {
    public defaultColor: discord.ColorResolvable = 0x2ecc71;
    public embed: discord.EmbedBuilder;
    constructor(type?: string) {
        super();
        this.embed = new discord.EmbedBuilder();
        this.setType(type);
    }
    setType(name: string) {
        switch(name.toLowerCase()) {
            case "success":
                this.embed.setColor(0x2ecc71);
                break;
            case "error":
                this.embed.setColor(0xff0000);
                break;
            default:
                this.embed.setColor(this.defaultColor);
        }
        return this
    }
}