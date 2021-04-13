const paginationEmbed = async (message, pages, emojiList = ["⏮️", "⬅️", "➡️", "⏭️", "829731154487803944"], timeout = 300000) => {
	if (!message && !message.channel) throw new Error('Channel is inaccessible.');
	if (!pages) throw new Error('Pages are not given.');
	// if (emojiList.length !== 2) throw new Error('Need two emojis.');
	let page = 0;
	let player = message.author.id;
	const curPage = await message.channel.send(pages[page].setFooter(`Page ${page + 1}/${pages.length} - Use the reactions below to change the embed pages.`));
	for (const emoji of emojiList) await curPage.react(emoji);
	const reactionCollector = curPage.createReactionCollector(
		(reaction, user) => emojiList.includes(reaction.emoji.id || reaction.emoji.name) && !user.bot,
		{time: timeout, dispose: true});
	reactionCollector.on('collect', reaction, user => {
		if (user.id == player) {
			switch (reaction.emoji.name) {
				case emojiList[0]:
					page = 0;
					break;
				case emojiList[1]:
					page = page > 0 ? --page : pages.length - 1;
					break;
				case emojiList[2]:
					page = page + 1 < pages.length ? ++page : 0;
					break;
				case emojiList[3]:
					page = pages.length - 1;
					break;
				default:
					curPage.reactions.removeAll();
					break;
			}
		}
		curPage.edit(pages[page].setFooter(`Page ${page + 1}/${pages.length} - Use the reactions below to change the embed pages.`));
	});
	
	reactionCollector.on('remove', reaction, user => {
		if (user.id == player) {
			switch (reaction.emoji.name) {
				case emojiList[0]:
					page = 0;
					break;
				case emojiList[1]:
					page = page > 0 ? --page : pages.length - 1;
					break;
				case emojiList[2]:
					page = page + 1 < pages.length ? ++page : 0;
					break;
				case emojiList[3]:
					page = pages.length - 1;
					break;
				default:
					curPage.reactions.removeAll();
					break;
			}
		}
		curPage.edit(pages[page].setFooter(`Page ${page + 1}/${pages.length} - Use the reactions below to change the embed pages.`));
	});
	
	reactionCollector.on('end', () => {
		if (!curPage.deleted) {
			curPage.reactions.removeAll()
		}
	});
	return curPage;
};

module.exports = paginationEmbed;
