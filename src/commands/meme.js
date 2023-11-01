const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const { discord } = require('../../config.json');
//
module.exports = {
    data: new SlashCommandBuilder()
    	.setName('meme').setDescription('Generate a random meme').setDMPermission(false),
    async execute(interaction) {
        const wait = require('node:timers/promises').setTimeout;
        await interaction.deferReply();
        await wait(2000);
        let number = Math.floor(Math.random()*66);
        number=number/2;
        number=Math.floor(number);
        const membed = new EmbedBuilder()
        	.setTitle('Here\'s a meme for you')
        	.setDescription(`You can suggest new memes to be added in our [Discord Server](${discord})`);
        switch(number) {
            
            /*case number: ...
            default:...*/
        }
        if (number===/*number*/) {
            //additional stuff
        }
        interaction.editReply({embeds: [membed] });
    }
}
