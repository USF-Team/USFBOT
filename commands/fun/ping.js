const { SlashCommandBuilder } = require('discord.js');
//
module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),
	async execute(interaction) {
        const pong = interaction.client.ws.ping;
		const sent = await interaction.reply({ content: 'Pinging...', fetchReply: true });
interaction.editReply(`Initial response: ${pong}ms\nRoundtrip latency: ${sent.createdTimestamp - interaction.createdTimestamp}ms`);
	},
};