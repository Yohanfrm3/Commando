// This returns Object.prototype in order to return a valid object
// without creating a new one each time this is called just to discard it the moment after.
const isConstructorProxyHandler = { construct() { return Object.prototype; } };

function escapeRegex(str) {
	return str.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&');
}

function disambiguation(items, label, property = 'name') {
	const itemList = items.map(item => `"${(property ? item[property] : item).replace(/ /g, '\xa0')}"`).join(',   ');
	return `Multiple ${label} found, please be more specific: ${itemList}`;
}

function isConstructor(func, _class) {
	try {
		// eslint-disable-next-line no-new
		new new Proxy(func, isConstructorProxyHandler)();
		if(!_class) return true;
		return func.prototype instanceof _class;
	} catch(err) {
		return false;
	}
}

function paginate(items, page = 1, pageLength = 10) {
	const maxPage = Math.ceil(items.length / pageLength);
	if(page < 1) page = 1;
	if(page > maxPage) page = maxPage;
	const startIndex = (page - 1) * pageLength;
	return {
		items: items.length > pageLength ? items.slice(startIndex, startIndex + pageLength) : items,
		page,
		maxPage,
		pageLength
	};
}
const permissions = {
	ADMINISTRATOR: 'Administrator',
	CREATE_INSTANT_INVITE: 'Create Instant Invites',
	KICK_MEMBERS: 'Kick Members',
	BAN_MEMBERS: 'Ban Members',
	MANAGE_CHANNELS: 'Manage Channels',
	MANAGE_GUILD: 'Manage Guild',
	ADD_REACTIONS: 'Add Reactions',
	VIEW_AUDIT_LOG: 'View Audit Logs',
	PRIORITY_SPEAKER: 'Priority Speaker',
	STREAM: 'Go Live',
	VIEW_CHANNEL: 'View channel',
	SEND_MESSAGES: 'Send Messages',
	SEND_TTS_MESSAGES: 'Send TTS Messages',
	MANAGE_MESSAGES: 'Manage Messages',
	EMBED_LINKS: 'Embed Links',
	ATTACH_FILES: 'Attach Files',
	READ_MESSAGE_HISTORY: 'Read Message History',
	MENTION_EVERYONE: 'Mention everyone',
	USE_EXTERNAL_EMOJIS: 'External Emojis',
	VIEW_GUILD_INSIGHTS: 'Guild Insights',
	CONNECT: 'Voice Channel',
	SPEAK: 'Speak in Voice channel',
	MUTE_MEMBERS: 'Mute Members',
	DEAFEN_MEMBERS: 'Deafen Members',
	MOVE_MEMBERS: 'Move Members',
	USE_VAD: 'Voice Activity Detection',
	CHANGE_NICKNAME: 'Change Nickname',
	MANAGE_NICKNAMES: 'Manage Nickname',
	MANAGE_ROLES: 'Manage Roles',
	MANAGE_WEBHOOKS: 'Manage Webhooks',
	MANAGE_GUILD_EXPRESSIONS: 'Modify user added emotes, stickers..',
	USE_APPLICATION_COMMANDS: 'Allows members to use application commands, including slash commands.',
	REQUEST_TO_SPEAK: 'Allows for requesting to speak in stage channels.',
	MANAGE_EVENTS: 'Allows for editing and deleting scheduled events by all users.',
	MANAGE_THREADS: 'Allows for deleting and archiving threads, and viewing private threads.',
	CREATE_PUBLIC_THREADS: 'Allows for creating public and announcement threads.',
	CREATE_PRIVATE_THREADS: 'Allows for creating private threads.',
	USE_EXTERNAL_STICKERS: 'Allows the usage of custom stickers from other servers.',
	SEND_MESSAGES_IN_THREADS: 'Allows for sending messages in threads.',
	USE_EMBEDDED_ACTIVITIES: 'Allows for using Activities in a voice channel.',
	MODERATE_MEMBERS: 'Allows for timing out users and preventing them from sending messages.',
	VIEW_CREATOR_MONETIZATION_ANALYTICS: 'Allows for viewing role subscription insights.',
	USE_SOUNDBOARD: 'Allows for using soundboard in a voice channel.',
	CREATE_GUILD_EXPRESSIONS: 'Allows for creating emojis, stickers, and soundboard sounds.',
	CREATE_EVENTS: 'Allows for creating scheduled events and editing and deleting them.',
	USE_EXTERNAL_SOUNDS: 'Allows the usage of custom soundboard sounds from other servers.',
	SEND_VOICE_MESSAGES: 'Allows sending voice messages'
};


module.exports = {
	escapeRegex,
	disambiguation,
	paginate,
	permissions,
	isConstructor
};
