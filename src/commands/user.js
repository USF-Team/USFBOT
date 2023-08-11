const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
//
module.exports = {
    data: new SlashCommandBuilder()
    	.setName('user').setDescription('Get informations about an user')
    	.addUserOption(option=>option.setName('target').setDescription('User you want to view').setRequired(true))
    	.setDMPermission(true),
    async execute(interaction) {
        const target = interaction.options.getMember('target');
        const created = Math.floor(target.createdTimestamp/1000);
        const userEmbed = new EmbedBuilder()
        	.setColor(0x00ffff)
        	.setTitle(`${target.username} Informations`)
        	.setThumbnail(`${target.displayAvatarURL({dynamic:true,size:2048})}`)
        	.addFields(
                {name: "Username and ID", value: `${target.username} | ${target.id}`},
                {name: '\u200B', value: '\u200B'},
                {name: "Created Date", value: `<t:${created}:R>`},
                {name: 'Joined Date', value: `${target.joinedAt}`}
            )
        	.setTimestamp()
        	.setFooter({ text: `Requested by ${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL({size:2048})}`});
        await interaction.reply({ embeds: [userEmbed] });
    }
}