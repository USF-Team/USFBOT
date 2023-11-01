const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
//
module.exports = {
    data: new SlashCommandBuilder()
    	.setName('ping').setDescription('Returns the ping of the bot').setDMPermission(true),
    async execute(interaction) {
        const pong = interaction.client.ws.ping;
        const sent = await interaction.reply({ content: 'Pinging...', fetchReply: true });
        const pingEmbed = new EmbedBuilder()
        	.setDescription(`Initial response: ${pong}ms\nRoundtrip latency: ${sent.createdTimestamp - interaction.createdTimestamp}ms`);
        interaction.editReply({ content: '', embeds: [pingEmbed] });
    },
};