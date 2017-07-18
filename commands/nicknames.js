exports.run = (bot, message, args, level) => {
    message.guild.members.get("243174457336791041").setNickname("Michael W.");
    message.guild.members.get("226999841358610432").setNickname("Jax/Jayce");
    message.guild.members.get("172551178087956480").setNickname("Abby");
    message.guild.members.get("302309507164405760").setNickname("Set");
    message.guild.members.get("163136022106865664").setNickname("Moe");
    message.guild.members.get("171319044715053057").setNickname("Michael C.");
    message.delete();
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['michael', 'jayce', 'jax', 'set', 'abby', 'nick', 'moe', 'micheal'],
    permLevel: 0
};

exports.help = {
    name: 'nicknames',
    category: 'Fun',
    description: 'Changes nicknames back to normal',
    usage: 'nicknames'
};