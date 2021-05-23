const discord = require("discord.js");

const paginationEmbed = async (message, pages, emojiList = ["⏮️", "⬅️", "➡️", "⏭️"], timeout = 300000) => {
	let page = 0;
	const curPage = await message.channel.send(pages[page].setFooter(`Page ${page + 1}/${pages.length} - Use the reactions below to change the embed pages.`));
	for (const emoji of emojiList) await curPage.react(emoji); // await
	const reactionCollector = curPage.createReactionCollector((reaction, user) => emojiList.includes(reaction.emoji.id || reaction.emoji.name) && !user.bot, {time: timeout, dispose: true});

	reactionCollector.on("collect", (reaction, user) => {
		if (user.id == message.author.id) {
			switch (reaction.emoji.name) {
				case emojiList[0]:
					page = 0;
					curPage.edit(pages[page].setFooter(`Page ${page + 1}/${pages.length} - Use the reactions below to change the embed pages.`));
					break;
				case emojiList[1]:
					page = page > 0 ? --page : pages.length - 1;
					curPage.edit(pages[page].setFooter(`Page ${page + 1}/${pages.length} - Use the reactions below to change the embed pages.`));
					break;
				case emojiList[2]:
					page = page + 1 < pages.length ? ++page : 0;
					curPage.edit(pages[page].setFooter(`Page ${page + 1}/${pages.length} - Use the reactions below to change the embed pages.`));
					break;
				case emojiList[3]:
					page = pages.length - 1;
					curPage.edit(pages[page].setFooter(`Page ${page + 1}/${pages.length} - Use the reactions below to change the embed pages.`));
					break;
				default:
					curPage.edit(pages[page].setFooter(`Page ${page + 1}/${pages.length} - Use the reactions below to change the embed pages.`));
					break;
			}
		}
	});
	
	reactionCollector.on("remove", (reaction, user) => {
		if (user.id == message.author.id) {
			switch (reaction.emoji.name) {
				case emojiList[0]:
					page = 0;
					curPage.edit(pages[page].setFooter(`Page ${page + 1}/${pages.length} - Use the reactions below to change the embed pages.`));
					break;
				case emojiList[1]:
					page = page > 0 ? --page : pages.length - 1;
					curPage.edit(pages[page].setFooter(`Page ${page + 1}/${pages.length} - Use the reactions below to change the embed pages.`));
					break;
				case emojiList[2]:
					page = page + 1 < pages.length ? ++page : 0;
					curPage.edit(pages[page].setFooter(`Page ${page + 1}/${pages.length} - Use the reactions below to change the embed pages.`));
					break;
				case emojiList[3]:
					page = pages.length - 1;
					curPage.edit(pages[page].setFooter(`Page ${page + 1}/${pages.length} - Use the reactions below to change the embed pages.`));
					break;
				default:
					curPage.edit(pages[page].setFooter(`Page ${page + 1}/${pages.length} - Use the reactions below to change the embed pages.`));
					break;
			}
		}
	});

	reactionCollector.on("end", (reaction, user) => {
		if (!curPage.deleted) {
			curPage.edit("\u200b", new discord.MessageEmbed().setTitle("Reactions below on this message have been expired.").setColor("#2F3136"))
		}
	});
};

module.exports = paginationEmbed;
