const { SlashCommandBuilder, PermissionsBitField } = require('discord.js');
//
module.exports = {
	data: new SlashCommandBuilder()
    .setName('ban')
    .setDescription('Bans an user')
    .addUserOption(option=>option.setName('target').setDescription('The user to ban'))
    .addStringOption(option=>option.setName('reason').setDescription('Reason of the ban'))
    .setDMPermission(false),
  async execute(interaction) {
    const member = interaction.options.getMember('target');
    if (interaction.member.permissions.has(PermissionsBitField.Flags.BanMembers)) {
      const reason = interaction.options.getString('reason') ?? "No reason provided";
		  await interaction.guild.members.ban(user);
      await interaction.reply({content: `The Member ${user} has been banned from the server. Reason: ${reason}`, ephemeral: true});
    } else {
      await interaction.reply({content: `You don't have the required permission to run this command!`, ephemeral: true});
    }
  },
};