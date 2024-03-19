const fs = require('node:fs');
const path = require('node:path');
const { ActivityType, Client, Collection, EmbedBuilder, Events, GatewayIntentBits } = require('discord.js');
const { token, bannedUsers, bannedGuilds, discord, joinCh, leaveCh } = require('./config.json');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.DirectMessages], presence: {status: 'ONLINE', activities: [{type: ActivityType.Playing, name: '/info'}]} });
//
client.cooldowns = new Collection();
client.commands = new Collection();
const foldersPath = path.join(__dirname, 'src');
const commandFolders = fs.readdirSync(foldersPath);
//
for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}
//
client.once(Events.ClientReady, () => {
    console.log(`Ready! Logged in as ${client.user.tag}!`);
});
client.on(Events.InteractionCreate, async interaction => {
    if (bannedUsers.includes(interaction.user.id)) {
        const userNotAllowed = new EmbedBuilder()
        	.setTitle('You are not allowed to use this Bot!')
        	.setDescription(`Hello ${interaction.user},\nWe are sorry but you are not allowed to use the USF Bot.\n\nThis usually happens when you break our [Terms of Service](https://github.com/USF-Team/USFBOT#terms-of-service)\nIf you believe this is an error, you can appeal in our [Discord Server](${discord}).`);
            return interaction.reply({embeds: [userNotAllowed], ephemeral: true});
    }
    if (interaction.guild) {
        if (bannedGuilds.includes(interaction.guild.id)) {
            const guildNotAllowed = new EmbedBuilder()
            	.setTitle('This guild is not allowed to use this Bot!')
            	.setDescription(`Hello ${interaction.user},\nWe are sorry but this guild is not allowed to use the USF Bot.\n\nThis usually happens when guild members break our [Terms of Service](https://github.com/USF-Team/USFBOT#terms-of-service)\nIf you believe this is an error and you are the guild owner, you can appeal in our [Discord Server](${discord}).`);
            return interaction.reply({embeds: [guildNotAllowed], ephemeral: true});
        }
    }
    //
    if (!interaction.isChatInputCommand()) return;
    const command = client.commands.get(interaction.commandName);
    if (!command) return;
    //
    const { cooldowns } = client;
    if (!cooldowns.has(command.name)) {
		cooldowns.set(command.name, new Collection());
	}
    const now = Date.now();
	const timestamps = cooldowns.get(command.name);
	const defaultCooldownDuration = 3;
	const cooldownAmount = (command.cooldown ?? defaultCooldownDuration) * 1000;
    //
    if (timestamps.has(interaction.user.id)) {
        const expirationTime = timestamps.get(interaction.user.id) + cooldownAmount;
        if (now<expirationTime) {
            const expiredTimestamp = Math.round(expirationTime / 1000);
            interaction.reply({ content: `Please wait <t:${expiredTimestamp}:R> more second(s) before reusing the \`${command.name}\` command.`, ephemeral: true });
            return;
        }
    }
    //
    timestamps.set(interaction.user.id, now);
	setTimeout(() => timestamps.delete(interaction.user.id), cooldownAmount);
    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        const erbed = new EmbedBuilder()
            .setColor(0xff0000)
        	.setTitle('We\'re sorry, an error occurred!')
        	.setDescription(`Please wait a few seconds and if the error persists, please contact the Development Team in our [Discord Server](${discord})`);
        if (interaction.replied) {
            await interaction.editReply({ embeds: [erbed], ephemeral: true });
        } else {
            await interaction.reply({ embeds: [erbed], ephemeral: true });
        }
    }
});
client.on(Events.GuildCreate, guild => {
    const joinch = client.channels.cache.get(joinCh);
    const joinembed = new EmbedBuilder()
    	.setColor(0x00ff00)
    	.setTitle('Joined a new Guild')
    	.addFields(
      		{ name: 'Server name', value: `${guild.name}` },
      		{ name: '\u200B', value: '\u200B' },
      		{ name: 'Members', value: `${guild.memberCount}`, inline: true },
      		{ name: 'ID', value: `${guild.id}`, inline: true },
      		{ name: 'GuildsCount', value: `${client.guilds.cache.size}`, inline: true },
    	)
    	.setTimestamp();
    if (guild.icon) {
        joinembed.setThumbnail(`${guild.iconURL({ size: 2048 }) }`);
    }
    joinch.send({embeds:[joinembed]});
    if (bannedGuilds.includes(guild.id)) {
        guild.leave();
        joinch.send('This Guild is blacklisted. The Bot left the guild.');
    }
});
client.on(Events.GuildDelete, async guild => {
    if (client.isReady()) {
        const leavech = await client.channels.fetch(leaveCh);
        const leaveEmbed = new EmbedBuilder()
            .setColor(0xff0000)
            .setTitle('Left a Guild')
            .addFields(
                { name: 'Server Name', value: `${guild.name}`},
                { name: '\u200B', value: '\u200B' },
                { name: 'Members', value: `${guild.memberCount}`, inline: true },
                { name: 'ID', value: `${guild.id}`, inline: true },
                { name: 'GuildsCount', value: `${client.guilds.cache.size}`, inline: true },
    	    )
    	    .setTimestamp();
        if (guild.icon) {
            leaveEmbed.setThumbnail(`${guild.iconURL({ size: 2048 }) }`);
        }
        leavech.send({ embeds: [leaveEmbed] });
    }
});
process.on('unhandledRejection', console.error)
process.on('uncaughtException', console.error)
client.login(token);