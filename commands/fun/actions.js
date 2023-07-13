const { ActionRowBuilder, ButtonBuilder, ButtonStyle, SlashCommandBuilder } = require('discord.js');
var ms = require('ms');
//
module.exports = {
	data: new SlashCommandBuilder()
    .setName('actions')
    .setDescription('Moderative actions to users')
    .addUserOption(option=>option.setName('target').setDescription('User to moderate'))
    .addStringOption(option=>option.setName('reason').setDescription('Reason of the moderation'))
    .addStringOption(option=>option.setName('duration').setDescription('Duration, for mutes only'))
    .setDMPermission(false),
	async execute(interaction) {
		const target = interaction.options.getMember('target');
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
            ephemeral: true,
		});
    const collectorFilter = i => i.user.id === interaction.user.id;
try {
	const confirmation = await response.awaitMessageComponent({ filter: collectorFilter, time: 60_000 });
	if (confirmation.customId === 'ban') {
		await interaction.guild.members.ban(target);
		await confirmation.update({ content: `${target.username} has been banned for reason: ${reason}`, components: [], ephemeral: true });
	} else if (confirmation.customId === 'kick') {
    await interaction.guild.members.kick(target);
		await confirmation.update({ content: `${target.username} has been kicked for reason: ${reason}`, components: [], ephemeral: true });
	} else if (confirmation.customId === "mute") {
    const time = interaction.options.getString('duration');
    const temp = await ms(time);
    target.timeout(temp, reason)
        .then(confirmation.update({ content: `${target} has been muted for ${time} | ${reason}`, components: [], ephemeral: true }))
        .catch(console.error);
  }
} catch (e) {
  console.log(e);
	await interaction.editReply({ content: 'Confirmation not received within 1 minute, cancelling', components: [], ephemeral: true });
}
	},
};