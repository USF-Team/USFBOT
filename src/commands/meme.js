const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
//
module.exports = {
    data: new SlashCommandBuilder()
    	.setName('meme').setDescription('Generate a random meme').setDMPermission(false),
    async execute(interaction) {
        const wait = require('node:timers/promises').setTimeout;
        await interaction.deferReply();
        await wait(2000);
        let number = /*get a random number*/
        const membed = new EmbedBuilder()
        	.setTitle('Here\'s a meme for you')
        	.setDescription('You can suggest new memes to be added in our [Discord Server](https://dsc.gg/usfteam)');
        switch(number) {
            //case ....
        }
        if (number===/**/) {
            /*add more content*/
        }
        interaction.editReply({embeds: [membed] });
    }
}
