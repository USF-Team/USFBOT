const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
//
module.exports = {
    data: new SlashCommandBuilder()
    	.setName('user').setDescription('Get informations about an user')
    	.addUserOption(option=>option.setName('target').setDescription('User you want to view'))
    	.setDMPermission(true),
    async execute(interaction) {
        await interaction.deferReply()
        const target = interaction.options.getUser('target') ?? interaction.user;
        let created = Math.floor(target.createdTimestamp/1000)
        const userEmbed = new EmbedBuilder()
        	.setColor(0x00ffff)
        	.setTitle(`${target.username} Informations`)
        	.setThumbnail(`${target.displayAvatarURL({size:2048})}`)
        	.addFields(
                {name: "Username and ID", value: `${target.username} | ${target.id}`},
                {name: '\u200B', value: '\u200B'},
                {name: "Created Date", value: `<t:${created}:F>`},
            )
        	.setTimestamp()
        	.setFooter({ text: `Requested by ${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL({size:2048})}`});
        if (interaction.guild) {
            const member = interaction.options.getMember('target') ?? interaction.member;
            let joined = Math.floor(member.joinedTimestamp/1000);
            userEmbed.addFields(
                {name: 'Joined Date', value: `<t:${joined}:F>`},
            )
        }
        return interaction.editReply({ embeds: [userEmbed] });
    }
}