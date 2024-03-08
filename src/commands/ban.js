const { EmbedBuilder, PermissionsBitField, SlashCommandBuilder } = require('discord.js');
const { discord } = require('../../config.json')
//
module.exports = {
    data: new SlashCommandBuilder()
    	.setName('ban').setDescription('Bans an user')
    	.addUserOption(option=>option.setName('target').setDescription('The user to ban').setRequired(true))
    	.addStringOption(option=>option.setName('reason').setDescription('Reason of the ban'))
    	.setDMPermission(false),
    async execute(interaction) {
        await interaction.deferReply({ephemeral: true})
        let erbed = new EmbedBuilder()
        	.setColor(0xff0000)
        	.setTitle('Error')
        	.setDescription('An Error Occurred!');
        if (interaction.member.permissions.has(PermissionsBitField.Flags.BanMembers)) {
            const target = interaction.options.getMember('target');
            if (!target.bannable) {
                erbed.setTitle('Missing Permission').setDescription('The bot is either missing the Required Permission to Execute this action or the punishment is not possible because the user has a higher rank')
                return interaction.editReply({embeds: [erbed], ephemeral: true});
            }
            if (target.permissions.has(PermissionsBitField.Flags.BanMembers)) {
                erbed.setTitle('Unauthorized').setDescription('The Target Member has the Permission: `BanMembers`');
                return interaction.editReply({embeds: [erbed], ephemeral: true});
            }
            let reason = interaction.options.getString('reason') ?? 'No Reason Provided';
            let banEmbed = new EmbedBuilder()
            	.setDescription(`${target} has been **banned** | ${reason}`);
            target.ban({reason: `[${interaction.user.username}] : ${reason}`})
                .then(inter => {
                    target.send(`You have been banned from **${interaction.guild.name}** | ${reason}`)
                        .then(inter => {
                            banEmbed.setFooter({text: 'User DMed Successfully!'})
                            return interaction.editReply({ embeds: [banEmbed], ephemeral: true });
                        })
                        .catch(error => {
                            banEmbed.setFooter({ text: 'Could not DM the user!'});
                            return interaction.editReply({ embeds: [banEmbed], ephemeral: true });
                        });
                }).catch(error => {
                    erbed.setTitle('Unexpected Error').setDescription(`There was an error while trying to ban the user\n${error}`);
                    return interaction.editReply({embeds: [erbed], ephemeral: true});
                })
        } else {
            erbed.setTitle('Missing Permission').setDescription('You are missing the Required Permission to run this Command: `BanMembers`');
            return interaction.editReply({embeds: [erbed], ephemeral: true});
        }
    }
}