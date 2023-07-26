const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
//
module.exports = {
    data: new SlashCommandBuilder()
    	.setName('meme').setDescription('Replies with a random meme')
    	.setDMPermission(false),
    async execute(interaction) {
        const number = Math.floor(Math.random()*/*number of memes*/);
        const membed = new EmbedBuilder()
        	.setTitle('Here\'s a meme for you')
        	.setDescription('You can suggest new memes to be added in our [Discord Server](https://dsc.gg/usfteam)');
        switch(number) {
            //case number: membed.setImage('');
        }
        if (number===3) {
            membed.setFooter({text: 'Do you like coding like this?'});
        }
        console.log(number);
        interaction.reply({embeds: [membed] });
    }
}
