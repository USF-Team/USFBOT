const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
//
module.exports={
    data: new SlashCommandBuilder().setName('role').setDescription('Get Role Informations')
        .addRoleOption(option=>option.setName('target').setDescription('Target Role to check').setRequired(true))
        .setDMPermission(false),
    async execute(interaction) {
        await interaction.deferReply();
        const role = interaction.options.getRole('target');
        const rolePos = interaction.guild.roles.cache.size - role.position;
        const rolbed = new EmbedBuilder()
            .setTitle(`${role.name} Role Informations`)
            .setDescription(`**Mention:** \`<@&${role.id}>\``)
            .addFields(
                { name: 'Role ID', value: `${role.id}`, inline: true },
                { name: 'Role Created Date', value: `<t:${Math.floor(role.createdTimestamp/1000)}:F>`, inline: true },
                { name: '\u200B', value: '\u200B' },
                { name: 'Role Position', value: `${rolePos}`, inline: true },
                { name: 'Role HEX Color', value: `${role.hexColor}`, inline: true },
                { name: 'Role Mentionable', value: `${role.mentionable}`, inline: true },
            )
            .setColor(role.hexColor);
        return interaction.editReply({embeds: [rolbed]});
    },
};