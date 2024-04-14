const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
//
module.exports = {
    data: new SlashCommandBuilder()
        .setName('faq').setDescription('USF Bot Frequently Asked Questions')
        .setDMPermission(true),
    async execute(interaction) {
        await interaction.deferReply()
        const faqs = new EmbedBuilder()
            .setColor(0x0000ff)
            .setTitle('USFBot FAQs')
            .setDescription('Currently, there are no FAQs Available! Feel free to ask any question in our Discord Support Server')
            .setTimestamp();
        return interaction.editReply({ embeds: [faqs] })
    }
}