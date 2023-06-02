const { SlashCommandBuilder, PermissionsBitField } = require('discord.js');
//
module.exports = {
	data: new SlashCommandBuilder()
		.setName('kick')
		.setDescription('Select a member and kick them.')
		.addUserOption(option => option.setName('target').setDescription('The member to kick').setRequired(true)),
	async execute(interaction) {
    const member = interaction.options.getMember('target');
		if (interaction.member.permissions.has(PermissionsBitField.Flags.KickMembers)) {
		  await interaction.guild.members.kick(member);
      await interaction.reply({content: `The member ${member} was kicked from the server.`, ephemeral: true});
	} else {
  await interaction.reply({content: `You don't have the required permission to run this command!`, ephemeral: true});
}
}
}