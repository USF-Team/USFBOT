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
            case 0: membed.setImage('https://cdn.discordapp.com/attachments/869649231357566996/1120930862142324776/Screenshot_20221117-150709_Instagram.jpg');
                break;
            case 1: membed.setImage('https://cdn.discordapp.com/attachments/869649231357566996/1131423617222189086/F1ahruCWAAgTSs1.png');
                break;
            case 2: membed.setImage('https://cdn.discordapp.com/attachments/869649231357566996/1131491186968887336/image0-3.png');
                break;
            case 3: membed.setImage('https://cdn.discordapp.com/attachments/869649231357566996/1133069339600355409/image0.png');
                break;
            case 4: membed.setImage('https://bork.treble-is-fluffy.gay/floofd3f5d20b.png');
                break;
            case 5: membed.setImage('https://media.discordapp.net/attachments/869649231357566996/1130006195973935144/image0.png?width=452&height=267');
                break;
            case 6: membed.setImage('https://cdn.discordapp.com/attachments/869649231357566996/1129318636406964254/unknown-9.png');
                break;
            case 7: membed.setImage('https://media.discordapp.net/attachments/589292970541318185/910506930311688242/55E99038-2A34-4D42-A48D-C484E804E113.gif');
                break;
            case 8: membed.setImage('https://pbs.twimg.com/media/F0Mp_8faQAETF9b.jpg');
                break;
            case 9: membed.setImage('https://cdn.discordapp.com/attachments/869649231357566996/1125456070098300928/RDT_20230228_2010271844177727699477208.jpg');
                break;
            case 10: membed.setImage('https://cdn.discordapp.com/attachments/1093146597388460083/1123323635982159912/Bad_captcha.png');
                break;
            case 11: membed.setImage('https://cdn.discordapp.com/attachments/869649231357566996/1124728879030992948/Screenshot_2023-07-01-10-44-39-276_com.instagram.android.png');
                break;
            case 12: membed.setImage('https://cdn.discordapp.com/attachments/869649231357566996/1124679532218175610/Fz44dpjXgAAHkHl.png');
                break;
            case 13: membed.setImage('https://cdn.discordapp.com/attachments/869649231357566996/1123692028845371392/Fzu1A89X0CMMRON.png');
                break;
            case 14: membed.setImage('https://media.discordapp.net/attachments/107936397578489856/1123315431835447408/FzP6EArXgAoUnzo.png');
                break;
            case 15: membed.setImage('https://cdn.discordapp.com/attachments/869649231357566996/1123311750939418695/FzVfvmIaIAEmVGD.png');
                break;
            case 16: membed.setImage('https://cdn.discordapp.com/attachments/869649231357566996/1122214222667976834/FwHgDEPXwAAzApV.png');
                break;
            case 17: membed.setImage('https://media.discordapp.net/attachments/869649231357566996/1122074368974008370/image0-1.jpg?width=522&height=668');
                break;
            case 18: membed.setImage('https://media.discordapp.net/attachments/869649231357566996/1122074369242447912/IMG_3963.jpg?width=1440&height=586');
                break;
            case 19: membed.setImage('https://media.discordapp.net/attachments/869649231357566996/1122067726714810368/20230616_203744.jpg?width=483&height=670');
                break;
            case 20: membed.setImage('https://media.discordapp.net/attachments/869649231357566996/1122063540308676688/20230618_000414.jpg?width=681&height=670');
                break;
            case 21: membed.setImage('https://media.discordapp.net/attachments/869649231357566996/1122063542745575445/1a19b1572ad6bcf137ca173a945c478b.png?width=862&height=670');
                break;
            case 22: membed.setImage('https://media.discordapp.net/attachments/107936397578489856/1134896421267579020/j6cyPRl9SWpoATr7Wgy.png');
                break;
            case 23: membed.setImage('https://media.discordapp.net/attachments/107936397578489856/1134896732912746556/image.png');
                break;
            case 24: membed.setImage('https://media.discordapp.net/attachments/869649231357566996/1134758062532612096/d6e08c90d49141867e92ce929343f089.png');
                break;
            case 25: membed.setImage('https://media.discordapp.net/attachments/840362035719831563/1034030733548847124/-429cefeebd80c14a.jpg');
                break;
            case 26: membed.setImage('https://cdn.discordapp.com/attachments/1146515819203936317/1146515952947707964/F4ZDGKwXQAo1xyL.png?ex=653027b0&is=651db2b0&hm=6e98d3c697d15688754d14486fd56c967b6f8eac24023897ee3c75f29d8f739f&');
                break;
            case 27: membed.setImage('https://media.discordapp.net/attachments/869649231357566996/1151458162805846057/RDT_20230913_115003404854264940612735.jpg');
                break;
            case 28: membed.setImage('https://media.discordapp.net/attachments/869649231357566996/1151652663935639693/image0.png');
                break;
            case 29: membed.setImage('https://media.discordapp.net/attachments/222197033908436994/1151637738517450843/Screenshot_20230913_145519_GitHub.png');
                break;
            case 30: membed.setImage('https://imgur.com/SNCvBos');
                break;
            case 31: membed.setImage('https://media.discordapp.net/attachments/869649231357566996/1153697679239548998/A8pUzxkP5ToxAAAAAElFTkSuQmCC.png');
                break;
            case 32: membed.setImage('https://media.discordapp.net/attachments/1071747376534003732/1152446330560598026/Screenshot_2023-09-15_203158.png');
                break;
            case 33: membed.setImage('https://media.discordapp.net/attachments/418250622245142538/1155461314169290882/Screenshot_20230924-073608.png');
                break;
            default: membed.setFooter({text: 'There was a problem with memes generation, please try again later.'});
        }
        if (number===3) {
            membed.setFooter({text: 'Do you like coding like this?'});
        }
        interaction.editReply({embeds: [membed] });
    }
}