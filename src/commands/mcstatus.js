const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const { getStatus } = require("mc-server-status");
const { discord } = require('../../config.json');
//
module.exports = {
    data: new SlashCommandBuilder()
    	.setName('mcstatus').setDescription('Get the status of a Minecraft Server')
    	.addStringOption(option=>option.setName('address').setDescription('IP Address of the Minecraft server (without port)').setRequired(true))
    	.setDMPermission(false),
    async execute(interaction) {
        await interaction.deferReply();
        const wait = require('node:timers/promises').setTimeout;
        await wait(3000);
        const host = interaction.options.getString('address');
        const status = await getStatus(`${host}`);
        const sembed = new EmbedBuilder()
        	.setTitle(`${host.toLowerCase()}`)
        	.setDescription(`${status.description}`)
        	.addFields(
                { name: 'Players', value: `${status.players.online}/${status.players.max}`, inline: true},
                { name: 'Version', value: `${status.version.name}`, inline: true},
                { name: 'Ping', value: `${status.ping}`},
            )
        	.setFooter({ text: `Requested by ${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL({size:32})}`})
        	.setTimestamp();
        let rep = await interaction.editReply({ embeds: [sembed] });
        if (status.players.max===0) {
            sembed.setColor(0xff0000);
            sembed.addFields(
                {name: 'Status', value: 'OFFLINE'},
            );
            rep.edit({embeds: [sembed]});
            if (status.description.text) {
                sembed.setDescription(`${status.description.text}`);
                rep.edit({embeds: [sembed]});
            }
        } else {
            sembed.setColor(0x00ff00);
            sembed.addFields(
                {name: 'Status', value: 'ONLINE'},
            );
            rep.edit({ embeds: [sembed] });
            if (status.description.text) {
                sembed.setDescription(`${status.description.text}`);
                rep.edit({embeds: [sembed]});
            }
        }
    },
};
