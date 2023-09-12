const { EmbedBuilder, PermissionsBitField, SlashCommandBuilder } = require('discord.js');
var ms = require('ms');
//
module.exports = {
    data: new SlashCommandBuilder()
    	.setName('timeout').setDescription('Timeout a guild member')
    	.addUserOption(option=>option.setName('target').setDescription('Member to timeout').setRequired(true))
    	.addStringOption(option=>option.setName('duration').setDescription('Duration of the timeout').setRequired(true))
    	.addStringOption(option=>option.setName('reason').setDescription('Reason of the timeout'))
    	.setDMPermission(false),
    async execute(interaction) {
        const target = interaction.options.getMember('target');
        if (interaction.member.permissions.has(PermissionsBitField.Flags.ModerateMembers)) {
            if (!target.permissions.has(PermissionsBitField.Flags.ModerateMembers)) {
                const time = interaction.options.getString('duration');
                const temp = await ms(time);
                const reason = interaction.options.getString('reason') ?? 'No reason provided';
                const timeoutEmbed = new EmbedBuilder()
                	.setDescription(`${target} has been muted for ${time} | ${reason}`);
                try {
                    target.send(`You have been timed out in ${interaction.guild.name} for ${time} | ${reason}`);
                } catch {
                    timeoutEmbed.setFooter({text: 'I couldn\'t DM the user, they probably have DMs from server members disabled!'});
                    console.error;
                }
                target.timeout(temp, reason)
                	.then(interaction.reply({embeds: [timeoutEmbed], ephemeral: true}))
                	.catch(console.error);
            } else {
                interaction.reply({content: 'You don\'t have the permission to timeout this user', ephemeral: true});
            }
        } else {
            interaction.reply({content: 'You are missing the `ModerateMembers` Permission', ephemeral: true});
        }
    },
};