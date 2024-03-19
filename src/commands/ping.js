const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
//
module.exports = {
    data: new SlashCommandBuilder()
    	.setName('ping').setDescription('Return the ping of the bot').setDMPermission(true),
    async execute(interaction) {
        const pong = interaction.client.ws.ping;
        const sent = await interaction.reply({ content: 'Pinging...', fetchReply: true });
        const pingEmbed = new EmbedBuilder()
            .setColor(0x00ffff)
            .setTitle('Pong! 🏓')
        	.setDescription(`- 🤖 **Bot Latency**: \`${pong}ms\`\n*Delay that USF takes to Respond to Discord*\n\n- <:discord:1214593450331086868> **Discord Latency**: \`${sent.createdTimestamp - interaction.createdTimestamp}ms\`\n*Delay between the bot and Discord*`);
        return interaction.editReply({ content: '', embeds: [pingEmbed] });
    },
};