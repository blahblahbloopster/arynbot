module.exports = async (bot, message) => {
	if (message.channel.type === "dm" && message.author.id == bot.user.id)
		return console.log("[DM] " + bot.user.username + " -> " + message.channel.recipient.username + " | " + message.content);
	else if (message.channel.type === "dm" && message.author.id != bot.user.id)
		return console.log("[DM] " + message.channel.recipient.username + " -> " + bot.user.username + " | " + message.content);
	if (!message.channel.permissionsFor(message.guild.me).has("SEND_MESSAGES")) return;
	x = message.content.toLowerCase();
	if (x.startsWith("im ") || x.startsWith("i'm ") || x.startsWith("i am ")) {
		bot.getSetting('dadJokesEnabled', message.guild).then(setting => {
			if (setting == '0') return;
			bot.getSetting('dadJokesJail', message.guild).then(chan => {
				jail = message.guild.channels.find('name', chan);
				if (!jail) {
					if (message.author.id == '226999841358610432') {
						const args = message.content.split(/\s+/g);
						const cmd = bot.commands.get('love');
						cmd.run(bot, message, args);
					} else {
						if (x.startsWith('i am ')) {
							joke1 = message.cleanContent.split(" ").slice(2);
						} else {
							joke1 = message.cleanContent.split(" ").slice(1);
						}
						if (joke1.length > 5) return;
						let joke = joke1.join(" ");
						message.channel.send(`Hi **${joke}**, I'm ${message.guild.me.displayName}! :heart:`);
						bot.log("log", `${message.guild.name}/#${message.channel.name}: ${message.author.username} (${message.author.id}) made a dad joke: ${joke}`, "DAD  ");
					};
				} else {
					if (message.channel == jail) {
						if (message.author.id == '226999841358610432') {
							const args = message.content.split(/\s+/g);
							const cmd = bot.commands.get('love');
							cmd.run(bot, message, args);
						} else {
							if (x.startsWith('i am ')) {
								joke1 = message.cleanContent.split(" ").slice(2);
							} else {
								joke1 = message.cleanContent.split(" ").slice(1);
							}
							if (joke1.length > 5) return;
							let joke = joke1.join(" ");
							message.channel.send(`Hi **${joke}**, I'm ${message.guild.me.displayName}! :heart:`);
							bot.log("log", `${message.guild.name}/#${message.channel.name}: ${message.author.username} (${message.author.id}) made a dad joke: ${joke}`, "DAD  ");
						};
					}
				}
			})
		})
	};
	if (!message.channel.type === "text" || !message.guild) return;
	if (message.author.bot) return;
	secEnabled = await bot.getSetting('securityEnabled', message.guild);
	if (secEnabled) {
		secChanS = await bot.getSetting('securityChannel', message.guild);
		secChan = message.guild.channels.find('name', secChanS);
		if (message.channel == secChan) {
			passPhrase = await bot.getSetting('securityPhrase', message.guild);
			if(message.content.includes(passPhrase)){
				secNick = await bot.getSetting('securityNickCheck', message.guild);
				if (secNick && !message.member.nickname) {
					nickFormat = await bot.getSetting('securityNickFormat', message.guild);
					secChan.send(`This server requires you to have a nickname set to join their server. To join, please set your nickname according to the format ${nickFormat} (by clicking the server name, then change nickname) and then retry the passphrase!`);
				} else {
					memRoleS = await bot.getSetting('securityRole', message.guild);
					memRole = message.guild.roles.find('name', memRoleS);
					if (!memRole) return;
					message.member.addRole(memRole);
            		message.channel.bulkDelete(50);
					welcome = await bot.getSetting('welcomeMessagesEnabled', message.guild);
					welcomePin = await bot.getSetting('securityPinMessage', message.guild);
					welcomePin = welcomePin.replace('{user}', message.user).replace('{guild}', message.guild.name);
					message.channel.send(welcomePin);
					if (welcome) {
						welcomeChanS = await bot.getSetting('welcomeMessagesChannel', message.guild);
						welcomeChan = message.guild.channels.find('name', welcomeChanS);
						welcomeMessage = await bot.getSetting('welcomeMessage', message.guild);
						welcomeMessage = welcomeMessage.replace('{user}', message.user).replace('{guild}', message.guild.name);
						if (!welcomeChan) return;
						welcomeChan.send(welcomeMessage);
					}
				}
			}
		}
	}
	bot.processMessage(message);
};
