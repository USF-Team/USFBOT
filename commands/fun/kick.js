const { SlashCommandBuilder, PermissionsBitField } = require('discord.js');
//
module.exports = {
	data: new SlashCommandBuilder()
		.setName('kick')
		.setDescription('Select a member and kick them.')
		.addUserOption(option => option.setName('target').setDescription('The member to kick').setRequired(true))
    	.addStringOption(option => option.setName('reason').setDescription('Reason of the kick'))
    .setDMPermission(false),
	async execute(interaction) {
    const member = interaction.options.getMember('target');
    const reason = interaction.options.getString('reason');
		if (interaction.member.permissions.has(PermissionsBitField.Flags.KickMembers)) {
      		await interaction.reply({content: `The member ${member} was kicked from the server. | ${reason}`, ephemeral: true});
            return member.kick(reason);
		} else {
  			await interaction.reply({content: `You don't have the required permission to run this command!`, ephemeral: true});
		}
	}
}