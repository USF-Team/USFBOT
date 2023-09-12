const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
//
module.exports = {
    data: new SlashCommandBuilder()
    	.setName('user').setDescription('Get informations about an user')
    	.addUserOption(option=>option.setName('target').setDescription('User you want to view').setRequired(true))
    	.setDMPermission(true),
    async execute(interaction) {
        const target = interaction.options.getUser('target');
        let created = target.createdTimestamp/1000;
        created = Math.floor(created);
        const userEmbed = new EmbedBuilder()
        	.setColor(0x00ffff)
        	.setTitle(`${target.username} Informations`)
        	.setThumbnail(`${target.displayAvatarURL({size:2048})}`)
        	.addFields(
                {name: "Username and ID", value: `${target.username} | ${target.id}`},
                {name: '\u200B', value: '\u200B'},
                {name: "Created Date", value: `<t:${created}:R>`},
            )
        	.setTimestamp()
        	.setFooter({ text: `Requested by ${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL({size:2048})}`});
        if (interaction.guild) {
            const joined = interaction.options.getMember('target');
            userEmbed.addFields(
                {name: 'Joined Date', value: `${joined.joinedAt}`},
            )
        }
        await interaction.reply({ embeds: [userEmbed] });
    }
}