const { ActionRowBuilder, ButtonBuilder, ButtonStyle, SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
    .setName('actions')
    .setDescription('Moderative actions to users')
    .addUserOption(option=>option.setName('target').setDescription('User to moderate'))
    .addStringOption(option=>option.setName('reason').setDescription('Reason of the moderation')),
	async execute(interaction) {
		const target = interaction.options.getUser('target');
		const reason = interaction.options.getString('reason') ?? 'No reason provided';
//
		const mute = new ButtonBuilder()
			.setCustomId('mute')
			.setLabel('Mute')
			.setStyle(ButtonStyle.Primary);
//
		const kick = new ButtonBuilder()
			.setCustomId('kick')
			.setLabel('Kick')
			.setStyle(ButtonStyle.Secondary);
//
    	const ban = new ButtonBuilder()
      		.setCustomId('ban')
      		.setLabel('Ban')
      		.setStyle(ButtonStyle.Danger)
//
		const row = new ActionRowBuilder()
			.addComponents(mute, kick, ban);
//
		const response = await interaction.reply({
			content: `Actions for the user: ${target} | Selected reason: ${reason}`,
			components: [row],
		});
    const collectorFilter = i => i.user.id === interaction.user.id;
try {
	const confirmation = await response.awaitMessageComponent({ filter: collectorFilter, time: 60_000 });
	if (confirmation.customId === 'ban') {
		await interaction.guild.members.ban(target);
		await confirmation.update({ content: `${target.username} has been banned for reason: ${reason}`, components: [] });
	} else if (confirmation.customId === 'kick') {
    await interaction.guild.members.kick(target);
		await confirmation.update({ content: `${target.username} has been kicked for reason: ${reason}`, components: [] });
	} else if (confirmation.customId === "mute") {
    await interaction.guild.members.timeout(target);
    await confirmation.update({ content: `${target.username} has been muted for reason: ${reason}`, components: [] });
  }
} catch (e) {
  console.log(e);
	await interaction.editReply({ content: 'Confirmation not received within 1 minute, cancelling', components: [] });
}
	},
};
