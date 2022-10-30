import * as discord from "discord.js"

export class EmbedBuilder extends discord.EmbedBuilder {
    public defaultColor: discord.ColorResolvable = 0x57F287;

    constructor(type?: string) {
        super();
        this.setType(type);
    }
    setType(name: string) {
        if (name === undefined) {
            this.setColor(this.defaultColor)
            return this;
        }
        switch(name.toLowerCase()) {
            case "success":
                this.setColor(0x57F287);
                break;
            case "error":
                this.setColor(0xED4245);
                break;
            default:
                this.setColor(this.defaultColor);
        }
        return this;
    }
}