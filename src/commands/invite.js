const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, SlashCommandBuilder } = require('discord.js')
//
module.exports = {
    data: new SlashCommandBuilder()
        .setName('invite').setDescription('Invite the Bot to your servers!').setDMPermission(true),
    async execute(interaction) {
        await interaction.deferReply()
        const embed = new EmbedBuilder()
            .setColor(0x0000ff)
            .setTitle('Invite the USF Bot')
            .setDescription('Invite the USF Bot to your servers or use it as user-instaled app!\n\nClick the link button below to proceed!')
            .setTimestamp();
        const invite = new ButtonBuilder()
            .setLabel('Invite')
            .setStyle(ButtonStyle.Link)
            .setURL('https://discord.com/oauth2/authorize?client_id=1090240246005907466')
            .setEmoji('🔗');
        const row = new ActionRowBuilder().addComponents(invite);
        return interaction.editReply({ embeds: [embed], components: [row] })
    }
}