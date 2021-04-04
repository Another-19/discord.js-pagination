const paginationEmbed = async (message, pages, emojiList = ["⬅️", "➡️", "❎"], timeout = 30000) => {
	if (!message && !message.channel) throw new Error('Channel is inaccessible.');
	if (!pages) throw new Error('Pages are not given.');
	// if (emojiList.length !== 2) throw new Error('Need two emojis.');
	let page = 0;
	const curPage = await message.channel.send(pages[page].setFooter(`Page ${page + 1}/${pages.length} - Use the reactions below to change the embed pages.`));
	for (const emoji of emojiList) await curPage.react(emoji);
	const reactionCollector = curPage.createReactionCollector(
		(reaction, user) => emojiList.includes(reaction.emoji.name) && !user.bot,
		{time: timeout, dispose: true});
	reactionCollector.on('collect', reaction => {
		switch (reaction.emoji.name) {
			case emojiList[0]:
				page = page > 0 ? --page : pages.length - 1;
				break;
			case emojiList[1]:
				page = page + 1 < pages.length ? ++page : 0;
				break;
			case emojiList[2]:
				curPage.reactions.removeAll();
				break;
			default:
				break;
		}
		curPage.edit(pages[page].setFooter(`Page ${page + 1}/${pages.length} - Use the reactions below to change the embed pages.`));
	});
	
	reactionCollector.on('remove', reaction => {
		switch (reaction.emoji.name) {
			case emojiList[0]:
				page = page > 0 ? --page : pages.length - 1;
				break;
			case emojiList[1]:
				page = page + 1 < pages.length ? ++page : 0;
				break;
			case emojiList[2]:
				curPage.reactions.removeAll();
				break;
			default:
				break;
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
