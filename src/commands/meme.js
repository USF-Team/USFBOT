const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
//
module.exports = {
    data: new SlashCommandBuilder()
    	.setName('meme').setDescription('Generate a random meme').setDMPermission(false),
    async execute(interaction) {
        await interaction.deferReply();
        let number = Math.floor(Math.random()*88);
        number=number/2;
        number=Math.floor(number);
        const membed = new EmbedBuilder()
        	.setTitle('Generated Meme');
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
            case 34: membed.setImage('https://cdn.discordapp.com/attachments/1146515819203936317/1193210509747556473/20231113_222843.png?ex=65abe2e2&is=65996de2&hm=df47dfd5db1737fa80a3dc252da9a7e21845b9baeed7037aec9a3a80731e2d3a&');
                break;
            case 35: membed.setImage('https://media.discordapp.net/attachments/869649231357566996/1165166626048593920/image.png?ex=65ab607b&is=6598eb7b&hm=6d77ab0d592a0450aaf5b7bf2d2b351c72244c9b4e2dcdb7ab8e7216d396c5bd&');
                break;
            case 36: membed.setImage('https://media.discordapp.net/attachments/869649231357566996/1178598268532428860/facebook_1701052453430_7134731109631953085.png?ex=65a4deac&is=659269ac&hm=3a290c26f6c548b5b4433309a020922be63cd5387118ab3a006538507d51a78a&');
                break;
            case 37: membed.setImage('https://media.discordapp.net/attachments/869649231357566996/1179027904902991912/RDT_20220707_1214212390294983473056237.webp?ex=65a66ecd&is=6593f9cd&hm=5396e141d35fa2621880c3bbc50a257c66e72f3f13f06730228830386f630ea2&');
                break;
            case 38: membed.setImage('https://media.discordapp.net/attachments/869649231357566996/1177585119805050931/Screenshot_20231124_130946_Instagram.jpg?ex=65aa699b&is=6597f49b&hm=d51d2a9ed6193b4f775465884e634ba9f98e4a761e28278740cceb9df05b9c46&');
                break;
            case 39: membed.setImage('https://media.discordapp.net/attachments/869649231357566996/1179824794561155083/9k.png?ex=65a954f7&is=6596dff7&hm=d9dd9944544acf218057436aef6b8e4a902c67e670358c17ecb75c98ed625d39&');
                break;
            case 40: membed.setImage('https://media.discordapp.net/attachments/107936397578489856/1180840478829187194/Screenshot_2023-12-03-12-58-14-747-edit_com.instagram.android.jpg?ex=65a3cc65&is=65915765&hm=2ce5acc2701b9026866f126c697112416b45780947cc7bf457fdb7ee6a2e26fe&');
                break;
            case 41: membed.setImage('https://media.discordapp.net/attachments/869649231357566996/1180601463668482089/IMG_2664.png?ex=65a2edcb&is=659078cb&hm=8542e1b2a1e40db9d49c50bec1e3c54c96ecaf329e4e1e36e3210548581b83ad&');
                break;
            case 42: membed.setImage('https://cdn.discordapp.com/attachments/1122216509171839056/1182752440060235866/a.jpg?ex=65aac10c&is=65984c0c&hm=e12f24795c8f843dc6acbb66b9a4e55331bf3d6c028806442eeac980cf4bbf8b&');
                break;
            case 43: membed.setImage('https://cdn.discordapp.com/attachments/1146515819203936317/1189193390865272842/20231219_224727.jpg?ex=65a68026&is=65940b26&hm=b0a330cb0ad563a42607583922b0dd04e1fde7e65180ace7c19c8a3581665aec&');
                break;
            case 44: membed.setImage('https://cdn.discordapp.com/attachments/1146515819203936317/1189193391108522025/20231219_224017.jpg?ex=65a68026&is=65940b26&hm=6f8cac099d88727ae121945e39ef6e5ad6579a2cc40d8231b79c1902ccc1a443&');
                break;
            default: membed.setFooter({text: 'There was a problem with memes generation, please try again later.'});
        }
        if (number===3) {
            membed.setFooter({text: 'Do you like coding like this?'});
        }
        return interaction.editReply({embeds: [membed] });
    }
}