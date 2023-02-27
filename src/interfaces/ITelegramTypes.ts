/** This object represents the contents of a file to be uploaded. Must be posted using multipart/form-data in the usual way that files are uploaded via the browser.
 * 
 * @type {string} - URL or file_id
 * @type {Buffer} - Binary data of the file */
export type IInputFile = string | Buffer;

export type IUpdateName = "message" | "edited_message" | "channel_post" | "edited_channel_post" | "inline_query" | "chosen_inline_result" | "callback_query" | "shipping_query" | "pre_checkout_query" | "poll" | "poll_answer" | "my_chat_member" | "chat_member" | "chat_join_request";

/** This object represents an incoming update.At most one of the optional parameters can be present in any given update. */
export interface IUpdate {
	/** The update's unique identifier. Update identifiers start from a certain positive number and increase sequentially. This ID becomes especially handy if you're using webhooks, since it allows you to ignore repeated updates or to restore the correct update sequence, should they get out of order. If there are no new updates for at least a week, then identifier of the next update will be chosen randomly instead of sequentially. */
	update_id: number;
	/** Optional. New incoming message of any kind - text, photo, sticker, etc. */
	message?: IMessage;
	/** Optional. New version of a message that is known to the bot and was edited */
	edited_message?: IMessage;
	/** Optional. New incoming channel post of any kind - text, photo, sticker, etc. */
	channel_post?: IMessage;
	/** Optional. New version of a channel post that is known to the bot and was edited */
	edited_channel_post?: IMessage;
	/** Optional. New incoming inline query */
	inline_query?: IInlineQuery;
	/** Optional. The result of an inline query that was chosen by a user and sent to their chat partner. Please see our documentation on the feedback collecting for details on how to enable these updates for your bot. */
	chosen_inline_result?: IChosenInlineResult;
	/** Optional. New incoming callback query */
	callback_query?: ICallbackQuery;
	/** Optional. New incoming shipping query. Only for invoices with flexible price */
	shipping_query?: IShippingQuery;
	/** Optional. New incoming pre-checkout query. Contains full information about checkout */
	pre_checkout_query?: IPreCheckoutQuery;
	/** Optional. New poll state. Bots receive only updates about stopped polls and polls, which are sent by the bot */
	poll?: IPoll;
	/** Optional. A user changed their answer in a non-anonymous poll. Bots receive new votes only in polls that were sent by the bot itself. */
	poll_answer?: IPollAnswer;
	/** Optional. The bot's chat member status was updated in a chat. For private chats, this update is received only when the bot is blocked or unblocked by the user. */
	my_chat_member?: IChatMemberUpdated;
	/** Optional. A chat member's status was updated in a chat. The bot must be an administrator in the chat and must explicitly specify “chat_member” in the list of allowed_updates to receive these updates. */
	chat_member?: IChatMemberUpdated;
	/** Optional. A request to join the chat has been sent. The bot must have the can_invite_users administrator right in the chat to receive these updates. */
	chat_join_request?: IChatJoinRequest;
}
	

/** Parameters for the getUpdates method */
export interface IGetUpdatesParams {
	/** Identifier of the first update to be returned. Must be greater by one than the highest among the identifiers of previously received updates. By default, updates starting with the earliest unconfirmed update are returned. An update is considered confirmed as soon as getUpdates is called with an offset higher than its update_id. The negative offset can be specified to retrieve updates starting from -offset update from the end of the updates queue. All previous updates will forgotten. */
	offset?: number;
	/** Limits the number of updates to be retrieved. Values between 1-100 are accepted. Defaults to 100. */
	limit?: number;
	/** Timeout in seconds for long polling. Defaults to 0, i.e. usual short polling. Should be positive, short polling should be used for testing purposes only. */
	timeout?: number;
	/** A JSON-serialized list of the update types you want your bot to receive. For example, specify [“message”, “edited_channel_post”, “callback_query”] to only receive updates of these types. See Update for a complete list of available update types. Specify an empty list to receive all update types except chat_member (default). If not specified, the previous setting will be used.Please note that this parameter doesn't affect updates created before the call to the getUpdates, so unwanted updates may be received for a short period of time. */
	allowed_updates?: string[];
}
	

/** Parameters for the setWebhook method */
export interface ISetWebhookParams {
	/** HTTPS URL to send updates to. Use an empty string to remove webhook integration */
	url: string;
	/** Upload your public key certificate so that the root certificate in use can be checked. See our self-signed guide for details. */
	certificate?: IInputFile;
	/** The fixed IP address which will be used to send webhook requests instead of the IP address resolved through DNS */
	ip_address?: string;
	/** The maximum allowed number of simultaneous HTTPS connections to the webhook for update delivery, 1-100. Defaults to 40. Use lower values to limit the load on your bot's server, and higher values to increase your bot's throughput. */
	max_connections?: number;
	/** A JSON-serialized list of the update types you want your bot to receive. For example, specify [“message”, “edited_channel_post”, “callback_query”] to only receive updates of these types. See Update for a complete list of available update types. Specify an empty list to receive all update types except chat_member (default). If not specified, the previous setting will be used.Please note that this parameter doesn't affect updates created before the call to the setWebhook, so unwanted updates may be received for a short period of time. */
	allowed_updates?: string[];
	/** Pass True to drop all pending updates */
	drop_pending_updates?: boolean;
	/** A secret token to be sent in a header “X-Telegram-Bot-Api-Secret-Token” in every webhook request, 1-256 characters. Only characters A-Z, a-z, 0-9, _ and - are allowed. The header is useful to ensure that the request comes from a webhook set by you. */
	secret_token?: string;
}
	

/** Parameters for the deleteWebhook method */
export interface IDeleteWebhookParams {
	/** Pass True to drop all pending updates */
	drop_pending_updates?: boolean;
}
	

/** It is safe to use 32-bit signed integers for storing all Integer fields unless otherwise noted. */
export interface IWebhookInfo {
	/** Webhook URL, may be empty if webhook is not set up */
	url: string;
	/** True, if a custom certificate was provided for webhook certificate checks */
	has_custom_certificate: boolean;
	/** Number of updates awaiting delivery */
	pending_update_count: number;
	/** Optional. Currently used webhook IP address */
	ip_address?: string;
	/** Optional. Unix time for the most recent error that happened when trying to deliver an update via webhook */
	last_error_date?: number;
	/** Optional. Error message in human-readable format for the most recent error that happened when trying to deliver an update via webhook */
	last_error_message?: string;
	/** Optional. Unix time of the most recent error that happened when trying to synchronize available updates with Telegram datacenters */
	last_synchronization_error_date?: number;
	/** Optional. The maximum allowed number of simultaneous HTTPS connections to the webhook for update delivery */
	max_connections?: number;
	/** Optional. A list of update types the bot is subscribed to. Defaults to all update types except chat_member */
	allowed_updates?: string[];
}
	

/** This object represents a Telegram user or bot. */
export interface IUser {
	/** Unique identifier for this user or bot. This number may have more than 32 significant bits and some programming languages may have difficulty/silent defects in interpreting it. But it has at most 52 significant bits, so a 64-bit integer or double-precision float type are safe for storing this identifier. */
	id: number;
	/** True, if this user is a bot */
	is_bot: boolean;
	/** User's or bot's first name */
	first_name: string;
	/** Optional. User's or bot's last name */
	last_name?: string;
	/** Optional. User's or bot's username */
	username?: string;
	/** Optional. IETF language tag of the user's language */
	language_code?: string;
	/** Optional. True, if this user is a Telegram Premium user */
	is_premium?: true;
	/** Optional. True, if this user added the bot to the attachment menu */
	added_to_attachment_menu?: true;
	/** Optional. True, if the bot can be invited to groups. Returned only in getMe. */
	can_join_groups?: boolean;
	/** Optional. True, if privacy mode is disabled for the bot. Returned only in getMe. */
	can_read_all_group_messages?: boolean;
	/** Optional. True, if the bot supports inline queries. Returned only in getMe. */
	supports_inline_queries?: boolean;
}
	

/** This object represents a chat. */
export interface IChat {
	/** Unique identifier for this chat. This number may have more than 32 significant bits and some programming languages may have difficulty/silent defects in interpreting it. But it has at most 52 significant bits, so a signed 64-bit integer or double-precision float type are safe for storing this identifier. */
	id: number;
	/** Type of chat, can be either “private”, “group”, “supergroup” or “channel” */
	type: "private" | "group" | "supergroup" | "channel";
	/** Optional. Title, for supergroups, channels and group chats */
	title?: string;
	/** Optional. Username, for private chats, supergroups and channels if available */
	username?: string;
	/** Optional. First name of the other party in a private chat */
	first_name?: string;
	/** Optional. Last name of the other party in a private chat */
	last_name?: string;
	/** Optional. True, if the supergroup chat is a forum (has topics enabled) */
	is_forum?: true;
	/** Optional. Chat photo. Returned only in getChat. */
	photo?: IChatPhoto;
	/** Optional. If non-empty, the list of all active chat usernames; for private chats, supergroups and channels. Returned only in getChat. */
	active_usernames?: string[];
	/** Optional. Custom emoji identifier of emoji status of the other party in a private chat. Returned only in getChat. */
	emoji_status_custom_emoji_id?: string;
	/** Optional. Bio of the other party in a private chat. Returned only in getChat. */
	bio?: string;
	/** Optional. True, if privacy settings of the other party in the private chat allows to use tg://user?id=<user_id> links only in chats with the user. Returned only in getChat. */
	has_private_forwards?: true;
	/** Optional. True, if the privacy settings of the other party restrict sending voice and video note messages in the private chat. Returned only in getChat. */
	has_restricted_voice_and_video_messages?: true;
	/** Optional. True, if users need to join the supergroup before they can send messages. Returned only in getChat. */
	join_to_send_messages?: true;
	/** Optional. True, if all users directly joining the supergroup need to be approved by supergroup administrators. Returned only in getChat. */
	join_by_request?: true;
	/** Optional. Description, for groups, supergroups and channel chats. Returned only in getChat. */
	description?: string;
	/** Optional. Primary invite link, for groups, supergroups and channel chats. Returned only in getChat. */
	invite_link?: string;
	/** Optional. The most recent pinned message (by sending date). Returned only in getChat. */
	pinned_message?: IMessage;
	/** Optional. Default chat member permissions, for groups and supergroups. Returned only in getChat. */
	permissions?: IChatPermissions;
	/** Optional. For supergroups, the minimum allowed delay between consecutive messages sent by each unpriviledged user; in seconds. Returned only in getChat. */
	slow_mode_delay?: number;
	/** Optional. The time after which all messages sent to the chat will be automatically deleted; in seconds. Returned only in getChat. */
	message_auto_delete_time?: number;
	/** Optional. True, if aggressive anti-spam checks are enabled in the supergroup. The field is only available to chat administrators. Returned only in getChat. */
	has_aggressive_anti_spam_enabled?: true;
	/** Optional. True, if non-administrators can only get the list of bots and administrators in the chat. Returned only in getChat. */
	has_hidden_members?: true;
	/** Optional. True, if messages from the chat can't be forwarded to other chats. Returned only in getChat. */
	has_protected_content?: true;
	/** Optional. For supergroups, name of group sticker set. Returned only in getChat. */
	sticker_set_name?: string;
	/** Optional. True, if the bot can change the group sticker set. Returned only in getChat. */
	can_set_sticker_set?: true;
	/** Optional. Unique identifier for the linked chat, i.e. the discussion group identifier for a channel and vice versa; for supergroups and channel chats. This identifier may be greater than 32 bits and some programming languages may have difficulty/silent defects in interpreting it. But it is smaller than 52 bits, so a signed 64 bit integer or double-precision float type are safe for storing this identifier. Returned only in getChat. */
	linked_chat_id?: number;
	/** Optional. For supergroups, the location to which the supergroup is connected. Returned only in getChat. */
	location?: IChatLocation;
}

export type IForumTopicUpdate = "forum_topic_created" | "forum_topic_edited" | "forum_topic_closed" | "forum_topic_reopened" | "general_forum_topic_hidden" | "general_forum_topic_unhidden";

/** This object represents a message. */
export interface IMessage {
	/** Unique message identifier inside this chat */
	message_id: number;
	/** Optional. Unique identifier of a message thread to which the message belongs; for supergroups only */
	message_thread_id?: number;
	/** Optional. Sender of the message; empty for messages sent to channels. For backward compatibility, the field contains a fake sender user in non-channel chats, if the message was sent on behalf of a chat. */
	from?: IUser;
	/** Optional. Sender of the message, sent on behalf of a chat. For example, the channel itself for channel posts, the supergroup itself for messages from anonymous group administrators, the linked channel for messages automatically forwarded to the discussion group. For backward compatibility, the field from contains a fake sender user in non-channel chats, if the message was sent on behalf of a chat. */
	sender_chat?: IChat;
	/** Date the message was sent in Unix time */
	date: number;
	/** Conversation the message belongs to */
	chat: IChat;
	/** Optional. For forwarded messages, sender of the original message */
	forward_from?: IUser;
	/** Optional. For messages forwarded from channels or from anonymous administrators, information about the original sender chat */
	forward_from_chat?: IChat;
	/** Optional. For messages forwarded from channels, identifier of the original message in the channel */
	forward_from_message_id?: number;
	/** Optional. For forwarded messages that were originally sent in channels or by an anonymous chat administrator, signature of the message sender if present */
	forward_signature?: string;
	/** Optional. Sender's name for messages forwarded from users who disallow adding a link to their account in forwarded messages */
	forward_sender_name?: string;
	/** Optional. For forwarded messages, date the original message was sent in Unix time */
	forward_date?: number;
	/** Optional. True, if the message is sent to a forum topic */
	is_topic_message?: true;
	/** Optional. True, if the message is a channel post that was automatically forwarded to the connected discussion group */
	is_automatic_forward?: true;
	/** Optional. For replies, the original message. Note that the Message object in this field will not contain further reply_to_message fields even if it itself is a reply. */
	reply_to_message?: IMessage;
	/** Optional. Bot through which the message was sent */
	via_bot?: IUser;
	/** Optional. Date the message was last edited in Unix time */
	edit_date?: number;
	/** Optional. True, if the message can't be forwarded */
	has_protected_content?: true;
	/** Optional. The unique identifier of a media message group this message belongs to */
	media_group_id?: string;
	/** Optional. Signature of the post author for messages in channels, or the custom title of an anonymous group administrator */
	author_signature?: string;
	/** Optional. For text messages, the actual UTF-8 text of the message */
	text?: string;
	/** Optional. For text messages, special entities like usernames, URLs, bot commands, etc. that appear in the text */
	entities?: IMessageEntity[];
	/** Optional. Message is an animation, information about the animation. For backward compatibility, when this field is set, the document field will also be set */
	animation?: IAnimation;
	/** Optional. Message is an audio file, information about the file */
	audio?: IAudio;
	/** Optional. Message is a general file, information about the file */
	document?: IDocument;
	/** Optional. Message is a photo, available sizes of the photo */
	photo?: IPhotoSize[];
	/** Optional. Message is a sticker, information about the sticker */
	sticker?: ISticker;
	/** Optional. Message is a video, information about the video */
	video?: IVideo;
	/** Optional. Message is a video note, information about the video message */
	video_note?: IVideoNote;
	/** Optional. Message is a voice message, information about the file */
	voice?: IVoice;
	/** Optional. Caption for the animation, audio, document, photo, video or voice */
	caption?: string;
	/** Optional. For messages with a caption, special entities like usernames, URLs, bot commands, etc. that appear in the caption */
	caption_entities?: IMessageEntity[];
	/** Optional. True, if the message media is covered by a spoiler animation */
	has_media_spoiler?: true;
	/** Optional. Message is a shared contact, information about the contact */
	contact?: IContact;
	/** Optional. Message is a dice with random value */
	dice?: IDice;
	/** Optional. Message is a game, information about the game. More about games » */
	game?: IGame;
	/** Optional. Message is a native poll, information about the poll */
	poll?: IPoll;
	/** Optional. Message is a venue, information about the venue. For backward compatibility, when this field is set, the location field will also be set */
	venue?: IVenue;
	/** Optional. Message is a shared location, information about the location */
	location?: ILocation;
	/** Optional. New members that were added to the group or supergroup and information about them (the bot itself may be one of these members) */
	new_chat_members?: IUser[];
	/** Optional. A member was removed from the group, information about them (this member may be the bot itself) */
	left_chat_member?: IUser;
	/** Optional. A chat title was changed to this value */
	new_chat_title?: string;
	/** Optional. A chat photo was change to this value */
	new_chat_photo?: IPhotoSize[];
	/** Optional. Service message: the chat photo was deleted */
	delete_chat_photo?: true;
	/** Optional. Service message: the group has been created */
	group_chat_created?: true;
	/** Optional. Service message: the supergroup has been created. This field can't be received in a message coming through updates, because bot can't be a member of a supergroup when it is created. It can only be found in reply_to_message if someone replies to a very first message in a directly created supergroup. */
	supergroup_chat_created?: true;
	/** Optional. Service message: the channel has been created. This field can't be received in a message coming through updates, because bot can't be a member of a channel when it is created. It can only be found in reply_to_message if someone replies to a very first message in a channel. */
	channel_chat_created?: true;
	/** Optional. Service message: auto-delete timer settings changed in the chat */
	message_auto_delete_timer_changed?: IMessageAutoDeleteTimerChanged;
	/** Optional. The group has been migrated to a supergroup with the specified identifier. This number may have more than 32 significant bits and some programming languages may have difficulty/silent defects in interpreting it. But it has at most 52 significant bits, so a signed 64-bit integer or double-precision float type are safe for storing this identifier. */
	migrate_to_chat_id?: number;
	/** Optional. The supergroup has been migrated from a group with the specified identifier. This number may have more than 32 significant bits and some programming languages may have difficulty/silent defects in interpreting it. But it has at most 52 significant bits, so a signed 64-bit integer or double-precision float type are safe for storing this identifier. */
	migrate_from_chat_id?: number;
	/** Optional. Specified message was pinned. Note that the Message object in this field will not contain further reply_to_message fields even if it is itself a reply. */
	pinned_message?: IMessage;
	/** Optional. Message is an invoice for a payment, information about the invoice. More about payments » */
	invoice?: IInvoice;
	/** Optional. Message is a service message about a successful payment, information about the payment. More about payments » */
	successful_payment?: ISuccessfulPayment;
	/** Optional. Service message: a user was shared with the bot */
	user_shared?: IUserShared;
	/** Optional. Service message: a chat was shared with the bot */
	chat_shared?: IChatShared;
	/** Optional. The domain name of the website on which the user has logged in. More about Telegram Login » */
	connected_website?: string;
	/** Optional. Service message: the user allowed the bot added to the attachment menu to write messages */
	write_access_allowed?: IWriteAccessAllowed;
	/** Optional. Telegram Passport data */
	passport_data?: IPassportData;
	/** Optional. Service message. A user in the chat triggered another user's proximity alert while sharing Live Location. */
	proximity_alert_triggered?: IProximityAlertTriggered;
	/** Optional. Service message: forum topic created */
	forum_topic_created?: IForumTopicCreated;
	/** Optional. Service message: forum topic edited */
	forum_topic_edited?: IForumTopicEdited;
	/** Optional. Service message: forum topic closed */
	forum_topic_closed?: IForumTopicClosed;
	/** Optional. Service message: forum topic reopened */
	forum_topic_reopened?: IForumTopicReopened;
	/** Optional. Service message: the 'General' forum topic hidden */
	general_forum_topic_hidden?: IGeneralForumTopicHidden;
	/** Optional. Service message: the 'General' forum topic unhidden */
	general_forum_topic_unhidden?: IGeneralForumTopicUnhidden;
	/** Optional. Service message: video chat scheduled */
	video_chat_scheduled?: IVideoChatScheduled;
	/** Optional. Service message: video chat started */
	video_chat_started?: IVideoChatStarted;
	/** Optional. Service message: video chat ended */
	video_chat_ended?: IVideoChatEnded;
	/** Optional. Service message: new participants invited to a video chat */
	video_chat_participants_invited?: IVideoChatParticipantsInvited;
	/** Optional. Service message: data sent by a Web App */
	web_app_data?: IWebAppData;
	/** Optional. Inline keyboard attached to the message. login_url buttons are represented as ordinary url buttons. */
	reply_markup?: IInlineKeyboardMarkup;
}
	

/** This object represents a unique message identifier. */
export interface IMessageId {
	/** Unique message identifier */
	message_id: number;
}
	

/** This object represents one special entity in a text message. For example, hashtags, usernames, URLs, etc. */
export interface IMessageEntity {
	/** Type of the entity. Currently, can be “mention” (@username), “hashtag” (#hashtag), “cashtag” ($USD), “bot_command” (/start@jobs_bot), “url” (https://telegram.org), “email” (do-not-reply@telegram.org), “phone_number” (+1-212-555-0123), “bold” (bold text), “italic” (italic text), “underline” (underlined text), “strikethrough” (strikethrough text), “spoiler” (spoiler message), “code” (monowidth string), “pre” (monowidth block), “text_link” (for clickable text URLs), “text_mention” (for users without usernames), “custom_emoji” (for inline custom emoji stickers) */
	type: string;
	/** Offset in UTF-16 code units to the start of the entity */
	offset: number;
	/** Length of the entity in UTF-16 code units */
	length: number;
	/** Optional. For “text_link” only, URL that will be opened after user taps on the text */
	url?: string;
	/** Optional. For “text_mention” only, the mentioned user */
	user?: IUser;
	/** Optional. For “pre” only, the programming language of the entity text */
	language?: string;
	/** Optional. For “custom_emoji” only, unique identifier of the custom emoji. Use getCustomEmojiStickers to get full information about the sticker */
	custom_emoji_id?: string;
}
	

/** This object represents one size of a photo or a file / sticker thumbnail. */
export interface IPhotoSize {
	/** Identifier for this file, which can be used to download or reuse the file */
	file_id: string;
	/** Unique identifier for this file, which is supposed to be the same over time and for different bots. Can't be used to download or reuse the file. */
	file_unique_id: string;
	/** Photo width */
	width: number;
	/** Photo height */
	height: number;
	/** Optional. File size in bytes */
	file_size?: number;
}
	

/** This object represents an animation file (GIF or H.264/MPEG-4 AVC video without sound). */
export interface IAnimation {
	/** Identifier for this file, which can be used to download or reuse the file */
	file_id: string;
	/** Unique identifier for this file, which is supposed to be the same over time and for different bots. Can't be used to download or reuse the file. */
	file_unique_id: string;
	/** Video width as defined by sender */
	width: number;
	/** Video height as defined by sender */
	height: number;
	/** Duration of the video in seconds as defined by sender */
	duration: number;
	/** Optional. Animation thumbnail as defined by sender */
	thumb?: IPhotoSize;
	/** Optional. Original animation filename as defined by sender */
	file_name?: string;
	/** Optional. MIME type of the file as defined by sender */
	mime_type?: string;
	/** Optional. File size in bytes. It can be bigger than 2^31 and some programming languages may have difficulty/silent defects in interpreting it. But it has at most 52 significant bits, so a signed 64-bit integer or double-precision float type are safe for storing this value. */
	file_size?: number;
}
	

/** This object represents an audio file to be treated as music by the Telegram clients. */
export interface IAudio {
	/** Identifier for this file, which can be used to download or reuse the file */
	file_id: string;
	/** Unique identifier for this file, which is supposed to be the same over time and for different bots. Can't be used to download or reuse the file. */
	file_unique_id: string;
	/** Duration of the audio in seconds as defined by sender */
	duration: number;
	/** Optional. Performer of the audio as defined by sender or by audio tags */
	performer?: string;
	/** Optional. Title of the audio as defined by sender or by audio tags */
	title?: string;
	/** Optional. Original filename as defined by sender */
	file_name?: string;
	/** Optional. MIME type of the file as defined by sender */
	mime_type?: string;
	/** Optional. File size in bytes. It can be bigger than 2^31 and some programming languages may have difficulty/silent defects in interpreting it. But it has at most 52 significant bits, so a signed 64-bit integer or double-precision float type are safe for storing this value. */
	file_size?: number;
	/** Optional. Thumbnail of the album cover to which the music file belongs */
	thumb?: IPhotoSize;
}
	

/** This object represents a general file (as opposed to photos, voice messages and audio files). */
export interface IDocument {
	/** Identifier for this file, which can be used to download or reuse the file */
	file_id: string;
	/** Unique identifier for this file, which is supposed to be the same over time and for different bots. Can't be used to download or reuse the file. */
	file_unique_id: string;
	/** Optional. Document thumbnail as defined by sender */
	thumb?: IPhotoSize;
	/** Optional. Original filename as defined by sender */
	file_name?: string;
	/** Optional. MIME type of the file as defined by sender */
	mime_type?: string;
	/** Optional. File size in bytes. It can be bigger than 2^31 and some programming languages may have difficulty/silent defects in interpreting it. But it has at most 52 significant bits, so a signed 64-bit integer or double-precision float type are safe for storing this value. */
	file_size?: number;
}
	

/** This object represents a video file. */
export interface IVideo {
	/** Identifier for this file, which can be used to download or reuse the file */
	file_id: string;
	/** Unique identifier for this file, which is supposed to be the same over time and for different bots. Can't be used to download or reuse the file. */
	file_unique_id: string;
	/** Video width as defined by sender */
	width: number;
	/** Video height as defined by sender */
	height: number;
	/** Duration of the video in seconds as defined by sender */
	duration: number;
	/** Optional. Video thumbnail */
	thumb?: IPhotoSize;
	/** Optional. Original filename as defined by sender */
	file_name?: string;
	/** Optional. MIME type of the file as defined by sender */
	mime_type?: string;
	/** Optional. File size in bytes. It can be bigger than 2^31 and some programming languages may have difficulty/silent defects in interpreting it. But it has at most 52 significant bits, so a signed 64-bit integer or double-precision float type are safe for storing this value. */
	file_size?: number;
}
	

/** This object represents a video message (available in Telegram apps as of v.4.0). */
export interface IVideoNote {
	/** Identifier for this file, which can be used to download or reuse the file */
	file_id: string;
	/** Unique identifier for this file, which is supposed to be the same over time and for different bots. Can't be used to download or reuse the file. */
	file_unique_id: string;
	/** Video width and height (diameter of the video message) as defined by sender */
	length: number;
	/** Duration of the video in seconds as defined by sender */
	duration: number;
	/** Optional. Video thumbnail */
	thumb?: IPhotoSize;
	/** Optional. File size in bytes */
	file_size?: number;
}
	

/** This object represents a voice note. */
export interface IVoice {
	/** Identifier for this file, which can be used to download or reuse the file */
	file_id: string;
	/** Unique identifier for this file, which is supposed to be the same over time and for different bots. Can't be used to download or reuse the file. */
	file_unique_id: string;
	/** Duration of the audio in seconds as defined by sender */
	duration: number;
	/** Optional. MIME type of the file as defined by sender */
	mime_type?: string;
	/** Optional. File size in bytes. It can be bigger than 2^31 and some programming languages may have difficulty/silent defects in interpreting it. But it has at most 52 significant bits, so a signed 64-bit integer or double-precision float type are safe for storing this value. */
	file_size?: number;
}
	

/** This object represents a phone contact. */
export interface IContact {
	/** Contact's phone number */
	phone_number: string;
	/** Contact's first name */
	first_name: string;
	/** Optional. Contact's last name */
	last_name?: string;
	/** Optional. Contact's user identifier in Telegram. This number may have more than 32 significant bits and some programming languages may have difficulty/silent defects in interpreting it. But it has at most 52 significant bits, so a 64-bit integer or double-precision float type are safe for storing this identifier. */
	user_id?: number;
	/** Optional. Additional data about the contact in the form of a vCard */
	vcard?: string;
}
	

/** This object represents an animated emoji that displays a random value. */
export interface IDice {
	/** Emoji on which the dice throw animation is based */
	emoji: string;
	/** Value of the dice, 1-6 for “”, “” and “” base emoji, 1-5 for “” and “” base emoji, 1-64 for “” base emoji */
	value: number;
}
	

/** This object contains information about one answer option in a poll. */
export interface IPollOption {
	/** Option text, 1-100 characters */
	text: string;
	/** Number of users that voted for this option */
	voter_count: number;
}
	

/** This object represents an answer of a user in a non-anonymous poll. */
export interface IPollAnswer {
	/** Unique poll identifier */
	poll_id: string;
	/** The user, who changed the answer to the poll */
	user: IUser;
	/** 0-based identifiers of answer options, chosen by the user. May be empty if the user retracted their vote. */
	option_ids: number[];
}
	

/** This object contains information about a poll. */
export interface IPoll {
	/** Unique poll identifier */
	id: string;
	/** Poll question, 1-300 characters */
	question: string;
	/** List of poll options */
	options: IPollOption[];
	/** Total number of users that voted in the poll */
	total_voter_count: number;
	/** True, if the poll is closed */
	is_closed: boolean;
	/** True, if the poll is anonymous */
	is_anonymous: boolean;
	/** Poll type, currently can be “regular” or “quiz” */
	type: "regular" | "quiz";
	/** True, if the poll allows multiple answers */
	allows_multiple_answers: boolean;
	/** Optional. 0-based identifier of the correct answer option. Available only for polls in the quiz mode, which are closed, or was sent (not forwarded) by the bot or to the private chat with the bot. */
	correct_option_id?: number;
	/** Optional. Text that is shown when a user chooses an incorrect answer or taps on the lamp icon in a quiz-style poll, 0-200 characters */
	explanation?: string;
	/** Optional. Special entities like usernames, URLs, bot commands, etc. that appear in the explanation */
	explanation_entities?: IMessageEntity[];
	/** Optional. Amount of time in seconds the poll will be active after creation */
	open_period?: number;
	/** Optional. Point in time (Unix timestamp) when the poll will be automatically closed */
	close_date?: number;
}
	

/** This object represents a point on the map. */
export interface ILocation {
	/** Longitude as defined by sender */
	longitude: number;
	/** Latitude as defined by sender */
	latitude: number;
	/** Optional. The radius of uncertainty for the location, measured in meters; 0-1500 */
	horizontal_accuracy?: number;
	/** Optional. Time relative to the message sending date, during which the location can be updated; in seconds. For active live locations only. */
	live_period?: number;
	/** Optional. The direction in which user is moving, in degrees; 1-360. For active live locations only. */
	heading?: number;
	/** Optional. The maximum distance for proximity alerts about approaching another chat member, in meters. For sent live locations only. */
	proximity_alert_radius?: number;
}
	

/** This object represents a venue. */
export interface IVenue {
	/** Venue location. Can't be a live location */
	location: ILocation;
	/** Name of the venue */
	title: string;
	/** Address of the venue */
	address: string;
	/** Optional. Foursquare identifier of the venue */
	foursquare_id?: string;
	/** Optional. Foursquare type of the venue. (For example, “arts_entertainment/default”, “arts_entertainment/aquarium” or “food/icecream”.) */
	foursquare_type?: string;
	/** Optional. Google Places identifier of the venue */
	google_place_id?: string;
	/** Optional. Google Places type of the venue. (See supported types.) */
	google_place_type?: string;
}
	

/** Describes data sent from a Web App to the bot. */
export interface IWebAppData {
	/** The data. Be aware that a bad client can send arbitrary data in this field. */
	data: string;
	/** Text of the web_app keyboard button from which the Web App was opened. Be aware that a bad client can send arbitrary data in this field. */
	button_text: string;
}
	

/** This object represents the content of a service message, sent whenever a user in the chat triggers a proximity alert set by another user. */
export interface IProximityAlertTriggered {
	/** User that triggered the alert */
	traveler: IUser;
	/** User that set the alert */
	watcher: IUser;
	/** The distance between the users */
	distance: number;
}
	

/** This object represents a service message about a change in auto-delete timer settings. */
export interface IMessageAutoDeleteTimerChanged {
	/** New auto-delete time for messages in the chat; in seconds */
	message_auto_delete_time: number;
}
	

/** This object represents a service message about a new forum topic created in the chat. */
export interface IForumTopicCreated {
	/** Name of the topic */
	name: string;
	/** Color of the topic icon in RGB format */
	icon_color: number;
	/** Optional. Unique identifier of the custom emoji shown as the topic icon */
	icon_custom_emoji_id?: string;
}
	

/** This object represents a service message about a forum topic closed in the chat. Currently holds no information. */
export interface IForumTopicClosed {

}
	

/** This object represents a service message about an edited forum topic. */
export interface IForumTopicEdited {
	/** Optional. New name of the topic, if it was edited */
	name?: string;
	/** Optional. New identifier of the custom emoji shown as the topic icon, if it was edited; an empty string if the icon was removed */
	icon_custom_emoji_id?: string;
}
	

/** This object represents a service message about a forum topic reopened in the chat. Currently holds no information. */
export interface IForumTopicReopened {

}
	

/** This object represents a service message about General forum topic hidden in the chat. Currently holds no information. */
export interface IGeneralForumTopicHidden {

}
	

/** This object represents a service message about General forum topic unhidden in the chat. Currently holds no information. */
export interface IGeneralForumTopicUnhidden {

}
	

/** This object contains information about the user whose identifier was shared with the bot using a KeyboardButtonRequestUser button. */
export interface IUserShared {
	/** Identifier of the request */
	request_id: number;
	/** Identifier of the shared user. This number may have more than 32 significant bits and some programming languages may have difficulty/silent defects in interpreting it. But it has at most 52 significant bits, so a 64-bit integer or double-precision float type are safe for storing this identifier. The bot may not have access to the user and could be unable to use this identifier, unless the user is already known to the bot by some other means. */
	user_id: number;
}
	

/** This object contains information about the chat whose identifier was shared with the bot using a KeyboardButtonRequestChat button. */
export interface IChatShared {
	/** Identifier of the request */
	request_id: number;
	/** Identifier of the shared chat. This number may have more than 32 significant bits and some programming languages may have difficulty/silent defects in interpreting it. But it has at most 52 significant bits, so a 64-bit integer or double-precision float type are safe for storing this identifier. The bot may not have access to the chat and could be unable to use this identifier, unless the chat is already known to the bot by some other means. */
	chat_id: number;
}
	

/** This object represents a service message about a user allowing a bot added to the attachment menu to write messages. Currently holds no information. */
export interface IWriteAccessAllowed {

}
	

/** This object represents a service message about a video chat scheduled in the chat. */
export interface IVideoChatScheduled {
	/** Point in time (Unix timestamp) when the video chat is supposed to be started by a chat administrator */
	start_date: number;
}
	

/** This object represents a service message about a video chat started in the chat. Currently holds no information. */
export interface IVideoChatStarted {

}
	

/** This object represents a service message about a video chat ended in the chat. */
export interface IVideoChatEnded {
	/** Video chat duration in seconds */
	duration: number;
}
	

/** This object represents a service message about new members invited to a video chat. */
export interface IVideoChatParticipantsInvited {
	/** New members that were invited to the video chat */
	users: IUser[];
}
	

/** This object represent a user's profile pictures. */
export interface IUserProfilePhotos {
	/** Total number of profile pictures the target user has */
	total_count: number;
	/** Requested profile pictures (in up to 4 sizes each) */
	photos: IPhotoSize[][];
}
	

/** This object represents a file ready to be downloaded. The file can be downloaded via the link https://api.telegram.org/file/bot<token>/<file_path>. It is guaranteed that the link will be valid for at least 1 hour. When the link expires, a new one can be requested by calling getFile. */
export interface IFile {
	/** Identifier for this file, which can be used to download or reuse the file */
	file_id: string;
	/** Unique identifier for this file, which is supposed to be the same over time and for different bots. Can't be used to download or reuse the file. */
	file_unique_id: string;
	/** Optional. File size in bytes. It can be bigger than 2^31 and some programming languages may have difficulty/silent defects in interpreting it. But it has at most 52 significant bits, so a signed 64-bit integer or double-precision float type are safe for storing this value. */
	file_size?: number;
	/** Optional. File path. Use https://api.telegram.org/file/bot<token>/<file_path> to get the file. */
	file_path?: string;
}
	

/** Describes a Web App. */
export interface IWebAppInfo {
	/** An HTTPS URL of a Web App to be opened with additional data as specified in Initializing Web Apps */
	url: string;
}
	

/** This object represents a custom keyboard with reply options (see Introduction to bots for details and examples). */
export interface IReplyKeyboardMarkup {
	/** Array of button rows, each represented by an Array of KeyboardButton objects */
	keyboard: IKeyboardButton[][];
	/** Optional. Requests clients to always show the keyboard when the regular keyboard is hidden. Defaults to false, in which case the custom keyboard can be hidden and opened with a keyboard icon. */
	is_persistent?: boolean;
	/** Optional. Requests clients to resize the keyboard vertically for optimal fit (e.g., make the keyboard smaller if there are just two rows of buttons). Defaults to false, in which case the custom keyboard is always of the same height as the app's standard keyboard. */
	resize_keyboard?: boolean;
	/** Optional. Requests clients to hide the keyboard as soon as it's been used. The keyboard will still be available, but clients will automatically display the usual letter-keyboard in the chat - the user can press a special button in the input field to see the custom keyboard again. Defaults to false. */
	one_time_keyboard?: boolean;
	/** Optional. The placeholder to be shown in the input field when the keyboard is active; 1-64 characters */
	input_field_placeholder?: string;
	/** Optional. Use this parameter if you want to show the keyboard to specific users only. Targets: 1) users that are @mentioned in the text of the Message object; 2) if the bot's message is a reply (has reply_to_message_id), sender of the original message.Example: A user requests to change the bot's language, bot replies to the request with a keyboard to select the new language. Other users in the group don't see the keyboard. */
	selective?: boolean;
}
	

/** This object represents one button of the reply keyboard. For simple text buttons, String can be used instead of this object to specify the button text. The optional fields web_app, request_user, request_chat, request_contact, request_location, and request_poll are mutually exclusive. */
export interface IKeyboardButton {
	/** Text of the button. If none of the optional fields are used, it will be sent as a message when the button is pressed */
	text: string;
	/** Optional. If specified, pressing the button will open a list of suitable users. Tapping on any user will send their identifier to the bot in a “user_shared” service message. Available in private chats only. */
	request_user?: IKeyboardButtonRequestUser;
	/** Optional. If specified, pressing the button will open a list of suitable chats. Tapping on a chat will send its identifier to the bot in a “chat_shared” service message. Available in private chats only. */
	request_chat?: IKeyboardButtonRequestChat;
	/** Optional. If True, the user's phone number will be sent as a contact when the button is pressed. Available in private chats only. */
	request_contact?: boolean;
	/** Optional. If True, the user's current location will be sent when the button is pressed. Available in private chats only. */
	request_location?: boolean;
	/** Optional. If specified, the user will be asked to create a poll and send it to the bot when the button is pressed. Available in private chats only. */
	request_poll?: IKeyboardButtonPollType;
	/** Optional. If specified, the described Web App will be launched when the button is pressed. The Web App will be able to send a “web_app_data” service message. Available in private chats only. */
	web_app?: IWebAppInfo;
}
	

/** This object defines the criteria used to request a suitable user. The identifier of the selected user will be shared with the bot when the corresponding button is pressed. */
export interface IKeyboardButtonRequestUser {
	/** Signed 32-bit identifier of the request, which will be received back in the UserShared object. Must be unique within the message */
	request_id: number;
	/** Optional. Pass True to request a bot, pass False to request a regular user. If not specified, no additional restrictions are applied. */
	user_is_bot?: boolean;
	/** Optional. Pass True to request a premium user, pass False to request a non-premium user. If not specified, no additional restrictions are applied. */
	user_is_premium?: boolean;
}
	

/** This object defines the criteria used to request a suitable chat. The identifier of the selected chat will be shared with the bot when the corresponding button is pressed. */
export interface IKeyboardButtonRequestChat {
	/** Signed 32-bit identifier of the request, which will be received back in the ChatShared object. Must be unique within the message */
	request_id: number;
	/** Pass True to request a channel chat, pass False to request a group or a supergroup chat. */
	chat_is_channel: boolean;
	/** Optional. Pass True to request a forum supergroup, pass False to request a non-forum chat. If not specified, no additional restrictions are applied. */
	chat_is_forum?: boolean;
	/** Optional. Pass True to request a supergroup or a channel with a username, pass False to request a chat without a username. If not specified, no additional restrictions are applied. */
	chat_has_username?: boolean;
	/** Optional. Pass True to request a chat owned by the user. Otherwise, no additional restrictions are applied. */
	chat_is_created?: boolean;
	/** Optional. A JSON-serialized object listing the required administrator rights of the user in the chat. The rights must be a superset of bot_administrator_rights. If not specified, no additional restrictions are applied. */
	user_administrator_rights?: IChatAdministratorRights;
	/** Optional. A JSON-serialized object listing the required administrator rights of the bot in the chat. The rights must be a subset of user_administrator_rights. If not specified, no additional restrictions are applied. */
	bot_administrator_rights?: IChatAdministratorRights;
	/** Optional. Pass True to request a chat with the bot as a member. Otherwise, no additional restrictions are applied. */
	bot_is_member?: boolean;
}
	

/** This object represents type of a poll, which is allowed to be created and sent when the corresponding button is pressed. */
export interface IKeyboardButtonPollType {
	/** Optional. If quiz is passed, the user will be allowed to create only polls in the quiz mode. If regular is passed, only regular polls will be allowed. Otherwise, the user will be allowed to create a poll of any type. */
	type?: string;
}
	

/** Upon receiving a message with this object, Telegram clients will remove the current custom keyboard and display the default letter-keyboard. By default, custom keyboards are displayed until a new keyboard is sent by a bot. An exception is made for one-time keyboards that are hidden immediately after the user presses a button (see ReplyKeyboardMarkup). */
export interface IReplyKeyboardRemove {
	/** Requests clients to remove the custom keyboard (user will not be able to summon this keyboard; if you want to hide the keyboard from sight but keep it accessible, use one_time_keyboard in ReplyKeyboardMarkup) */
	remove_keyboard: true;
	/** Optional. Use this parameter if you want to remove the keyboard for specific users only. Targets: 1) users that are @mentioned in the text of the Message object; 2) if the bot's message is a reply (has reply_to_message_id), sender of the original message.Example: A user votes in a poll, bot returns confirmation message in reply to the vote and removes the keyboard for that user, while still showing the keyboard with poll options to users who haven't voted yet. */
	selective?: boolean;
}
	

/** This object represents an inline keyboard that appears right next to the message it belongs to. */
export interface IInlineKeyboardMarkup {
	/** Array of button rows, each represented by an Array of InlineKeyboardButton objects */
	inline_keyboard: IInlineKeyboardButton[][];
}
	

/** This object represents one button of an inline keyboard. You must use exactly one of the optional fields. */
export interface IInlineKeyboardButton {
	/** Label text on the button */
	text: string;
	/** Optional. HTTP or tg:// URL to be opened when the button is pressed. Links tg://user?id=<user_id> can be used to mention a user by their ID without using a username, if this is allowed by their privacy settings. */
	url?: string;
	/** Optional. Data to be sent in a callback query to the bot when button is pressed, 1-64 bytes */
	callback_data?: string;
	/** Optional. Description of the Web App that will be launched when the user presses the button. The Web App will be able to send an arbitrary message on behalf of the user using the method answerWebAppQuery. Available only in private chats between a user and the bot. */
	web_app?: IWebAppInfo;
	/** Optional. An HTTPS URL used to automatically authorize the user. Can be used as a replacement for the Telegram Login Widget. */
	login_url?: ILoginUrl;
	/** Optional. If set, pressing the button will prompt the user to select one of their chats, open that chat and insert the bot's username and the specified inline query in the input field. May be empty, in which case just the bot's username will be inserted.Note: This offers an easy way for users to start using your bot in inline mode when they are currently in a private chat with it. Especially useful when combined with switch_pm… actions - in this case the user will be automatically returned to the chat they switched from, skipping the chat selection screen. */
	switch_inline_query?: string;
	/** Optional. If set, pressing the button will insert the bot's username and the specified inline query in the current chat's input field. May be empty, in which case only the bot's username will be inserted.This offers a quick way for the user to open your bot in inline mode in the same chat - good for selecting something from multiple options. */
	switch_inline_query_current_chat?: string;
	/** Optional. Description of the game that will be launched when the user presses the button.NOTE: This type of button must always be the first button in the first row. */
	callback_game?: ICallbackGame;
	/** Optional. Specify True, to send a Pay button.NOTE: This type of button must always be the first button in the first row and can only be used in invoice messages. */
	pay?: boolean;
}
	

/** Telegram apps support these buttons as of version 5.7. */
export interface ILoginUrl {
	/** An HTTPS URL to be opened with user authorization data added to the query string when the button is pressed. If the user refuses to provide authorization data, the original URL without information about the user will be opened. The data added is the same as described in Receiving authorization data.NOTE: You must always check the hash of the received data to verify the authentication and the integrity of the data as described in Checking authorization. */
	url: string;
	/** Optional. New text of the button in forwarded messages. */
	forward_text?: string;
	/** Optional. Username of a bot, which will be used for user authorization. See Setting up a bot for more details. If not specified, the current bot's username will be assumed. The url's domain must be the same as the domain linked with the bot. See Linking your domain to the bot for more details. */
	bot_username?: string;
	/** Optional. Pass True to request the permission for your bot to send messages to the user. */
	request_write_access?: boolean;
}
	

/** This object represents an incoming callback query from a callback button in an inline keyboard. If the button that originated the query was attached to a message sent by the bot, the field message will be present. If the button was attached to a message sent via the bot (in inline mode), the field inline_message_id will be present. Exactly one of the fields data or game_short_name will be present. */
export interface ICallbackQuery {
	/** Unique identifier for this query */
	id: string;
	/** Sender */
	from: IUser;
	/** Optional. Message with the callback button that originated the query. Note that message content and message date will not be available if the message is too old */
	message?: IMessage;
	/** Optional. Identifier of the message sent via the bot in inline mode, that originated the query. */
	inline_message_id?: string;
	/** Global identifier, uniquely corresponding to the chat to which the message with the callback button was sent. Useful for high scores in games. */
	chat_instance: string;
	/** Optional. Data associated with the callback button. Be aware that the message originated the query can contain no callback buttons with this data. */
	data?: string;
	/** Optional. Short name of a Game to be returned, serves as the unique identifier for the game */
	game_short_name?: string;
}
	

/** Upon receiving a message with this object, Telegram clients will display a reply interface to the user (act as if the user has selected the bot's message and tapped 'Reply'). This can be extremely useful if you want to create user-friendly step-by-step interfaces without having to sacrifice privacy mode. */
export interface IForceReply {
	/** Shows reply interface to the user, as if they manually selected the bot's message and tapped 'Reply' */
	force_reply: true;
	/** Optional. The placeholder to be shown in the input field when the reply is active; 1-64 characters */
	input_field_placeholder?: string;
	/** Optional. Use this parameter if you want to force reply from specific users only. Targets: 1) users that are @mentioned in the text of the Message object; 2) if the bot's message is a reply (has reply_to_message_id), sender of the original message. */
	selective?: boolean;
}
	

/** This object represents a chat photo. */
export interface IChatPhoto {
	/** File identifier of small (160x160) chat photo. This file_id can be used only for photo download and only for as long as the photo is not changed. */
	small_file_id: string;
	/** Unique file identifier of small (160x160) chat photo, which is supposed to be the same over time and for different bots. Can't be used to download or reuse the file. */
	small_file_unique_id: string;
	/** File identifier of big (640x640) chat photo. This file_id can be used only for photo download and only for as long as the photo is not changed. */
	big_file_id: string;
	/** Unique file identifier of big (640x640) chat photo, which is supposed to be the same over time and for different bots. Can't be used to download or reuse the file. */
	big_file_unique_id: string;
}
	

/** Represents an invite link for a chat. */
export interface IChatInviteLink {
	/** The invite link. If the link was created by another chat administrator, then the second part of the link will be replaced with “…”. */
	invite_link: string;
	/** Creator of the link */
	creator: IUser;
	/** True, if users joining the chat via the link need to be approved by chat administrators */
	creates_join_request: boolean;
	/** True, if the link is primary */
	is_primary: boolean;
	/** True, if the link is revoked */
	is_revoked: boolean;
	/** Optional. Invite link name */
	name?: string;
	/** Optional. Point in time (Unix timestamp) when the link will expire or has been expired */
	expire_date?: number;
	/** Optional. The maximum number of users that can be members of the chat simultaneously after joining the chat via this invite link; 1-99999 */
	member_limit?: number;
	/** Optional. Number of pending join requests created using this link */
	pending_join_request_count?: number;
}
	

/** Represents the rights of an administrator in a chat. */
export interface IChatAdministratorRights {
	/** True, if the user's presence in the chat is hidden */
	is_anonymous: boolean;
	/** True, if the administrator can access the chat event log, chat statistics, message statistics in channels, see channel members, see anonymous administrators in supergroups and ignore slow mode. Implied by any other administrator privilege */
	can_manage_chat: boolean;
	/** True, if the administrator can delete messages of other users */
	can_delete_messages: boolean;
	/** True, if the administrator can manage video chats */
	can_manage_video_chats: boolean;
	/** True, if the administrator can restrict, ban or unban chat members */
	can_restrict_members: boolean;
	/** True, if the administrator can add new administrators with a subset of their own privileges or demote administrators that they have promoted, directly or indirectly (promoted by administrators that were appointed by the user) */
	can_promote_members: boolean;
	/** True, if the user is allowed to change the chat title, photo and other settings */
	can_change_info: boolean;
	/** True, if the user is allowed to invite new users to the chat */
	can_invite_users: boolean;
	/** Optional. True, if the administrator can post in the channel; channels only */
	can_post_messages?: boolean;
	/** Optional. True, if the administrator can edit messages of other users and can pin messages; channels only */
	can_edit_messages?: boolean;
	/** Optional. True, if the user is allowed to pin messages; groups and supergroups only */
	can_pin_messages?: boolean;
	/** Optional. True, if the user is allowed to create, rename, close, and reopen forum topics; supergroups only */
	can_manage_topics?: boolean;
}
	

/** This object contains information about one member of a chat. Currently, the following 6 types of chat members are supported: */
export type IChatMember = IChatMemberOwner | IChatMemberAdministrator | IChatMemberMember | IChatMemberRestricted | IChatMemberLeft | IChatMemberBanned;
	

/** Represents a chat member that owns the chat and has all administrator privileges. */
export interface IChatMemberOwner {
	/** The member's status in the chat, always “creator” */
	status: "creator";
	/** Information about the user */
	user: IUser;
	/** True, if the user's presence in the chat is hidden */
	is_anonymous: boolean;
	/** Optional. Custom title for this user */
	custom_title?: string;
}
	

/** Represents a chat member that has some additional privileges. */
export interface IChatMemberAdministrator {
	/** The member's status in the chat, always “administrator” */
	status: "administrator";
	/** Information about the user */
	user: IUser;
	/** True, if the bot is allowed to edit administrator privileges of that user */
	can_be_edited: boolean;
	/** True, if the user's presence in the chat is hidden */
	is_anonymous: boolean;
	/** True, if the administrator can access the chat event log, chat statistics, message statistics in channels, see channel members, see anonymous administrators in supergroups and ignore slow mode. Implied by any other administrator privilege */
	can_manage_chat: boolean;
	/** True, if the administrator can delete messages of other users */
	can_delete_messages: boolean;
	/** True, if the administrator can manage video chats */
	can_manage_video_chats: boolean;
	/** True, if the administrator can restrict, ban or unban chat members */
	can_restrict_members: boolean;
	/** True, if the administrator can add new administrators with a subset of their own privileges or demote administrators that they have promoted, directly or indirectly (promoted by administrators that were appointed by the user) */
	can_promote_members: boolean;
	/** True, if the user is allowed to change the chat title, photo and other settings */
	can_change_info: boolean;
	/** True, if the user is allowed to invite new users to the chat */
	can_invite_users: boolean;
	/** Optional. True, if the administrator can post in the channel; channels only */
	can_post_messages?: boolean;
	/** Optional. True, if the administrator can edit messages of other users and can pin messages; channels only */
	can_edit_messages?: boolean;
	/** Optional. True, if the user is allowed to pin messages; groups and supergroups only */
	can_pin_messages?: boolean;
	/** Optional. True, if the user is allowed to create, rename, close, and reopen forum topics; supergroups only */
	can_manage_topics?: boolean;
	/** Optional. Custom title for this user */
	custom_title?: string;
}
	

/** Represents a chat member that has no additional privileges or restrictions. */
export interface IChatMemberMember {
	/** The member's status in the chat, always “member” */
	status: "member";
	/** Information about the user */
	user: IUser;
}
	

/** Represents a chat member that is under certain restrictions in the chat. Supergroups only. */
export interface IChatMemberRestricted {
	/** The member's status in the chat, always “restricted” */
	status: "restricted";
	/** Information about the user */
	user: IUser;
	/** True, if the user is a member of the chat at the moment of the request */
	is_member: boolean;
	/** True, if the user is allowed to send text messages, contacts, invoices, locations and venues */
	can_send_messages: boolean;
	/** True, if the user is allowed to send audios */
	can_send_audios: boolean;
	/** True, if the user is allowed to send documents */
	can_send_documents: boolean;
	/** True, if the user is allowed to send photos */
	can_send_photos: boolean;
	/** True, if the user is allowed to send videos */
	can_send_videos: boolean;
	/** True, if the user is allowed to send video notes */
	can_send_video_notes: boolean;
	/** True, if the user is allowed to send voice notes */
	can_send_voice_notes: boolean;
	/** True, if the user is allowed to send polls */
	can_send_polls: boolean;
	/** True, if the user is allowed to send animations, games, stickers and use inline bots */
	can_send_other_messages: boolean;
	/** True, if the user is allowed to add web page previews to their messages */
	can_add_web_page_previews: boolean;
	/** True, if the user is allowed to change the chat title, photo and other settings */
	can_change_info: boolean;
	/** True, if the user is allowed to invite new users to the chat */
	can_invite_users: boolean;
	/** True, if the user is allowed to pin messages */
	can_pin_messages: boolean;
	/** True, if the user is allowed to create forum topics */
	can_manage_topics: boolean;
	/** Date when restrictions will be lifted for this user; unix time. If 0, then the user is restricted forever */
	until_date: number;
}
	

/** Represents a chat member that isn't currently a member of the chat, but may join it themselves. */
export interface IChatMemberLeft {
	/** The member's status in the chat, always “left” */
	status: "left";
	/** Information about the user */
	user: IUser;
}
	

/** Represents a chat member that was banned in the chat and can't return to the chat or view chat messages. */
export interface IChatMemberBanned {
	/** The member's status in the chat, always “kicked” */
	status: "kicked";
	/** Information about the user */
	user: IUser;
	/** Date when restrictions will be lifted for this user; unix time. If 0, then the user is banned forever */
	until_date: number;
}
	

/** This object represents changes in the status of a chat member. */
export interface IChatMemberUpdated {
	/** Chat the user belongs to */
	chat: IChat;
	/** Performer of the action, which resulted in the change */
	from: IUser;
	/** Date the change was done in Unix time */
	date: number;
	/** Previous information about the chat member */
	old_chat_member: IChatMember;
	/** New information about the chat member */
	new_chat_member: IChatMember;
	/** Optional. Chat invite link, which was used by the user to join the chat; for joining by invite link events only. */
	invite_link?: IChatInviteLink;
}
	

/** Represents a join request sent to a chat. */
export interface IChatJoinRequest {
	/** Chat to which the request was sent */
	chat: IChat;
	/** User that sent the join request */
	from: IUser;
	/** Identifier of a private chat with the user who sent the join request. This number may have more than 32 significant bits and some programming languages may have difficulty/silent defects in interpreting it. But it has at most 52 significant bits, so a 64-bit integer or double-precision float type are safe for storing this identifier. The bot can use this identifier for 24 hours to send messages until the join request is processed, assuming no other administrator contacted the user. */
	user_chat_id: number;
	/** Date the request was sent in Unix time */
	date: number;
	/** Optional. Bio of the user. */
	bio?: string;
	/** Optional. Chat invite link that was used by the user to send the join request */
	invite_link?: IChatInviteLink;
}
	

/** Describes actions that a non-administrator user is allowed to take in a chat. */
export interface IChatPermissions {
	/** Optional. True, if the user is allowed to send text messages, contacts, invoices, locations and venues */
	can_send_messages?: boolean;
	/** Optional. True, if the user is allowed to send audios */
	can_send_audios?: boolean;
	/** Optional. True, if the user is allowed to send documents */
	can_send_documents?: boolean;
	/** Optional. True, if the user is allowed to send photos */
	can_send_photos?: boolean;
	/** Optional. True, if the user is allowed to send videos */
	can_send_videos?: boolean;
	/** Optional. True, if the user is allowed to send video notes */
	can_send_video_notes?: boolean;
	/** Optional. True, if the user is allowed to send voice notes */
	can_send_voice_notes?: boolean;
	/** Optional. True, if the user is allowed to send polls */
	can_send_polls?: boolean;
	/** Optional. True, if the user is allowed to send animations, games, stickers and use inline bots */
	can_send_other_messages?: boolean;
	/** Optional. True, if the user is allowed to add web page previews to their messages */
	can_add_web_page_previews?: boolean;
	/** Optional. True, if the user is allowed to change the chat title, photo and other settings. Ignored in public supergroups */
	can_change_info?: boolean;
	/** Optional. True, if the user is allowed to invite new users to the chat */
	can_invite_users?: boolean;
	/** Optional. True, if the user is allowed to pin messages. Ignored in public supergroups */
	can_pin_messages?: boolean;
	/** Optional. True, if the user is allowed to create forum topics. If omitted defaults to the value of can_pin_messages */
	can_manage_topics?: boolean;
}
	

/** Represents a location to which a chat is connected. */
export interface IChatLocation {
	/** The location to which the supergroup is connected. Can't be a live location. */
	location: ILocation;
	/** Location address; 1-64 characters, as defined by the chat owner */
	address: string;
}
	

/** This object represents a forum topic. */
export interface IForumTopic {
	/** Unique identifier of the forum topic */
	message_thread_id: number;
	/** Name of the topic */
	name: string;
	/** Color of the topic icon in RGB format */
	icon_color: number;
	/** Optional. Unique identifier of the custom emoji shown as the topic icon */
	icon_custom_emoji_id?: string;
}
	

/** This object represents a bot command. */
export interface IBotCommand {
	/** Text of the command; 1-32 characters. Can contain only lowercase English letters, digits and underscores. */
	command: string;
	/** Description of the command; 1-256 characters. */
	description: string;
}
	

/** Commands in group and supergroup chats */
export interface IBotCommandScope {

}
	

/** Represents the default scope of bot commands. Default commands are used if no commands with a narrower scope are specified for the user. */
export interface IBotCommandScopeDefault {
	/** Scope type, must be default */
	type: string;
}
	

/** Represents the scope of bot commands, covering all private chats. */
export interface IBotCommandScopeAllPrivateChats {
	/** Scope type, must be all_private_chats */
	type: string;
}
	

/** Represents the scope of bot commands, covering all group and supergroup chats. */
export interface IBotCommandScopeAllGroupChats {
	/** Scope type, must be all_group_chats */
	type: string;
}
	

/** Represents the scope of bot commands, covering all group and supergroup chat administrators. */
export interface IBotCommandScopeAllChatAdministrators {
	/** Scope type, must be all_chat_administrators */
	type: string;
}
	

/** Represents the scope of bot commands, covering a specific chat. */
export interface IBotCommandScopeChat {
	/** Scope type, must be chat */
	type: string;
	/** Unique identifier for the target chat or username of the target supergroup (in the format @supergroupusername) */
	chat_id: number | string;
}
	

/** Represents the scope of bot commands, covering all administrators of a specific group or supergroup chat. */
export interface IBotCommandScopeChatAdministrators {
	/** Scope type, must be chat_administrators */
	type: string;
	/** Unique identifier for the target chat or username of the target supergroup (in the format @supergroupusername) */
	chat_id: number | string;
}
	

/** Represents the scope of bot commands, covering a specific member of a group or supergroup chat. */
export interface IBotCommandScopeChatMember {
	/** Scope type, must be chat_member */
	type: string;
	/** Unique identifier for the target chat or username of the target supergroup (in the format @supergroupusername) */
	chat_id: number | string;
	/** Unique identifier of the target user */
	user_id: number;
}
	

/** If a menu button other than MenuButtonDefault is set for a private chat, then it is applied in the chat. Otherwise the default menu button is applied. By default, the menu button opens the list of bot commands. */
export interface IMenuButton {

}
	

/** Represents a menu button, which opens the bot's list of commands. */
export interface IMenuButtonCommands {
	/** Type of the button, must be commands */
	type: string;
}
	

/** Represents a menu button, which launches a Web App. */
export interface IMenuButtonWebApp {
	/** Type of the button, must be web_app */
	type: string;
	/** Text on the button */
	text: string;
	/** Description of the Web App that will be launched when the user presses the button. The Web App will be able to send an arbitrary message on behalf of the user using the method answerWebAppQuery. */
	web_app: IWebAppInfo;
}
	

/** Describes that no specific value for the menu button was set. */
export interface IMenuButtonDefault {
	/** Type of the button, must be default */
	type: string;
}
	

/** Describes why a request was unsuccessful. */
export interface IResponseParameters {
	/** Optional. The group has been migrated to a supergroup with the specified identifier. This number may have more than 32 significant bits and some programming languages may have difficulty/silent defects in interpreting it. But it has at most 52 significant bits, so a signed 64-bit integer or double-precision float type are safe for storing this identifier. */
	migrate_to_chat_id?: number;
	/** Optional. In case of exceeding flood control, the number of seconds left to wait before the request can be repeated */
	retry_after?: number;
}
	

/** This object represents the content of a media message to be sent. It should be one of */
export interface IInputMedia {

}
	

/** Represents a photo to be sent. */
export interface IInputMediaPhoto {
	/** Type of the result, must be photo */
	type: string;
	/** File to send. Pass a file_id to send a file that exists on the Telegram servers (recommended), pass an HTTP URL for Telegram to get a file from the Internet, or pass “attach://<file_attach_name>” to upload a new one using multipart/form-data under <file_attach_name> name. */
	media: string;
	/** Optional. Caption of the photo to be sent, 0-1024 characters after entities parsing */
	caption?: string;
	/** Optional. Mode for parsing entities in the photo caption. See formatting options for more details. */
	parse_mode?: string;
	/** Optional. List of special entities that appear in the caption, which can be specified instead of parse_mode */
	caption_entities?: IMessageEntity[];
	/** Optional. Pass True if the photo needs to be covered with a spoiler animation */
	has_spoiler?: boolean;
}
	

/** Represents a video to be sent. */
export interface IInputMediaVideo {
	/** Type of the result, must be video */
	type: string;
	/** File to send. Pass a file_id to send a file that exists on the Telegram servers (recommended), pass an HTTP URL for Telegram to get a file from the Internet, or pass “attach://<file_attach_name>” to upload a new one using multipart/form-data under <file_attach_name> name. */
	media: string;
	/** Optional. Thumbnail of the file sent; can be ignored if thumbnail generation for the file is supported server-side. The thumbnail should be in JPEG format and less than 200 kB in size. A thumbnail's width and height should not exceed 320. Ignored if the file is not uploaded using multipart/form-data. Thumbnails can't be reused and can be only uploaded as a new file, so you can pass “attach://<file_attach_name>” if the thumbnail was uploaded using multipart/form-data under <file_attach_name>. */
	thumb?: IInputFile | string;
	/** Optional. Caption of the video to be sent, 0-1024 characters after entities parsing */
	caption?: string;
	/** Optional. Mode for parsing entities in the video caption. See formatting options for more details. */
	parse_mode?: string;
	/** Optional. List of special entities that appear in the caption, which can be specified instead of parse_mode */
	caption_entities?: IMessageEntity[];
	/** Optional. Video width */
	width?: number;
	/** Optional. Video height */
	height?: number;
	/** Optional. Video duration in seconds */
	duration?: number;
	/** Optional. Pass True if the uploaded video is suitable for streaming */
	supports_streaming?: boolean;
	/** Optional. Pass True if the video needs to be covered with a spoiler animation */
	has_spoiler?: boolean;
}
	

/** Represents an animation file (GIF or H.264/MPEG-4 AVC video without sound) to be sent. */
export interface IInputMediaAnimation {
	/** Type of the result, must be animation */
	type: string;
	/** File to send. Pass a file_id to send a file that exists on the Telegram servers (recommended), pass an HTTP URL for Telegram to get a file from the Internet, or pass “attach://<file_attach_name>” to upload a new one using multipart/form-data under <file_attach_name> name. */
	media: string;
	/** Optional. Thumbnail of the file sent; can be ignored if thumbnail generation for the file is supported server-side. The thumbnail should be in JPEG format and less than 200 kB in size. A thumbnail's width and height should not exceed 320. Ignored if the file is not uploaded using multipart/form-data. Thumbnails can't be reused and can be only uploaded as a new file, so you can pass “attach://<file_attach_name>” if the thumbnail was uploaded using multipart/form-data under <file_attach_name>. */
	thumb?: IInputFile | string;
	/** Optional. Caption of the animation to be sent, 0-1024 characters after entities parsing */
	caption?: string;
	/** Optional. Mode for parsing entities in the animation caption. See formatting options for more details. */
	parse_mode?: string;
	/** Optional. List of special entities that appear in the caption, which can be specified instead of parse_mode */
	caption_entities?: IMessageEntity[];
	/** Optional. Animation width */
	width?: number;
	/** Optional. Animation height */
	height?: number;
	/** Optional. Animation duration in seconds */
	duration?: number;
	/** Optional. Pass True if the animation needs to be covered with a spoiler animation */
	has_spoiler?: boolean;
}
	

/** Represents an audio file to be treated as music to be sent. */
export interface IInputMediaAudio {
	/** Type of the result, must be audio */
	type: string;
	/** File to send. Pass a file_id to send a file that exists on the Telegram servers (recommended), pass an HTTP URL for Telegram to get a file from the Internet, or pass “attach://<file_attach_name>” to upload a new one using multipart/form-data under <file_attach_name> name. */
	media: string;
	/** Optional. Thumbnail of the file sent; can be ignored if thumbnail generation for the file is supported server-side. The thumbnail should be in JPEG format and less than 200 kB in size. A thumbnail's width and height should not exceed 320. Ignored if the file is not uploaded using multipart/form-data. Thumbnails can't be reused and can be only uploaded as a new file, so you can pass “attach://<file_attach_name>” if the thumbnail was uploaded using multipart/form-data under <file_attach_name>. */
	thumb?: IInputFile | string;
	/** Optional. Caption of the audio to be sent, 0-1024 characters after entities parsing */
	caption?: string;
	/** Optional. Mode for parsing entities in the audio caption. See formatting options for more details. */
	parse_mode?: string;
	/** Optional. List of special entities that appear in the caption, which can be specified instead of parse_mode */
	caption_entities?: IMessageEntity[];
	/** Optional. Duration of the audio in seconds */
	duration?: number;
	/** Optional. Performer of the audio */
	performer?: string;
	/** Optional. Title of the audio */
	title?: string;
}
	

/** Represents a general file to be sent. */
export interface IInputMediaDocument {
	/** Type of the result, must be document */
	type: string;
	/** File to send. Pass a file_id to send a file that exists on the Telegram servers (recommended), pass an HTTP URL for Telegram to get a file from the Internet, or pass “attach://<file_attach_name>” to upload a new one using multipart/form-data under <file_attach_name> name. */
	media: string;
	/** Optional. Thumbnail of the file sent; can be ignored if thumbnail generation for the file is supported server-side. The thumbnail should be in JPEG format and less than 200 kB in size. A thumbnail's width and height should not exceed 320. Ignored if the file is not uploaded using multipart/form-data. Thumbnails can't be reused and can be only uploaded as a new file, so you can pass “attach://<file_attach_name>” if the thumbnail was uploaded using multipart/form-data under <file_attach_name>. */
	thumb?: IInputFile | string;
	/** Optional. Caption of the document to be sent, 0-1024 characters after entities parsing */
	caption?: string;
	/** Optional. Mode for parsing entities in the document caption. See formatting options for more details. */
	parse_mode?: string;
	/** Optional. List of special entities that appear in the caption, which can be specified instead of parse_mode */
	caption_entities?: IMessageEntity[];
	/** Optional. Disables automatic server-side content type detection for files uploaded using multipart/form-data. Always True, if the document is sent as part of an album. */
	disable_content_type_detection?: boolean;
}
	

/** Parameters for the sendMessage method */
export interface ISendMessageParams {
	/** Unique identifier for the target chat or username of the target channel (in the format @channelusername) */
	chat_id: number | string;
	/** Unique identifier for the target message thread (topic) of the forum; for forum supergroups only */
	message_thread_id?: number;
	/** Text of the message to be sent, 1-4096 characters after entities parsing */
	text: string;
	/** Mode for parsing entities in the message text. See formatting options for more details. */
	parse_mode?: string;
	/** A JSON-serialized list of special entities that appear in message text, which can be specified instead of parse_mode */
	entities?: IMessageEntity[];
	/** Disables link previews for links in this message */
	disable_web_page_preview?: boolean;
	/** Sends the message silently. Users will receive a notification with no sound. */
	disable_notification?: boolean;
	/** Protects the contents of the sent message from forwarding and saving */
	protect_content?: boolean;
	/** If the message is a reply, ID of the original message */
	reply_to_message_id?: number;
	/** Pass True if the message should be sent even if the specified replied-to message is not found */
	allow_sending_without_reply?: boolean;
	/** Additional interface options. A JSON-serialized object for an inline keyboard, custom reply keyboard, instructions to remove reply keyboard or to force a reply from the user. */
	reply_markup?: IInlineKeyboardMarkup | IReplyKeyboardMarkup | IReplyKeyboardRemove | IForceReply;
}
	

/** Parameters for the forwardMessage method */
export interface IForwardMessageParams {
	/** Unique identifier for the target chat or username of the target channel (in the format @channelusername) */
	chat_id: number | string;
	/** Unique identifier for the target message thread (topic) of the forum; for forum supergroups only */
	message_thread_id?: number;
	/** Unique identifier for the chat where the original message was sent (or channel username in the format @channelusername) */
	from_chat_id: number | string;
	/** Sends the message silently. Users will receive a notification with no sound. */
	disable_notification?: boolean;
	/** Protects the contents of the forwarded message from forwarding and saving */
	protect_content?: boolean;
	/** Message identifier in the chat specified in from_chat_id */
	message_id: number;
}
	

/** Parameters for the copyMessage method */
export interface ICopyMessageParams {
	/** Unique identifier for the target chat or username of the target channel (in the format @channelusername) */
	chat_id: number | string;
	/** Unique identifier for the target message thread (topic) of the forum; for forum supergroups only */
	message_thread_id?: number;
	/** Unique identifier for the chat where the original message was sent (or channel username in the format @channelusername) */
	from_chat_id: number | string;
	/** Message identifier in the chat specified in from_chat_id */
	message_id: number;
	/** New caption for media, 0-1024 characters after entities parsing. If not specified, the original caption is kept */
	caption?: string;
	/** Mode for parsing entities in the new caption. See formatting options for more details. */
	parse_mode?: string;
	/** A JSON-serialized list of special entities that appear in the new caption, which can be specified instead of parse_mode */
	caption_entities?: IMessageEntity[];
	/** Sends the message silently. Users will receive a notification with no sound. */
	disable_notification?: boolean;
	/** Protects the contents of the sent message from forwarding and saving */
	protect_content?: boolean;
	/** If the message is a reply, ID of the original message */
	reply_to_message_id?: number;
	/** Pass True if the message should be sent even if the specified replied-to message is not found */
	allow_sending_without_reply?: boolean;
	/** Additional interface options. A JSON-serialized object for an inline keyboard, custom reply keyboard, instructions to remove reply keyboard or to force a reply from the user. */
	reply_markup?: IInlineKeyboardMarkup | IReplyKeyboardMarkup | IReplyKeyboardRemove | IForceReply;
}
	

/** Parameters for the sendPhoto method */
export interface ISendPhotoParams {
	/** Unique identifier for the target chat or username of the target channel (in the format @channelusername) */
	chat_id: number | string;
	/** Unique identifier for the target message thread (topic) of the forum; for forum supergroups only */
	message_thread_id?: number;
	/** Photo to send. Pass a file_id as String to send a photo that exists on the Telegram servers (recommended), pass an HTTP URL as a String for Telegram to get a photo from the Internet, or upload a new photo using multipart/form-data. The photo must be at most 10 MB in size. The photo's width and height must not exceed 10000 in total. Width and height ratio must be at most 20. */
	photo: IInputFile | string;
	/** Photo caption (may also be used when resending photos by file_id), 0-1024 characters after entities parsing */
	caption?: string;
	/** Mode for parsing entities in the photo caption. See formatting options for more details. */
	parse_mode?: string;
	/** A JSON-serialized list of special entities that appear in the caption, which can be specified instead of parse_mode */
	caption_entities?: IMessageEntity[];
	/** Pass True if the photo needs to be covered with a spoiler animation */
	has_spoiler?: boolean;
	/** Sends the message silently. Users will receive a notification with no sound. */
	disable_notification?: boolean;
	/** Protects the contents of the sent message from forwarding and saving */
	protect_content?: boolean;
	/** If the message is a reply, ID of the original message */
	reply_to_message_id?: number;
	/** Pass True if the message should be sent even if the specified replied-to message is not found */
	allow_sending_without_reply?: boolean;
	/** Additional interface options. A JSON-serialized object for an inline keyboard, custom reply keyboard, instructions to remove reply keyboard or to force a reply from the user. */
	reply_markup?: IInlineKeyboardMarkup | IReplyKeyboardMarkup | IReplyKeyboardRemove | IForceReply;
}
	

/** Parameters for the sendAudio method */
export interface ISendAudioParams {
	/** Unique identifier for the target chat or username of the target channel (in the format @channelusername) */
	chat_id: number | string;
	/** Unique identifier for the target message thread (topic) of the forum; for forum supergroups only */
	message_thread_id?: number;
	/** Audio file to send. Pass a file_id as String to send an audio file that exists on the Telegram servers (recommended), pass an HTTP URL as a String for Telegram to get an audio file from the Internet, or upload a new one using multipart/form-data. */
	audio: IInputFile | string;
	/** Audio caption, 0-1024 characters after entities parsing */
	caption?: string;
	/** Mode for parsing entities in the audio caption. See formatting options for more details. */
	parse_mode?: string;
	/** A JSON-serialized list of special entities that appear in the caption, which can be specified instead of parse_mode */
	caption_entities?: IMessageEntity[];
	/** Duration of the audio in seconds */
	duration?: number;
	/** Performer */
	performer?: string;
	/** Track name */
	title?: string;
	/** Thumbnail of the file sent; can be ignored if thumbnail generation for the file is supported server-side. The thumbnail should be in JPEG format and less than 200 kB in size. A thumbnail's width and height should not exceed 320. Ignored if the file is not uploaded using multipart/form-data. Thumbnails can't be reused and can be only uploaded as a new file, so you can pass “attach://<file_attach_name>” if the thumbnail was uploaded using multipart/form-data under <file_attach_name>.  */
	thumb?: IInputFile | string;
	/** Sends the message silently. Users will receive a notification with no sound. */
	disable_notification?: boolean;
	/** Protects the contents of the sent message from forwarding and saving */
	protect_content?: boolean;
	/** If the message is a reply, ID of the original message */
	reply_to_message_id?: number;
	/** Pass True if the message should be sent even if the specified replied-to message is not found */
	allow_sending_without_reply?: boolean;
	/** Additional interface options. A JSON-serialized object for an inline keyboard, custom reply keyboard, instructions to remove reply keyboard or to force a reply from the user. */
	reply_markup?: IInlineKeyboardMarkup | IReplyKeyboardMarkup | IReplyKeyboardRemove | IForceReply;
}
	

/** Parameters for the sendDocument method */
export interface ISendDocumentParams {
	/** Unique identifier for the target chat or username of the target channel (in the format @channelusername) */
	chat_id: number | string;
	/** Unique identifier for the target message thread (topic) of the forum; for forum supergroups only */
	message_thread_id?: number;
	/** File to send. Pass a file_id as String to send a file that exists on the Telegram servers (recommended), pass an HTTP URL as a String for Telegram to get a file from the Internet, or upload a new one using multipart/form-data.  */
	document: IInputFile | string;
	/** Thumbnail of the file sent; can be ignored if thumbnail generation for the file is supported server-side. The thumbnail should be in JPEG format and less than 200 kB in size. A thumbnail's width and height should not exceed 320. Ignored if the file is not uploaded using multipart/form-data. Thumbnails can't be reused and can be only uploaded as a new file, so you can pass “attach://<file_attach_name>” if the thumbnail was uploaded using multipart/form-data under <file_attach_name>. */
	thumb?: IInputFile | string;
	/** Document caption (may also be used when resending documents by file_id), 0-1024 characters after entities parsing */
	caption?: string;
	/** Mode for parsing entities in the document caption. See formatting options for more details. */
	parse_mode?: string;
	/** A JSON-serialized list of special entities that appear in the caption, which can be specified instead of parse_mode */
	caption_entities?: IMessageEntity[];
	/** Disables automatic server-side content type detection for files uploaded using multipart/form-data */
	disable_content_type_detection?: boolean;
	/** Sends the message silently. Users will receive a notification with no sound. */
	disable_notification?: boolean;
	/** Protects the contents of the sent message from forwarding and saving */
	protect_content?: boolean;
	/** If the message is a reply, ID of the original message */
	reply_to_message_id?: number;
	/** Pass True if the message should be sent even if the specified replied-to message is not found */
	allow_sending_without_reply?: boolean;
	/** Additional interface options. A JSON-serialized object for an inline keyboard, custom reply keyboard, instructions to remove reply keyboard or to force a reply from the user. */
	reply_markup?: IInlineKeyboardMarkup | IReplyKeyboardMarkup | IReplyKeyboardRemove | IForceReply;
}
	

/** Parameters for the sendVideo method */
export interface ISendVideoParams {
	/** Unique identifier for the target chat or username of the target channel (in the format @channelusername) */
	chat_id: number | string;
	/** Unique identifier for the target message thread (topic) of the forum; for forum supergroups only */
	message_thread_id?: number;
	/** Video to send. Pass a file_id as String to send a video that exists on the Telegram servers (recommended), pass an HTTP URL as a String for Telegram to get a video from the Internet, or upload a new video using multipart/form-data. */
	video: IInputFile | string;
	/** Duration of sent video in seconds */
	duration?: number;
	/** Video width */
	width?: number;
	/** Video height */
	height?: number;
	/** Thumbnail of the file sent; can be ignored if thumbnail generation for the file is supported server-side. The thumbnail should be in JPEG format and less than 200 kB in size. A thumbnail's width and height should not exceed 320. Ignored if the file is not uploaded using multipart/form-data. Thumbnails can't be reused and can be only uploaded as a new file, so you can pass “attach://<file_attach_name>” if the thumbnail was uploaded using multipart/form-data under <file_attach_name>. */
	thumb?: IInputFile | string;
	/** Video caption (may also be used when resending videos by file_id), 0-1024 characters after entities parsing */
	caption?: string;
	/** Mode for parsing entities in the video caption. See formatting options for more details. */
	parse_mode?: string;
	/** A JSON-serialized list of special entities that appear in the caption, which can be specified instead of parse_mode */
	caption_entities?: IMessageEntity[];
	/** Pass True if the video needs to be covered with a spoiler animation */
	has_spoiler?: boolean;
	/** Pass True if the uploaded video is suitable for streaming */
	supports_streaming?: boolean;
	/** Sends the message silently. Users will receive a notification with no sound. */
	disable_notification?: boolean;
	/** Protects the contents of the sent message from forwarding and saving */
	protect_content?: boolean;
	/** If the message is a reply, ID of the original message */
	reply_to_message_id?: number;
	/** Pass True if the message should be sent even if the specified replied-to message is not found */
	allow_sending_without_reply?: boolean;
	/** Additional interface options. A JSON-serialized object for an inline keyboard, custom reply keyboard, instructions to remove reply keyboard or to force a reply from the user. */
	reply_markup?: IInlineKeyboardMarkup | IReplyKeyboardMarkup | IReplyKeyboardRemove | IForceReply;
}
	

/** Parameters for the sendAnimation method */
export interface ISendAnimationParams {
	/** Unique identifier for the target chat or username of the target channel (in the format @channelusername) */
	chat_id: number | string;
	/** Unique identifier for the target message thread (topic) of the forum; for forum supergroups only */
	message_thread_id?: number;
	/** Animation to send. Pass a file_id as String to send an animation that exists on the Telegram servers (recommended), pass an HTTP URL as a String for Telegram to get an animation from the Internet, or upload a new animation using multipart/form-data. */
	animation: IInputFile | string;
	/** Duration of sent animation in seconds */
	duration?: number;
	/** Animation width */
	width?: number;
	/** Animation height */
	height?: number;
	/** Thumbnail of the file sent; can be ignored if thumbnail generation for the file is supported server-side. The thumbnail should be in JPEG format and less than 200 kB in size. A thumbnail's width and height should not exceed 320. Ignored if the file is not uploaded using multipart/form-data. Thumbnails can't be reused and can be only uploaded as a new file, so you can pass “attach://<file_attach_name>” if the thumbnail was uploaded using multipart/form-data under <file_attach_name>. */
	thumb?: IInputFile | string;
	/** Animation caption (may also be used when resending animation by file_id), 0-1024 characters after entities parsing */
	caption?: string;
	/** Mode for parsing entities in the animation caption. See formatting options for more details. */
	parse_mode?: string;
	/** A JSON-serialized list of special entities that appear in the caption, which can be specified instead of parse_mode */
	caption_entities?: IMessageEntity[];
	/** Pass True if the animation needs to be covered with a spoiler animation */
	has_spoiler?: boolean;
	/** Sends the message silently. Users will receive a notification with no sound. */
	disable_notification?: boolean;
	/** Protects the contents of the sent message from forwarding and saving */
	protect_content?: boolean;
	/** If the message is a reply, ID of the original message */
	reply_to_message_id?: number;
	/** Pass True if the message should be sent even if the specified replied-to message is not found */
	allow_sending_without_reply?: boolean;
	/** Additional interface options. A JSON-serialized object for an inline keyboard, custom reply keyboard, instructions to remove reply keyboard or to force a reply from the user. */
	reply_markup?: IInlineKeyboardMarkup | IReplyKeyboardMarkup | IReplyKeyboardRemove | IForceReply;
}
	

/** Parameters for the sendVoice method */
export interface ISendVoiceParams {
	/** Unique identifier for the target chat or username of the target channel (in the format @channelusername) */
	chat_id: number | string;
	/** Unique identifier for the target message thread (topic) of the forum; for forum supergroups only */
	message_thread_id?: number;
	/** Audio file to send. Pass a file_id as String to send a file that exists on the Telegram servers (recommended), pass an HTTP URL as a String for Telegram to get a file from the Internet, or upload a new one using multipart/form-data. */
	voice: IInputFile | string;
	/** Voice message caption, 0-1024 characters after entities parsing */
	caption?: string;
	/** Mode for parsing entities in the voice message caption. See formatting options for more details. */
	parse_mode?: string;
	/** A JSON-serialized list of special entities that appear in the caption, which can be specified instead of parse_mode */
	caption_entities?: IMessageEntity[];
	/** Duration of the voice message in seconds */
	duration?: number;
	/** Sends the message silently. Users will receive a notification with no sound. */
	disable_notification?: boolean;
	/** Protects the contents of the sent message from forwarding and saving */
	protect_content?: boolean;
	/** If the message is a reply, ID of the original message */
	reply_to_message_id?: number;
	/** Pass True if the message should be sent even if the specified replied-to message is not found */
	allow_sending_without_reply?: boolean;
	/** Additional interface options. A JSON-serialized object for an inline keyboard, custom reply keyboard, instructions to remove reply keyboard or to force a reply from the user. */
	reply_markup?: IInlineKeyboardMarkup | IReplyKeyboardMarkup | IReplyKeyboardRemove | IForceReply;
}
	

/** Parameters for the sendVideoNote method */
export interface ISendVideoNoteParams {
	/** Unique identifier for the target chat or username of the target channel (in the format @channelusername) */
	chat_id: number | string;
	/** Unique identifier for the target message thread (topic) of the forum; for forum supergroups only */
	message_thread_id?: number;
	/** Video note to send. Pass a file_id as String to send a video note that exists on the Telegram servers (recommended) or upload a new video using multipart/form-data.. Sending video notes by a URL is currently unsupported */
	video_note: IInputFile | string;
	/** Duration of sent video in seconds */
	duration?: number;
	/** Video width and height, i.e. diameter of the video message */
	length?: number;
	/** Thumbnail of the file sent; can be ignored if thumbnail generation for the file is supported server-side. The thumbnail should be in JPEG format and less than 200 kB in size. A thumbnail's width and height should not exceed 320. Ignored if the file is not uploaded using multipart/form-data. Thumbnails can't be reused and can be only uploaded as a new file, so you can pass “attach://<file_attach_name>” if the thumbnail was uploaded using multipart/form-data under <file_attach_name>. */
	thumb?: IInputFile | string;
	/** Sends the message silently. Users will receive a notification with no sound. */
	disable_notification?: boolean;
	/** Protects the contents of the sent message from forwarding and saving */
	protect_content?: boolean;
	/** If the message is a reply, ID of the original message */
	reply_to_message_id?: number;
	/** Pass True if the message should be sent even if the specified replied-to message is not found */
	allow_sending_without_reply?: boolean;
	/** Additional interface options. A JSON-serialized object for an inline keyboard, custom reply keyboard, instructions to remove reply keyboard or to force a reply from the user. */
	reply_markup?: IInlineKeyboardMarkup | IReplyKeyboardMarkup | IReplyKeyboardRemove | IForceReply;
}
	

/** Parameters for the sendMediaGroup method */
export interface ISendMediaGroupParams {
	/** Unique identifier for the target chat or username of the target channel (in the format @channelusername) */
	chat_id: number | string;
	/** Unique identifier for the target message thread (topic) of the forum; for forum supergroups only */
	message_thread_id?: number;
	/** A JSON-serialized array describing messages to be sent, must include 2-10 items */
	media: [IInputMediaAudio | IInputMediaDocument | IInputMediaPhoto | IInputMediaVideo];
	/** Sends messages silently. Users will receive a notification with no sound. */
	disable_notification?: boolean;
	/** Protects the contents of the sent messages from forwarding and saving */
	protect_content?: boolean;
	/** If the messages are a reply, ID of the original message */
	reply_to_message_id?: number;
	/** Pass True if the message should be sent even if the specified replied-to message is not found */
	allow_sending_without_reply?: boolean;
}
	

/** Parameters for the sendLocation method */
export interface ISendLocationParams {
	/** Unique identifier for the target chat or username of the target channel (in the format @channelusername) */
	chat_id: number | string;
	/** Unique identifier for the target message thread (topic) of the forum; for forum supergroups only */
	message_thread_id?: number;
	/** Latitude of the location */
	latitude: number;
	/** Longitude of the location */
	longitude: number;
	/** The radius of uncertainty for the location, measured in meters; 0-1500 */
	horizontal_accuracy?: number;
	/** Period in seconds for which the location will be updated (see Live Locations, should be between 60 and 86400. */
	live_period?: number;
	/** For live locations, a direction in which the user is moving, in degrees. Must be between 1 and 360 if specified. */
	heading?: number;
	/** For live locations, a maximum distance for proximity alerts about approaching another chat member, in meters. Must be between 1 and 100000 if specified. */
	proximity_alert_radius?: number;
	/** Sends the message silently. Users will receive a notification with no sound. */
	disable_notification?: boolean;
	/** Protects the contents of the sent message from forwarding and saving */
	protect_content?: boolean;
	/** If the message is a reply, ID of the original message */
	reply_to_message_id?: number;
	/** Pass True if the message should be sent even if the specified replied-to message is not found */
	allow_sending_without_reply?: boolean;
	/** Additional interface options. A JSON-serialized object for an inline keyboard, custom reply keyboard, instructions to remove reply keyboard or to force a reply from the user. */
	reply_markup?: IInlineKeyboardMarkup | IReplyKeyboardMarkup | IReplyKeyboardRemove | IForceReply;
}
	

/** Parameters for the editMessageLiveLocation method */
export interface IEditMessageLiveLocationParams {
	/** Required if inline_message_id is not specified. Unique identifier for the target chat or username of the target channel (in the format @channelusername) */
	chat_id?: number | string;
	/** Required if inline_message_id is not specified. Identifier of the message to edit */
	message_id?: number;
	/** Required if chat_id and message_id are not specified. Identifier of the inline message */
	inline_message_id?: string;
	/** Latitude of new location */
	latitude: number;
	/** Longitude of new location */
	longitude: number;
	/** The radius of uncertainty for the location, measured in meters; 0-1500 */
	horizontal_accuracy?: number;
	/** Direction in which the user is moving, in degrees. Must be between 1 and 360 if specified. */
	heading?: number;
	/** The maximum distance for proximity alerts about approaching another chat member, in meters. Must be between 1 and 100000 if specified. */
	proximity_alert_radius?: number;
	/** A JSON-serialized object for a new inline keyboard. */
	reply_markup?: IInlineKeyboardMarkup;
}
	

/** Parameters for the stopMessageLiveLocation method */
export interface IStopMessageLiveLocationParams {
	/** Required if inline_message_id is not specified. Unique identifier for the target chat or username of the target channel (in the format @channelusername) */
	chat_id?: number | string;
	/** Required if inline_message_id is not specified. Identifier of the message with live location to stop */
	message_id?: number;
	/** Required if chat_id and message_id are not specified. Identifier of the inline message */
	inline_message_id?: string;
	/** A JSON-serialized object for a new inline keyboard. */
	reply_markup?: IInlineKeyboardMarkup;
}
	

/** Parameters for the sendVenue method */
export interface ISendVenueParams {
	/** Unique identifier for the target chat or username of the target channel (in the format @channelusername) */
	chat_id: number | string;
	/** Unique identifier for the target message thread (topic) of the forum; for forum supergroups only */
	message_thread_id?: number;
	/** Latitude of the venue */
	latitude: number;
	/** Longitude of the venue */
	longitude: number;
	/** Name of the venue */
	title: string;
	/** Address of the venue */
	address: string;
	/** Foursquare identifier of the venue */
	foursquare_id?: string;
	/** Foursquare type of the venue, if known. (For example, “arts_entertainment/default”, “arts_entertainment/aquarium” or “food/icecream”.) */
	foursquare_type?: string;
	/** Google Places identifier of the venue */
	google_place_id?: string;
	/** Google Places type of the venue. (See supported types.) */
	google_place_type?: string;
	/** Sends the message silently. Users will receive a notification with no sound. */
	disable_notification?: boolean;
	/** Protects the contents of the sent message from forwarding and saving */
	protect_content?: boolean;
	/** If the message is a reply, ID of the original message */
	reply_to_message_id?: number;
	/** Pass True if the message should be sent even if the specified replied-to message is not found */
	allow_sending_without_reply?: boolean;
	/** Additional interface options. A JSON-serialized object for an inline keyboard, custom reply keyboard, instructions to remove reply keyboard or to force a reply from the user. */
	reply_markup?: IInlineKeyboardMarkup | IReplyKeyboardMarkup | IReplyKeyboardRemove | IForceReply;
}
	

/** Parameters for the sendContact method */
export interface ISendContactParams {
	/** Unique identifier for the target chat or username of the target channel (in the format @channelusername) */
	chat_id: number | string;
	/** Unique identifier for the target message thread (topic) of the forum; for forum supergroups only */
	message_thread_id?: number;
	/** Contact's phone number */
	phone_number: string;
	/** Contact's first name */
	first_name: string;
	/** Contact's last name */
	last_name?: string;
	/** Additional data about the contact in the form of a vCard, 0-2048 bytes */
	vcard?: string;
	/** Sends the message silently. Users will receive a notification with no sound. */
	disable_notification?: boolean;
	/** Protects the contents of the sent message from forwarding and saving */
	protect_content?: boolean;
	/** If the message is a reply, ID of the original message */
	reply_to_message_id?: number;
	/** Pass True if the message should be sent even if the specified replied-to message is not found */
	allow_sending_without_reply?: boolean;
	/** Additional interface options. A JSON-serialized object for an inline keyboard, custom reply keyboard, instructions to remove reply keyboard or to force a reply from the user. */
	reply_markup?: IInlineKeyboardMarkup | IReplyKeyboardMarkup | IReplyKeyboardRemove | IForceReply;
}
	

/** Parameters for the sendPoll method */
export interface ISendPollParams {
	/** Unique identifier for the target chat or username of the target channel (in the format @channelusername) */
	chat_id: number | string;
	/** Unique identifier for the target message thread (topic) of the forum; for forum supergroups only */
	message_thread_id?: number;
	/** Poll question, 1-300 characters */
	question: string;
	/** A JSON-serialized list of answer options, 2-10 strings 1-100 characters each */
	options: string[];
	/** True, if the poll needs to be anonymous, defaults to True */
	is_anonymous?: boolean;
	/** Poll type, “quiz” or “regular”, defaults to “regular” */
	type?: string;
	/** True, if the poll allows multiple answers, ignored for polls in quiz mode, defaults to False */
	allows_multiple_answers?: boolean;
	/** 0-based identifier of the correct answer option, required for polls in quiz mode */
	correct_option_id?: number;
	/** Text that is shown when a user chooses an incorrect answer or taps on the lamp icon in a quiz-style poll, 0-200 characters with at most 2 line feeds after entities parsing */
	explanation?: string;
	/** Mode for parsing entities in the explanation. See formatting options for more details. */
	explanation_parse_mode?: string;
	/** A JSON-serialized list of special entities that appear in the poll explanation, which can be specified instead of parse_mode */
	explanation_entities?: IMessageEntity[];
	/** Amount of time in seconds the poll will be active after creation, 5-600. Can't be used together with close_date. */
	open_period?: number;
	/** Point in time (Unix timestamp) when the poll will be automatically closed. Must be at least 5 and no more than 600 seconds in the future. Can't be used together with open_period. */
	close_date?: number;
	/** Pass True if the poll needs to be immediately closed. This can be useful for poll preview. */
	is_closed?: boolean;
	/** Sends the message silently. Users will receive a notification with no sound. */
	disable_notification?: boolean;
	/** Protects the contents of the sent message from forwarding and saving */
	protect_content?: boolean;
	/** If the message is a reply, ID of the original message */
	reply_to_message_id?: number;
	/** Pass True if the message should be sent even if the specified replied-to message is not found */
	allow_sending_without_reply?: boolean;
	/** Additional interface options. A JSON-serialized object for an inline keyboard, custom reply keyboard, instructions to remove reply keyboard or to force a reply from the user. */
	reply_markup?: IInlineKeyboardMarkup | IReplyKeyboardMarkup | IReplyKeyboardRemove | IForceReply;
}
	

/** Parameters for the sendDice method */
export interface ISendDiceParams {
	/** Unique identifier for the target chat or username of the target channel (in the format @channelusername) */
	chat_id: number | string;
	/** Unique identifier for the target message thread (topic) of the forum; for forum supergroups only */
	message_thread_id?: number;
	/** Emoji on which the dice throw animation is based. Currently, must be one of “”, “”, “”, “”, “”, or “”. Dice can have values 1-6 for “”, “” and “”, values 1-5 for “” and “”, and values 1-64 for “”. Defaults to “” */
	emoji?: string;
	/** Sends the message silently. Users will receive a notification with no sound. */
	disable_notification?: boolean;
	/** Protects the contents of the sent message from forwarding */
	protect_content?: boolean;
	/** If the message is a reply, ID of the original message */
	reply_to_message_id?: number;
	/** Pass True if the message should be sent even if the specified replied-to message is not found */
	allow_sending_without_reply?: boolean;
	/** Additional interface options. A JSON-serialized object for an inline keyboard, custom reply keyboard, instructions to remove reply keyboard or to force a reply from the user. */
	reply_markup?: IInlineKeyboardMarkup | IReplyKeyboardMarkup | IReplyKeyboardRemove | IForceReply;
}
	
export type IChatActionType = "typing" | "upload_photo" | "record_video" | "upload_video" | "record_voice" | "upload_voice" | "upload_document" | "choose_sticker" | "find_location" | "record_video_note" | "upload_video_note"

/** Parameters for the sendChatAction method */
export interface ISendChatActionParams {
	/** Unique identifier for the target chat or username of the target channel (in the format @channelusername) */
	chat_id: number | string;
	/** Unique identifier for the target message thread; supergroups only */
	message_thread_id?: number;
	/** Type of action to broadcast. Choose one, depending on what the user is about to receive: typing for text messages, upload_photo for photos, record_video or upload_video for videos, record_voice or upload_voice for voice notes, upload_document for general files, choose_sticker for stickers, find_location for location data, record_video_note or upload_video_note for video notes. */
	action: IChatActionType;
}
	

/** Parameters for the getUserProfilePhotos method */
export interface IGetUserProfilePhotosParams {
	/** Unique identifier of the target user */
	user_id: number;
	/** Sequential number of the first photo to be returned. By default, all photos are returned. */
	offset?: number;
	/** Limits the number of photos to be retrieved. Values between 1-100 are accepted. Defaults to 100. */
	limit?: number;
}
	

/** Parameters for the getFile method */
export interface IGetFileParams {
	/** File identifier to get information about */
	file_id: string;
}
	

/** Parameters for the banChatMember method */
export interface IBanChatMemberParams {
	/** Unique identifier for the target group or username of the target supergroup or channel (in the format @channelusername) */
	chat_id: number | string;
	/** Unique identifier of the target user */
	user_id: number;
	/** Date when the user will be unbanned, unix time. If user is banned for more than 366 days or less than 30 seconds from the current time they are considered to be banned forever. Applied for supergroups and channels only. */
	until_date?: number;
	/** Pass True to delete all messages from the chat for the user that is being removed. If False, the user will be able to see messages in the group that were sent before the user was removed. Always True for supergroups and channels. */
	revoke_messages?: boolean;
}
	

/** Parameters for the unbanChatMember method */
export interface IUnbanChatMemberParams {
	/** Unique identifier for the target group or username of the target supergroup or channel (in the format @channelusername) */
	chat_id: number | string;
	/** Unique identifier of the target user */
	user_id: number;
	/** Do nothing if the user is not banned */
	only_if_banned?: boolean;
}
	

/** Parameters for the restrictChatMember method */
export interface IRestrictChatMemberParams {
	/** Unique identifier for the target chat or username of the target supergroup (in the format @supergroupusername) */
	chat_id: number | string;
	/** Unique identifier of the target user */
	user_id: number;
	/** A JSON-serialized object for new user permissions */
	permissions: IChatPermissions;
	/** Pass True if chat permissions are set independently. Otherwise, the can_send_other_messages and can_add_web_page_previews permissions will imply the can_send_messages, can_send_audios, can_send_documents, can_send_photos, can_send_videos, can_send_video_notes, and can_send_voice_notes permissions; the can_send_polls permission will imply the can_send_messages permission. */
	use_independent_chat_permissions?: boolean;
	/** Date when restrictions will be lifted for the user, unix time. If user is restricted for more than 366 days or less than 30 seconds from the current time, they are considered to be restricted forever */
	until_date?: number;
}
	

/** Parameters for the promoteChatMember method */
export interface IPromoteChatMemberParams {
	/** Unique identifier for the target chat or username of the target channel (in the format @channelusername) */
	chat_id: number | string;
	/** Unique identifier of the target user */
	user_id: number;
	/** Pass True if the administrator's presence in the chat is hidden */
	is_anonymous?: boolean;
	/** Pass True if the administrator can access the chat event log, chat statistics, message statistics in channels, see channel members, see anonymous administrators in supergroups and ignore slow mode. Implied by any other administrator privilege */
	can_manage_chat?: boolean;
	/** Pass True if the administrator can create channel posts, channels only */
	can_post_messages?: boolean;
	/** Pass True if the administrator can edit messages of other users and can pin messages, channels only */
	can_edit_messages?: boolean;
	/** Pass True if the administrator can delete messages of other users */
	can_delete_messages?: boolean;
	/** Pass True if the administrator can manage video chats */
	can_manage_video_chats?: boolean;
	/** Pass True if the administrator can restrict, ban or unban chat members */
	can_restrict_members?: boolean;
	/** Pass True if the administrator can add new administrators with a subset of their own privileges or demote administrators that they have promoted, directly or indirectly (promoted by administrators that were appointed by him) */
	can_promote_members?: boolean;
	/** Pass True if the administrator can change chat title, photo and other settings */
	can_change_info?: boolean;
	/** Pass True if the administrator can invite new users to the chat */
	can_invite_users?: boolean;
	/** Pass True if the administrator can pin messages, supergroups only */
	can_pin_messages?: boolean;
	/** Pass True if the user is allowed to create, rename, close, and reopen forum topics, supergroups only */
	can_manage_topics?: boolean;
}
	

/** Parameters for the setChatAdministratorCustomTitle method */
export interface ISetChatAdministratorCustomTitleParams {
	/** Unique identifier for the target chat or username of the target supergroup (in the format @supergroupusername) */
	chat_id: number | string;
	/** Unique identifier of the target user */
	user_id: number;
	/** New custom title for the administrator; 0-16 characters, emoji are not allowed */
	custom_title: string;
}
	

/** Parameters for the banChatSenderChat method */
export interface IBanChatSenderChatParams {
	/** Unique identifier for the target chat or username of the target channel (in the format @channelusername) */
	chat_id: number | string;
	/** Unique identifier of the target sender chat */
	sender_chat_id: number;
}
	

/** Parameters for the unbanChatSenderChat method */
export interface IUnbanChatSenderChatParams {
	/** Unique identifier for the target chat or username of the target channel (in the format @channelusername) */
	chat_id: number | string;
	/** Unique identifier of the target sender chat */
	sender_chat_id: number;
}
	

/** Parameters for the setChatPermissions method */
export interface ISetChatPermissionsParams {
	/** Unique identifier for the target chat or username of the target supergroup (in the format @supergroupusername) */
	chat_id: number | string;
	/** A JSON-serialized object for new default chat permissions */
	permissions: IChatPermissions;
	/** Pass True if chat permissions are set independently. Otherwise, the can_send_other_messages and can_add_web_page_previews permissions will imply the can_send_messages, can_send_audios, can_send_documents, can_send_photos, can_send_videos, can_send_video_notes, and can_send_voice_notes permissions; the can_send_polls permission will imply the can_send_messages permission. */
	use_independent_chat_permissions?: boolean;
}
	

/** Parameters for the exportChatInviteLink method */
export interface IExportChatInviteLinkParams {
	/** Unique identifier for the target chat or username of the target channel (in the format @channelusername) */
	chat_id: number | string;
}
	

/** Parameters for the createChatInviteLink method */
export interface ICreateChatInviteLinkParams {
	/** Unique identifier for the target chat or username of the target channel (in the format @channelusername) */
	chat_id: number | string;
	/** Invite link name; 0-32 characters */
	name?: string;
	/** Point in time (Unix timestamp) when the link will expire */
	expire_date?: number;
	/** The maximum number of users that can be members of the chat simultaneously after joining the chat via this invite link; 1-99999 */
	member_limit?: number;
	/** True, if users joining the chat via the link need to be approved by chat administrators. If True, member_limit can't be specified */
	creates_join_request?: boolean;
}
	

/** Parameters for the editChatInviteLink method */
export interface IEditChatInviteLinkParams {
	/** Unique identifier for the target chat or username of the target channel (in the format @channelusername) */
	chat_id: number | string;
	/** The invite link to edit */
	invite_link: string;
	/** Invite link name; 0-32 characters */
	name?: string;
	/** Point in time (Unix timestamp) when the link will expire */
	expire_date?: number;
	/** The maximum number of users that can be members of the chat simultaneously after joining the chat via this invite link; 1-99999 */
	member_limit?: number;
	/** True, if users joining the chat via the link need to be approved by chat administrators. If True, member_limit can't be specified */
	creates_join_request?: boolean;
}
	

/** Parameters for the revokeChatInviteLink method */
export interface IRevokeChatInviteLinkParams {
	/** Unique identifier of the target chat or username of the target channel (in the format @channelusername) */
	chat_id: number | string;
	/** The invite link to revoke */
	invite_link: string;
}
	

/** Parameters for the approveChatJoinRequest method */
export interface IApproveChatJoinRequestParams {
	/** Unique identifier for the target chat or username of the target channel (in the format @channelusername) */
	chat_id: number | string;
	/** Unique identifier of the target user */
	user_id: number;
}
	

/** Parameters for the declineChatJoinRequest method */
export interface IDeclineChatJoinRequestParams {
	/** Unique identifier for the target chat or username of the target channel (in the format @channelusername) */
	chat_id: number | string;
	/** Unique identifier of the target user */
	user_id: number;
}
	

/** Parameters for the setChatPhoto method */
export interface ISetChatPhotoParams {
	/** Unique identifier for the target chat or username of the target channel (in the format @channelusername) */
	chat_id: number | string;
	/** New chat photo, uploaded using multipart/form-data */
	photo: IInputFile;
}
	

/** Parameters for the deleteChatPhoto method */
export interface IDeleteChatPhotoParams {
	/** Unique identifier for the target chat or username of the target channel (in the format @channelusername) */
	chat_id: number | string;
}
	

/** Parameters for the setChatTitle method */
export interface ISetChatTitleParams {
	/** Unique identifier for the target chat or username of the target channel (in the format @channelusername) */
	chat_id: number | string;
	/** New chat title, 1-128 characters */
	title: string;
}
	

/** Parameters for the setChatDescription method */
export interface ISetChatDescriptionParams {
	/** Unique identifier for the target chat or username of the target channel (in the format @channelusername) */
	chat_id: number | string;
	/** New chat description, 0-255 characters */
	description?: string;
}
	

/** Parameters for the pinChatMessage method */
export interface IPinChatMessageParams {
	/** Unique identifier for the target chat or username of the target channel (in the format @channelusername) */
	chat_id: number | string;
	/** Identifier of a message to pin */
	message_id: number;
	/** Pass True if it is not necessary to send a notification to all chat members about the new pinned message. Notifications are always disabled in channels and private chats. */
	disable_notification?: boolean;
}
	

/** Parameters for the unpinChatMessage method */
export interface IUnpinChatMessageParams {
	/** Unique identifier for the target chat or username of the target channel (in the format @channelusername) */
	chat_id: number | string;
	/** Identifier of a message to unpin. If not specified, the most recent pinned message (by sending date) will be unpinned. */
	message_id?: number;
}
	

/** Parameters for the unpinAllChatMessages method */
export interface IUnpinAllChatMessagesParams {
	/** Unique identifier for the target chat or username of the target channel (in the format @channelusername) */
	chat_id: number | string;
}
	

/** Parameters for the leaveChat method */
export interface ILeaveChatParams {
	/** Unique identifier for the target chat or username of the target supergroup or channel (in the format @channelusername) */
	chat_id: number | string;
}
	

/** Parameters for the getChat method */
export interface IGetChatParams {
	/** Unique identifier for the target chat or username of the target supergroup or channel (in the format @channelusername) */
	chat_id: number | string;
}
	

/** Parameters for the getChatAdministrators method */
export interface IGetChatAdministratorsParams {
	/** Unique identifier for the target chat or username of the target supergroup or channel (in the format @channelusername) */
	chat_id: number | string;
}
	

/** Parameters for the getChatMemberCount method */
export interface IGetChatMemberCountParams {
	/** Unique identifier for the target chat or username of the target supergroup or channel (in the format @channelusername) */
	chat_id: number | string;
}
	

/** Parameters for the getChatMember method */
export interface IGetChatMemberParams {
	/** Unique identifier for the target chat or username of the target supergroup or channel (in the format @channelusername) */
	chat_id: number | string;
	/** Unique identifier of the target user */
	user_id: number;
}
	

/** Parameters for the setChatStickerSet method */
export interface ISetChatStickerSetParams {
	/** Unique identifier for the target chat or username of the target supergroup (in the format @supergroupusername) */
	chat_id: number | string;
	/** Name of the sticker set to be set as the group sticker set */
	sticker_set_name: string;
}
	

/** Parameters for the deleteChatStickerSet method */
export interface IDeleteChatStickerSetParams {
	/** Unique identifier for the target chat or username of the target supergroup (in the format @supergroupusername) */
	chat_id: number | string;
}
	

/** Parameters for the getForumTopicIconStickers method */
export interface IGetForumTopicIconStickersParams {

}
	

/** Parameters for the createForumTopic method */
export interface ICreateForumTopicParams {
	/** Unique identifier for the target chat or username of the target supergroup (in the format @supergroupusername) */
	chat_id: number | string;
	/** Topic name, 1-128 characters */
	name: string;
	/** Color of the topic icon in RGB format. Currently, must be one of 7322096 (0x6FB9F0), 16766590 (0xFFD67E), 13338331 (0xCB86DB), 9367192 (0x8EEE98), 16749490 (0xFF93B2), or 16478047 (0xFB6F5F) */
	icon_color?: number;
	/** Unique identifier of the custom emoji shown as the topic icon. Use getForumTopicIconStickers to get all allowed custom emoji identifiers. */
	icon_custom_emoji_id?: string;
}
	

/** Parameters for the editForumTopic method */
export interface IEditForumTopicParams {
	/** Unique identifier for the target chat or username of the target supergroup (in the format @supergroupusername) */
	chat_id: number | string;
	/** Unique identifier for the target message thread of the forum topic */
	message_thread_id: number;
	/** New topic name, 0-128 characters. If not specified or empty, the current name of the topic will be kept */
	name?: string;
	/** New unique identifier of the custom emoji shown as the topic icon. Use getForumTopicIconStickers to get all allowed custom emoji identifiers. Pass an empty string to remove the icon. If not specified, the current icon will be kept */
	icon_custom_emoji_id?: string;
}
	

/** Parameters for the closeForumTopic method */
export interface ICloseForumTopicParams {
	/** Unique identifier for the target chat or username of the target supergroup (in the format @supergroupusername) */
	chat_id: number | string;
	/** Unique identifier for the target message thread of the forum topic */
	message_thread_id: number;
}
	

/** Parameters for the reopenForumTopic method */
export interface IReopenForumTopicParams {
	/** Unique identifier for the target chat or username of the target supergroup (in the format @supergroupusername) */
	chat_id: number | string;
	/** Unique identifier for the target message thread of the forum topic */
	message_thread_id: number;
}
	

/** Parameters for the deleteForumTopic method */
export interface IDeleteForumTopicParams {
	/** Unique identifier for the target chat or username of the target supergroup (in the format @supergroupusername) */
	chat_id: number | string;
	/** Unique identifier for the target message thread of the forum topic */
	message_thread_id: number;
}
	

/** Parameters for the unpinAllForumTopicMessages method */
export interface IUnpinAllForumTopicMessagesParams {
	/** Unique identifier for the target chat or username of the target supergroup (in the format @supergroupusername) */
	chat_id: number | string;
	/** Unique identifier for the target message thread of the forum topic */
	message_thread_id: number;
}
	

/** Parameters for the editGeneralForumTopic method */
export interface IEditGeneralForumTopicParams {
	/** Unique identifier for the target chat or username of the target supergroup (in the format @supergroupusername) */
	chat_id: number | string;
	/** New topic name, 1-128 characters */
	name: string;
}
	

/** Parameters for the closeGeneralForumTopic method */
export interface ICloseGeneralForumTopicParams {
	/** Unique identifier for the target chat or username of the target supergroup (in the format @supergroupusername) */
	chat_id: number | string;
}
	

/** Parameters for the reopenGeneralForumTopic method */
export interface IReopenGeneralForumTopicParams {
	/** Unique identifier for the target chat or username of the target supergroup (in the format @supergroupusername) */
	chat_id: number | string;
}
	

/** Parameters for the hideGeneralForumTopic method */
export interface IHideGeneralForumTopicParams {
	/** Unique identifier for the target chat or username of the target supergroup (in the format @supergroupusername) */
	chat_id: number | string;
}
	

/** Parameters for the unhideGeneralForumTopic method */
export interface IUnhideGeneralForumTopicParams {
	/** Unique identifier for the target chat or username of the target supergroup (in the format @supergroupusername) */
	chat_id: number | string;
}
	

/** Parameters for the answerCallbackQuery method */
export interface IAnswerCallbackQueryParams {
	/** Unique identifier for the query to be answered */
	callback_query_id: string;
	/** Text of the notification. If not specified, nothing will be shown to the user, 0-200 characters */
	text?: string;
	/** If True, an alert will be shown by the client instead of a notification at the top of the chat screen. Defaults to false. */
	show_alert?: boolean;
	/** URL that will be opened by the user's client. If you have created a Game and accepted the conditions via @BotFather, specify the URL that opens your game - note that this will only work if the query comes from a callback_game button.Otherwise, you may use links like t.me/your_bot?start=XXXX that open your bot with a parameter. */
	url?: string;
	/** The maximum amount of time in seconds that the result of the callback query may be cached client-side. Telegram apps will support caching starting in version 3.14. Defaults to 0. */
	cache_time?: number;
}
	

/** Parameters for the setMyCommands method */
export interface ISetMyCommandsParams {
	/** A JSON-serialized list of bot commands to be set as the list of the bot's commands. At most 100 commands can be specified. */
	commands: IBotCommand[];
	/** A JSON-serialized object, describing scope of users for which the commands are relevant. Defaults to BotCommandScopeDefault. */
	scope?: IBotCommandScope;
	/** A two-letter ISO 639-1 language code. If empty, commands will be applied to all users from the given scope, for whose language there are no dedicated commands */
	language_code?: string;
}
	

/** Parameters for the deleteMyCommands method */
export interface IDeleteMyCommandsParams {
	/** A JSON-serialized object, describing scope of users for which the commands are relevant. Defaults to BotCommandScopeDefault. */
	scope?: IBotCommandScope;
	/** A two-letter ISO 639-1 language code. If empty, commands will be applied to all users from the given scope, for whose language there are no dedicated commands */
	language_code?: string;
}
	

/** Parameters for the getMyCommands method */
export interface IGetMyCommandsParams {
	/** A JSON-serialized object, describing scope of users. Defaults to BotCommandScopeDefault. */
	scope?: IBotCommandScope;
	/** A two-letter ISO 639-1 language code or an empty string */
	language_code?: string;
}
	

/** Parameters for the setChatMenuButton method */
export interface ISetChatMenuButtonParams {
	/** Unique identifier for the target private chat. If not specified, default bot's menu button will be changed */
	chat_id?: number;
	/** A JSON-serialized object for the bot's new menu button. Defaults to MenuButtonDefault */
	menu_button?: IMenuButton;
}
	

/** Parameters for the getChatMenuButton method */
export interface IGetChatMenuButtonParams {
	/** Unique identifier for the target private chat. If not specified, default bot's menu button will be returned */
	chat_id?: number;
}
	

/** Parameters for the setMyDefaultAdministratorRights method */
export interface ISetMyDefaultAdministratorRightsParams {
	/** A JSON-serialized object describing new default administrator rights. If not specified, the default administrator rights will be cleared. */
	rights?: IChatAdministratorRights;
	/** Pass True to change the default administrator rights of the bot in channels. Otherwise, the default administrator rights of the bot for groups and supergroups will be changed. */
	for_channels?: boolean;
}
	

/** Parameters for the getMyDefaultAdministratorRights method */
export interface IGetMyDefaultAdministratorRightsParams {
	/** Pass True to get default administrator rights of the bot in channels. Otherwise, default administrator rights of the bot for groups and supergroups will be returned. */
	for_channels?: boolean;
}
	

/** Parameters for the editMessageText method */
export interface IEditMessageTextParams {
	/** Required if inline_message_id is not specified. Unique identifier for the target chat or username of the target channel (in the format @channelusername) */
	chat_id?: number | string;
	/** Required if inline_message_id is not specified. Identifier of the message to edit */
	message_id?: number;
	/** Required if chat_id and message_id are not specified. Identifier of the inline message */
	inline_message_id?: string;
	/** New text of the message, 1-4096 characters after entities parsing */
	text: string;
	/** Mode for parsing entities in the message text. See formatting options for more details. */
	parse_mode?: string;
	/** A JSON-serialized list of special entities that appear in message text, which can be specified instead of parse_mode */
	entities?: IMessageEntity[];
	/** Disables link previews for links in this message */
	disable_web_page_preview?: boolean;
	/** A JSON-serialized object for an inline keyboard. */
	reply_markup?: IInlineKeyboardMarkup;
}
	

/** Parameters for the editMessageCaption method */
export interface IEditMessageCaptionParams {
	/** Required if inline_message_id is not specified. Unique identifier for the target chat or username of the target channel (in the format @channelusername) */
	chat_id?: number | string;
	/** Required if inline_message_id is not specified. Identifier of the message to edit */
	message_id?: number;
	/** Required if chat_id and message_id are not specified. Identifier of the inline message */
	inline_message_id?: string;
	/** New caption of the message, 0-1024 characters after entities parsing */
	caption?: string;
	/** Mode for parsing entities in the message caption. See formatting options for more details. */
	parse_mode?: string;
	/** A JSON-serialized list of special entities that appear in the caption, which can be specified instead of parse_mode */
	caption_entities?: IMessageEntity[];
	/** A JSON-serialized object for an inline keyboard. */
	reply_markup?: IInlineKeyboardMarkup;
}
	

/** Parameters for the editMessageMedia method */
export interface IEditMessageMediaParams {
	/** Required if inline_message_id is not specified. Unique identifier for the target chat or username of the target channel (in the format @channelusername) */
	chat_id?: number | string;
	/** Required if inline_message_id is not specified. Identifier of the message to edit */
	message_id?: number;
	/** Required if chat_id and message_id are not specified. Identifier of the inline message */
	inline_message_id?: string;
	/** A JSON-serialized object for a new media content of the message */
	media: IInputMedia;
	/** A JSON-serialized object for a new inline keyboard. */
	reply_markup?: IInlineKeyboardMarkup;
}
	

/** Parameters for the editMessageReplyMarkup method */
export interface IEditMessageReplyMarkupParams {
	/** Required if inline_message_id is not specified. Unique identifier for the target chat or username of the target channel (in the format @channelusername) */
	chat_id?: number | string;
	/** Required if inline_message_id is not specified. Identifier of the message to edit */
	message_id?: number;
	/** Required if chat_id and message_id are not specified. Identifier of the inline message */
	inline_message_id?: string;
	/** A JSON-serialized object for an inline keyboard. */
	reply_markup?: IInlineKeyboardMarkup;
}
	

/** Parameters for the stopPoll method */
export interface IStopPollParams {
	/** Unique identifier for the target chat or username of the target channel (in the format @channelusername) */
	chat_id: number | string;
	/** Identifier of the original message with the poll */
	message_id: number;
	/** A JSON-serialized object for a new message inline keyboard. */
	reply_markup?: IInlineKeyboardMarkup;
}
	

/** Parameters for the deleteMessage method */
export interface IDeleteMessageParams {
	/** Unique identifier for the target chat or username of the target channel (in the format @channelusername) */
	chat_id: number | string;
	/** Identifier of the message to delete */
	message_id: number;
}
	

/** This object represents a sticker. */
export interface ISticker {
	/** Identifier for this file, which can be used to download or reuse the file */
	file_id: string;
	/** Unique identifier for this file, which is supposed to be the same over time and for different bots. Can't be used to download or reuse the file. */
	file_unique_id: string;
	/** Type of the sticker, currently one of “regular”, “mask”, “custom_emoji”. The type of the sticker is independent from its format, which is determined by the fields is_animated and is_video. */
	type: "regular" | "mask" | "custom_emoji";
	/** Sticker width */
	width: number;
	/** Sticker height */
	height: number;
	/** True, if the sticker is animated */
	is_animated: boolean;
	/** True, if the sticker is a video sticker */
	is_video: boolean;
	/** Optional. Sticker thumbnail in the .WEBP or .JPG format */
	thumb?: IPhotoSize;
	/** Optional. Emoji associated with the sticker */
	emoji?: string;
	/** Optional. Name of the sticker set to which the sticker belongs */
	set_name?: string;
	/** Optional. For premium regular stickers, premium animation for the sticker */
	premium_animation?: IFile;
	/** Optional. For mask stickers, the position where the mask should be placed */
	mask_position?: IMaskPosition;
	/** Optional. For custom emoji stickers, unique identifier of the custom emoji */
	custom_emoji_id?: string;
	/** Optional. File size in bytes */
	file_size?: number;
}
	

/** This object represents a sticker set. */
export interface IStickerSet {
	/** Sticker set name */
	name: string;
	/** Sticker set title */
	title: string;
	/** Type of stickers in the set, currently one of “regular”, “mask”, “custom_emoji” */
	sticker_type: "regular" | "mask" | "custom_emoji";
	/** True, if the sticker set contains animated stickers */
	is_animated: boolean;
	/** True, if the sticker set contains video stickers */
	is_video: boolean;
	/** List of all set stickers */
	stickers: ISticker[];
	/** Optional. Sticker set thumbnail in the .WEBP, .TGS, or .WEBM format */
	thumb?: IPhotoSize;
}
	

/** This object describes the position on faces where a mask should be placed by default. */
export interface IMaskPosition {
	/** The part of the face relative to which the mask should be placed. One of “forehead”, “eyes”, “mouth”, or “chin”. */
	point: "forehead" | "eyes" | "mouth" | "chin";
	/** Shift by X-axis measured in widths of the mask scaled to the face size, from left to right. For example, choosing -1.0 will place mask just to the left of the default mask position. */
	x_shift: number;
	/** Shift by Y-axis measured in heights of the mask scaled to the face size, from top to bottom. For example, 1.0 will place the mask just below the default mask position. */
	y_shift: number;
	/** Mask scaling coefficient. For example, 2.0 means double size. */
	scale: number;
}
	

/** Parameters for the sendSticker method */
export interface ISendStickerParams {
	/** Unique identifier for the target chat or username of the target channel (in the format @channelusername) */
	chat_id: number | string;
	/** Unique identifier for the target message thread (topic) of the forum; for forum supergroups only */
	message_thread_id?: number;
	/** Sticker to send. Pass a file_id as String to send a file that exists on the Telegram servers (recommended), pass an HTTP URL as a String for Telegram to get a .WEBP file from the Internet, or upload a new one using multipart/form-data. */
	sticker: IInputFile | string;
	/** Sends the message silently. Users will receive a notification with no sound. */
	disable_notification?: boolean;
	/** Protects the contents of the sent message from forwarding and saving */
	protect_content?: boolean;
	/** If the message is a reply, ID of the original message */
	reply_to_message_id?: number;
	/** Pass True if the message should be sent even if the specified replied-to message is not found */
	allow_sending_without_reply?: boolean;
	/** Additional interface options. A JSON-serialized object for an inline keyboard, custom reply keyboard, instructions to remove reply keyboard or to force a reply from the user. */
	reply_markup?: IInlineKeyboardMarkup | IReplyKeyboardMarkup | IReplyKeyboardRemove | IForceReply;
}
	

/** Parameters for the getStickerSet method */
export interface IGetStickerSetParams {
	/** Name of the sticker set */
	name: string;
}
	

/** Parameters for the getCustomEmojiStickers method */
export interface IGetCustomEmojiStickersParams {
	/** List of custom emoji identifiers. At most 200 custom emoji identifiers can be specified. */
	custom_emoji_ids: string[];
}
	

/** Parameters for the uploadStickerFile method */
export interface IUploadStickerFileParams {
	/** User identifier of sticker file owner */
	user_id: number;
	/** PNG image with the sticker, must be up to 512 kilobytes in size, dimensions must not exceed 512px, and either width or height must be exactly 512px. */
	png_sticker: IInputFile;
}
	

/** Parameters for the createNewStickerSet method */
export interface ICreateNewStickerSetParams {
	/** User identifier of created sticker set owner */
	user_id: number;
	/** Short name of sticker set, to be used in t.me/addstickers/ URLs (e.g., animals). Can contain only English letters, digits and underscores. Must begin with a letter, can't contain consecutive underscores and must end in "_by_<bot_username>". <bot_username> is case insensitive. 1-64 characters. */
	name: string;
	/** Sticker set title, 1-64 characters */
	title: string;
	/** PNG image with the sticker, must be up to 512 kilobytes in size, dimensions must not exceed 512px, and either width or height must be exactly 512px. Pass a file_id as a String to send a file that already exists on the Telegram servers, pass an HTTP URL as a String for Telegram to get a file from the Internet, or upload a new one using multipart/form-data. */
	png_sticker?: IInputFile | string;
	/** TGS animation with the sticker, uploaded using multipart/form-data. See https://core.telegram.org/stickers#animated-sticker-requirements for technical requirements */
	tgs_sticker?: IInputFile;
	/** WEBM video with the sticker, uploaded using multipart/form-data. See https://core.telegram.org/stickers#video-sticker-requirements for technical requirements */
	webm_sticker?: IInputFile;
	/** Type of stickers in the set, pass “regular” or “mask”. Custom emoji sticker sets can't be created via the Bot API at the moment. By default, a regular sticker set is created. */
	sticker_type?: string;
	/** One or more emoji corresponding to the sticker */
	emojis: string;
	/** A JSON-serialized object for position where the mask should be placed on faces */
	mask_position?: IMaskPosition;
}
	

/** Parameters for the addStickerToSet method */
export interface IAddStickerToSetParams {
	/** User identifier of sticker set owner */
	user_id: number;
	/** Sticker set name */
	name: string;
	/** PNG image with the sticker, must be up to 512 kilobytes in size, dimensions must not exceed 512px, and either width or height must be exactly 512px. Pass a file_id as a String to send a file that already exists on the Telegram servers, pass an HTTP URL as a String for Telegram to get a file from the Internet, or upload a new one using multipart/form-data. */
	png_sticker?: IInputFile | string;
	/** TGS animation with the sticker, uploaded using multipart/form-data. See https://core.telegram.org/stickers#animated-sticker-requirements for technical requirements */
	tgs_sticker?: IInputFile;
	/** WEBM video with the sticker, uploaded using multipart/form-data. See https://core.telegram.org/stickers#video-sticker-requirements for technical requirements */
	webm_sticker?: IInputFile;
	/** One or more emoji corresponding to the sticker */
	emojis: string;
	/** A JSON-serialized object for position where the mask should be placed on faces */
	mask_position?: IMaskPosition;
}
	

/** Parameters for the setStickerPositionInSet method */
export interface ISetStickerPositionInSetParams {
	/** File identifier of the sticker */
	sticker: string;
	/** New sticker position in the set, zero-based */
	position: number;
}
	

/** Parameters for the deleteStickerFromSet method */
export interface IDeleteStickerFromSetParams {
	/** File identifier of the sticker */
	sticker: string;
}
	

/** Parameters for the setStickerSetThumb method */
export interface ISetStickerSetThumbParams {
	/** Sticker set name */
	name: string;
	/** User identifier of the sticker set owner */
	user_id: number;
	/** A PNG image with the thumbnail, must be up to 128 kilobytes in size and have width and height exactly 100px, or a TGS animation with the thumbnail up to 32 kilobytes in size; see https://core.telegram.org/stickers#animated-sticker-requirements for animated sticker technical requirements, or a WEBM video with the thumbnail up to 32 kilobytes in size; see https://core.telegram.org/stickers#video-sticker-requirements for video sticker technical requirements. Pass a file_id as a String to send a file that already exists on the Telegram servers, pass an HTTP URL as a String for Telegram to get a file from the Internet, or upload a new one using multipart/form-data. Animated sticker set thumbnails can't be uploaded via HTTP URL. */
	thumb?: IInputFile | string;
}
	

/** This object represents an incoming inline query. When the user sends an empty query, your bot could return some default or trending results. */
export interface IInlineQuery {
	/** Unique identifier for this query */
	id: string;
	/** Sender */
	from: IUser;
	/** Text of the query (up to 256 characters) */
	query: string;
	/** Offset of the results to be returned, can be controlled by the bot */
	offset: string;
	/** Optional. Type of the chat from which the inline query was sent. Can be either “sender” for a private chat with the inline query sender, “private”, “group”, “supergroup”, or “channel”. The chat type should be always known for requests sent from official clients and most third-party clients, unless the request was sent from a secret chat */
	chat_type?: "sender" | "private" | "group" | "supergroup" | "channel"
	/** Optional. Sender location, only for bots that request user location */
	location?: ILocation;
}
	

/** Parameters for the answerInlineQuery method */
export interface IAnswerInlineQueryParams {
	/** Unique identifier for the answered query */
	inline_query_id: string;
	/** A JSON-serialized array of results for the inline query */
	results: IInlineQueryResult[];
	/** The maximum amount of time in seconds that the result of the inline query may be cached on the server. Defaults to 300. */
	cache_time?: number;
	/** Pass True if results may be cached on the server side only for the user that sent the query. By default, results may be returned to any user who sends the same query */
	is_personal?: boolean;
	/** Pass the offset that a client should send in the next query with the same text to receive more results. Pass an empty string if there are no more results or if you don't support pagination. Offset length can't exceed 64 bytes. */
	next_offset?: string;
	/** If passed, clients will display a button with specified text that switches the user to a private chat with the bot and sends the bot a start message with the parameter switch_pm_parameter */
	switch_pm_text?: string;
	/** Deep-linking parameter for the /start message sent to the bot when user presses the switch button. 1-64 characters, only A-Z, a-z, 0-9, _ and - are allowed.Example: An inline bot that sends YouTube videos can ask the user to connect the bot to their YouTube account to adapt search results accordingly. To do this, it displays a 'Connect your YouTube account' button above the results, or even before showing any. The user presses the button, switches to a private chat with the bot and, in doing so, passes a start parameter that instructs the bot to return an OAuth link. Once done, the bot can offer a switch_inline button so that the user can easily return to the chat where they wanted to use the bot's inline capabilities. */
	switch_pm_parameter?: string;
}
	

/** This object represents one result of an inline query.
 * 
 * Note: All URLs passed in inline query results will be available to end users and therefore must be assumed to be public. */
export type IInlineQueryResult = IInlineQueryResultCachedAudio | IInlineQueryResultCachedDocument | IInlineQueryResultCachedGif | IInlineQueryResultCachedMpeg4Gif | IInlineQueryResultCachedPhoto | IInlineQueryResultCachedSticker | IInlineQueryResultCachedVideo | IInlineQueryResultCachedVoice | IInlineQueryResultArticle | IInlineQueryResultAudio | IInlineQueryResultContact | IInlineQueryResultGame | IInlineQueryResultDocument | IInlineQueryResultGif | IInlineQueryResultLocation | IInlineQueryResultMpeg4Gif | IInlineQueryResultPhoto | IInlineQueryResultVenue | IInlineQueryResultVideo | IInlineQueryResultVoice;
	

/** Represents a link to an article or web page. */
export interface IInlineQueryResultArticle {
	/** Type of the result, must be article */
	type: string;
	/** Unique identifier for this result, 1-64 Bytes */
	id: string;
	/** Title of the result */
	title: string;
	/** Content of the message to be sent */
	input_message_content: IInputMessageContent;
	/** Optional. Inline keyboard attached to the message */
	reply_markup?: IInlineKeyboardMarkup;
	/** Optional. URL of the result */
	url?: string;
	/** Optional. Pass True if you don't want the URL to be shown in the message */
	hide_url?: boolean;
	/** Optional. Short description of the result */
	description?: string;
	/** Optional. Url of the thumbnail for the result */
	thumb_url?: string;
	/** Optional. Thumbnail width */
	thumb_width?: number;
	/** Optional. Thumbnail height */
	thumb_height?: number;
}
	

/** Represents a link to a photo. By default, this photo will be sent by the user with optional caption. Alternatively, you can use input_message_content to send a message with the specified content instead of the photo. */
export interface IInlineQueryResultPhoto {
	/** Type of the result, must be photo */
	type: string;
	/** Unique identifier for this result, 1-64 bytes */
	id: string;
	/** A valid URL of the photo. Photo must be in JPEG format. Photo size must not exceed 5MB */
	photo_url: string;
	/** URL of the thumbnail for the photo */
	thumb_url: string;
	/** Optional. Width of the photo */
	photo_width?: number;
	/** Optional. Height of the photo */
	photo_height?: number;
	/** Optional. Title for the result */
	title?: string;
	/** Optional. Short description of the result */
	description?: string;
	/** Optional. Caption of the photo to be sent, 0-1024 characters after entities parsing */
	caption?: string;
	/** Optional. Mode for parsing entities in the photo caption. See formatting options for more details. */
	parse_mode?: string;
	/** Optional. List of special entities that appear in the caption, which can be specified instead of parse_mode */
	caption_entities?: IMessageEntity[];
	/** Optional. Inline keyboard attached to the message */
	reply_markup?: IInlineKeyboardMarkup;
	/** Optional. Content of the message to be sent instead of the photo */
	input_message_content?: IInputMessageContent;
}
	

/** Represents a link to an animated GIF file. By default, this animated GIF file will be sent by the user with optional caption. Alternatively, you can use input_message_content to send a message with the specified content instead of the animation. */
export interface IInlineQueryResultGif {
	/** Type of the result, must be gif */
	type: string;
	/** Unique identifier for this result, 1-64 bytes */
	id: string;
	/** A valid URL for the GIF file. File size must not exceed 1MB */
	gif_url: string;
	/** Optional. Width of the GIF */
	gif_width?: number;
	/** Optional. Height of the GIF */
	gif_height?: number;
	/** Optional. Duration of the GIF in seconds */
	gif_duration?: number;
	/** URL of the static (JPEG or GIF) or animated (MPEG4) thumbnail for the result */
	thumb_url: string;
	/** Optional. MIME type of the thumbnail, must be one of “image/jpeg”, “image/gif”, or “video/mp4”. Defaults to “image/jpeg” */
	thumb_mime_type?: string;
	/** Optional. Title for the result */
	title?: string;
	/** Optional. Caption of the GIF file to be sent, 0-1024 characters after entities parsing */
	caption?: string;
	/** Optional. Mode for parsing entities in the caption. See formatting options for more details. */
	parse_mode?: string;
	/** Optional. List of special entities that appear in the caption, which can be specified instead of parse_mode */
	caption_entities?: IMessageEntity[];
	/** Optional. Inline keyboard attached to the message */
	reply_markup?: IInlineKeyboardMarkup;
	/** Optional. Content of the message to be sent instead of the GIF animation */
	input_message_content?: IInputMessageContent;
}
	

/** Represents a link to a video animation (H.264/MPEG-4 AVC video without sound). By default, this animated MPEG-4 file will be sent by the user with optional caption. Alternatively, you can use input_message_content to send a message with the specified content instead of the animation. */
export interface IInlineQueryResultMpeg4Gif {
	/** Type of the result, must be mpeg4_gif */
	type: string;
	/** Unique identifier for this result, 1-64 bytes */
	id: string;
	/** A valid URL for the MPEG4 file. File size must not exceed 1MB */
	mpeg4_url: string;
	/** Optional. Video width */
	mpeg4_width?: number;
	/** Optional. Video height */
	mpeg4_height?: number;
	/** Optional. Video duration in seconds */
	mpeg4_duration?: number;
	/** URL of the static (JPEG or GIF) or animated (MPEG4) thumbnail for the result */
	thumb_url: string;
	/** Optional. MIME type of the thumbnail, must be one of “image/jpeg”, “image/gif”, or “video/mp4”. Defaults to “image/jpeg” */
	thumb_mime_type?: string;
	/** Optional. Title for the result */
	title?: string;
	/** Optional. Caption of the MPEG-4 file to be sent, 0-1024 characters after entities parsing */
	caption?: string;
	/** Optional. Mode for parsing entities in the caption. See formatting options for more details. */
	parse_mode?: string;
	/** Optional. List of special entities that appear in the caption, which can be specified instead of parse_mode */
	caption_entities?: IMessageEntity[];
	/** Optional. Inline keyboard attached to the message */
	reply_markup?: IInlineKeyboardMarkup;
	/** Optional. Content of the message to be sent instead of the video animation */
	input_message_content?: IInputMessageContent;
}
	

/** Represents a link to a page containing an embedded video player or a video file. By default, this video file will be sent by the user with an optional caption. Alternatively, you can use input_message_content to send a message with the specified content instead of the video. */
export interface IInlineQueryResultVideo {
	/** Type of the result, must be video */
	type: string;
	/** Unique identifier for this result, 1-64 bytes */
	id: string;
	/** A valid URL for the embedded video player or video file */
	video_url: string;
	/** MIME type of the content of the video URL, “text/html” or “video/mp4” */
	mime_type: string;
	/** URL of the thumbnail (JPEG only) for the video */
	thumb_url: string;
	/** Title for the result */
	title: string;
	/** Optional. Caption of the video to be sent, 0-1024 characters after entities parsing */
	caption?: string;
	/** Optional. Mode for parsing entities in the video caption. See formatting options for more details. */
	parse_mode?: string;
	/** Optional. List of special entities that appear in the caption, which can be specified instead of parse_mode */
	caption_entities?: IMessageEntity[];
	/** Optional. Video width */
	video_width?: number;
	/** Optional. Video height */
	video_height?: number;
	/** Optional. Video duration in seconds */
	video_duration?: number;
	/** Optional. Short description of the result */
	description?: string;
	/** Optional. Inline keyboard attached to the message */
	reply_markup?: IInlineKeyboardMarkup;
	/** Optional. Content of the message to be sent instead of the video. This field is required if InlineQueryResultVideo is used to send an HTML-page as a result (e.g., a YouTube video). */
	input_message_content?: IInputMessageContent;
}
	

/** Represents a link to an MP3 audio file. By default, this audio file will be sent by the user. Alternatively, you can use input_message_content to send a message with the specified content instead of the audio. */
export interface IInlineQueryResultAudio {
	/** Type of the result, must be audio */
	type: string;
	/** Unique identifier for this result, 1-64 bytes */
	id: string;
	/** A valid URL for the audio file */
	audio_url: string;
	/** Title */
	title: string;
	/** Optional. Caption, 0-1024 characters after entities parsing */
	caption?: string;
	/** Optional. Mode for parsing entities in the audio caption. See formatting options for more details. */
	parse_mode?: string;
	/** Optional. List of special entities that appear in the caption, which can be specified instead of parse_mode */
	caption_entities?: IMessageEntity[];
	/** Optional. Performer */
	performer?: string;
	/** Optional. Audio duration in seconds */
	audio_duration?: number;
	/** Optional. Inline keyboard attached to the message */
	reply_markup?: IInlineKeyboardMarkup;
	/** Optional. Content of the message to be sent instead of the audio */
	input_message_content?: IInputMessageContent;
}
	

/** Represents a link to a voice recording in an .OGG container encoded with OPUS. By default, this voice recording will be sent by the user. Alternatively, you can use input_message_content to send a message with the specified content instead of the the voice message. */
export interface IInlineQueryResultVoice {
	/** Type of the result, must be voice */
	type: string;
	/** Unique identifier for this result, 1-64 bytes */
	id: string;
	/** A valid URL for the voice recording */
	voice_url: string;
	/** Recording title */
	title: string;
	/** Optional. Caption, 0-1024 characters after entities parsing */
	caption?: string;
	/** Optional. Mode for parsing entities in the voice message caption. See formatting options for more details. */
	parse_mode?: string;
	/** Optional. List of special entities that appear in the caption, which can be specified instead of parse_mode */
	caption_entities?: IMessageEntity[];
	/** Optional. Recording duration in seconds */
	voice_duration?: number;
	/** Optional. Inline keyboard attached to the message */
	reply_markup?: IInlineKeyboardMarkup;
	/** Optional. Content of the message to be sent instead of the voice recording */
	input_message_content?: IInputMessageContent;
}
	

/** Represents a link to a file. By default, this file will be sent by the user with an optional caption. Alternatively, you can use input_message_content to send a message with the specified content instead of the file. Currently, only .PDF and .ZIP files can be sent using this method. */
export interface IInlineQueryResultDocument {
	/** Type of the result, must be document */
	type: string;
	/** Unique identifier for this result, 1-64 bytes */
	id: string;
	/** Title for the result */
	title: string;
	/** Optional. Caption of the document to be sent, 0-1024 characters after entities parsing */
	caption?: string;
	/** Optional. Mode for parsing entities in the document caption. See formatting options for more details. */
	parse_mode?: string;
	/** Optional. List of special entities that appear in the caption, which can be specified instead of parse_mode */
	caption_entities?: IMessageEntity[];
	/** A valid URL for the file */
	document_url: string;
	/** MIME type of the content of the file, either “application/pdf” or “application/zip” */
	mime_type: string;
	/** Optional. Short description of the result */
	description?: string;
	/** Optional. Inline keyboard attached to the message */
	reply_markup?: IInlineKeyboardMarkup;
	/** Optional. Content of the message to be sent instead of the file */
	input_message_content?: IInputMessageContent;
	/** Optional. URL of the thumbnail (JPEG only) for the file */
	thumb_url?: string;
	/** Optional. Thumbnail width */
	thumb_width?: number;
	/** Optional. Thumbnail height */
	thumb_height?: number;
}
	

/** Represents a location on a map. By default, the location will be sent by the user. Alternatively, you can use input_message_content to send a message with the specified content instead of the location. */
export interface IInlineQueryResultLocation {
	/** Type of the result, must be location */
	type: string;
	/** Unique identifier for this result, 1-64 Bytes */
	id: string;
	/** Location latitude in degrees */
	latitude: number;
	/** Location longitude in degrees */
	longitude: number;
	/** Location title */
	title: string;
	/** Optional. The radius of uncertainty for the location, measured in meters; 0-1500 */
	horizontal_accuracy?: number;
	/** Optional. Period in seconds for which the location can be updated, should be between 60 and 86400. */
	live_period?: number;
	/** Optional. For live locations, a direction in which the user is moving, in degrees. Must be between 1 and 360 if specified. */
	heading?: number;
	/** Optional. For live locations, a maximum distance for proximity alerts about approaching another chat member, in meters. Must be between 1 and 100000 if specified. */
	proximity_alert_radius?: number;
	/** Optional. Inline keyboard attached to the message */
	reply_markup?: IInlineKeyboardMarkup;
	/** Optional. Content of the message to be sent instead of the location */
	input_message_content?: IInputMessageContent;
	/** Optional. Url of the thumbnail for the result */
	thumb_url?: string;
	/** Optional. Thumbnail width */
	thumb_width?: number;
	/** Optional. Thumbnail height */
	thumb_height?: number;
}
	

/** Represents a venue. By default, the venue will be sent by the user. Alternatively, you can use input_message_content to send a message with the specified content instead of the venue. */
export interface IInlineQueryResultVenue {
	/** Type of the result, must be venue */
	type: string;
	/** Unique identifier for this result, 1-64 Bytes */
	id: string;
	/** Latitude of the venue location in degrees */
	latitude: number;
	/** Longitude of the venue location in degrees */
	longitude: number;
	/** Title of the venue */
	title: string;
	/** Address of the venue */
	address: string;
	/** Optional. Foursquare identifier of the venue if known */
	foursquare_id?: string;
	/** Optional. Foursquare type of the venue, if known. (For example, “arts_entertainment/default”, “arts_entertainment/aquarium” or “food/icecream”.) */
	foursquare_type?: string;
	/** Optional. Google Places identifier of the venue */
	google_place_id?: string;
	/** Optional. Google Places type of the venue. (See supported types.) */
	google_place_type?: string;
	/** Optional. Inline keyboard attached to the message */
	reply_markup?: IInlineKeyboardMarkup;
	/** Optional. Content of the message to be sent instead of the venue */
	input_message_content?: IInputMessageContent;
	/** Optional. Url of the thumbnail for the result */
	thumb_url?: string;
	/** Optional. Thumbnail width */
	thumb_width?: number;
	/** Optional. Thumbnail height */
	thumb_height?: number;
}
	

/** Represents a contact with a phone number. By default, this contact will be sent by the user. Alternatively, you can use input_message_content to send a message with the specified content instead of the contact. */
export interface IInlineQueryResultContact {
	/** Type of the result, must be contact */
	type: string;
	/** Unique identifier for this result, 1-64 Bytes */
	id: string;
	/** Contact's phone number */
	phone_number: string;
	/** Contact's first name */
	first_name: string;
	/** Optional. Contact's last name */
	last_name?: string;
	/** Optional. Additional data about the contact in the form of a vCard, 0-2048 bytes */
	vcard?: string;
	/** Optional. Inline keyboard attached to the message */
	reply_markup?: IInlineKeyboardMarkup;
	/** Optional. Content of the message to be sent instead of the contact */
	input_message_content?: IInputMessageContent;
	/** Optional. Url of the thumbnail for the result */
	thumb_url?: string;
	/** Optional. Thumbnail width */
	thumb_width?: number;
	/** Optional. Thumbnail height */
	thumb_height?: number;
}
	

/** Represents a Game. */
export interface IInlineQueryResultGame {
	/** Type of the result, must be game */
	type: string;
	/** Unique identifier for this result, 1-64 bytes */
	id: string;
	/** Short name of the game */
	game_short_name: string;
	/** Optional. Inline keyboard attached to the message */
	reply_markup?: IInlineKeyboardMarkup;
}
	

/** Represents a link to a photo stored on the Telegram servers. By default, this photo will be sent by the user with an optional caption. Alternatively, you can use input_message_content to send a message with the specified content instead of the photo. */
export interface IInlineQueryResultCachedPhoto {
	/** Type of the result, must be photo */
	type: string;
	/** Unique identifier for this result, 1-64 bytes */
	id: string;
	/** A valid file identifier of the photo */
	photo_file_id: string;
	/** Optional. Title for the result */
	title?: string;
	/** Optional. Short description of the result */
	description?: string;
	/** Optional. Caption of the photo to be sent, 0-1024 characters after entities parsing */
	caption?: string;
	/** Optional. Mode for parsing entities in the photo caption. See formatting options for more details. */
	parse_mode?: string;
	/** Optional. List of special entities that appear in the caption, which can be specified instead of parse_mode */
	caption_entities?: IMessageEntity[];
	/** Optional. Inline keyboard attached to the message */
	reply_markup?: IInlineKeyboardMarkup;
	/** Optional. Content of the message to be sent instead of the photo */
	input_message_content?: IInputMessageContent;
}
	

/** Represents a link to an animated GIF file stored on the Telegram servers. By default, this animated GIF file will be sent by the user with an optional caption. Alternatively, you can use input_message_content to send a message with specified content instead of the animation. */
export interface IInlineQueryResultCachedGif {
	/** Type of the result, must be gif */
	type: string;
	/** Unique identifier for this result, 1-64 bytes */
	id: string;
	/** A valid file identifier for the GIF file */
	gif_file_id: string;
	/** Optional. Title for the result */
	title?: string;
	/** Optional. Caption of the GIF file to be sent, 0-1024 characters after entities parsing */
	caption?: string;
	/** Optional. Mode for parsing entities in the caption. See formatting options for more details. */
	parse_mode?: string;
	/** Optional. List of special entities that appear in the caption, which can be specified instead of parse_mode */
	caption_entities?: IMessageEntity[];
	/** Optional. Inline keyboard attached to the message */
	reply_markup?: IInlineKeyboardMarkup;
	/** Optional. Content of the message to be sent instead of the GIF animation */
	input_message_content?: IInputMessageContent;
}
	

/** Represents a link to a video animation (H.264/MPEG-4 AVC video without sound) stored on the Telegram servers. By default, this animated MPEG-4 file will be sent by the user with an optional caption. Alternatively, you can use input_message_content to send a message with the specified content instead of the animation. */
export interface IInlineQueryResultCachedMpeg4Gif {
	/** Type of the result, must be mpeg4_gif */
	type: string;
	/** Unique identifier for this result, 1-64 bytes */
	id: string;
	/** A valid file identifier for the MPEG4 file */
	mpeg4_file_id: string;
	/** Optional. Title for the result */
	title?: string;
	/** Optional. Caption of the MPEG-4 file to be sent, 0-1024 characters after entities parsing */
	caption?: string;
	/** Optional. Mode for parsing entities in the caption. See formatting options for more details. */
	parse_mode?: string;
	/** Optional. List of special entities that appear in the caption, which can be specified instead of parse_mode */
	caption_entities?: IMessageEntity[];
	/** Optional. Inline keyboard attached to the message */
	reply_markup?: IInlineKeyboardMarkup;
	/** Optional. Content of the message to be sent instead of the video animation */
	input_message_content?: IInputMessageContent;
}
	

/** Represents a link to a sticker stored on the Telegram servers. By default, this sticker will be sent by the user. Alternatively, you can use input_message_content to send a message with the specified content instead of the sticker. */
export interface IInlineQueryResultCachedSticker {
	/** Type of the result, must be sticker */
	type: string;
	/** Unique identifier for this result, 1-64 bytes */
	id: string;
	/** A valid file identifier of the sticker */
	sticker_file_id: string;
	/** Optional. Inline keyboard attached to the message */
	reply_markup?: IInlineKeyboardMarkup;
	/** Optional. Content of the message to be sent instead of the sticker */
	input_message_content?: IInputMessageContent;
}
	

/** Represents a link to a file stored on the Telegram servers. By default, this file will be sent by the user with an optional caption. Alternatively, you can use input_message_content to send a message with the specified content instead of the file. */
export interface IInlineQueryResultCachedDocument {
	/** Type of the result, must be document */
	type: string;
	/** Unique identifier for this result, 1-64 bytes */
	id: string;
	/** Title for the result */
	title: string;
	/** A valid file identifier for the file */
	document_file_id: string;
	/** Optional. Short description of the result */
	description?: string;
	/** Optional. Caption of the document to be sent, 0-1024 characters after entities parsing */
	caption?: string;
	/** Optional. Mode for parsing entities in the document caption. See formatting options for more details. */
	parse_mode?: string;
	/** Optional. List of special entities that appear in the caption, which can be specified instead of parse_mode */
	caption_entities?: IMessageEntity[];
	/** Optional. Inline keyboard attached to the message */
	reply_markup?: IInlineKeyboardMarkup;
	/** Optional. Content of the message to be sent instead of the file */
	input_message_content?: IInputMessageContent;
}
	

/** Represents a link to a video file stored on the Telegram servers. By default, this video file will be sent by the user with an optional caption. Alternatively, you can use input_message_content to send a message with the specified content instead of the video. */
export interface IInlineQueryResultCachedVideo {
	/** Type of the result, must be video */
	type: string;
	/** Unique identifier for this result, 1-64 bytes */
	id: string;
	/** A valid file identifier for the video file */
	video_file_id: string;
	/** Title for the result */
	title: string;
	/** Optional. Short description of the result */
	description?: string;
	/** Optional. Caption of the video to be sent, 0-1024 characters after entities parsing */
	caption?: string;
	/** Optional. Mode for parsing entities in the video caption. See formatting options for more details. */
	parse_mode?: string;
	/** Optional. List of special entities that appear in the caption, which can be specified instead of parse_mode */
	caption_entities?: IMessageEntity[];
	/** Optional. Inline keyboard attached to the message */
	reply_markup?: IInlineKeyboardMarkup;
	/** Optional. Content of the message to be sent instead of the video */
	input_message_content?: IInputMessageContent;
}
	

/** Represents a link to a voice message stored on the Telegram servers. By default, this voice message will be sent by the user. Alternatively, you can use input_message_content to send a message with the specified content instead of the voice message. */
export interface IInlineQueryResultCachedVoice {
	/** Type of the result, must be voice */
	type: string;
	/** Unique identifier for this result, 1-64 bytes */
	id: string;
	/** A valid file identifier for the voice message */
	voice_file_id: string;
	/** Voice message title */
	title: string;
	/** Optional. Caption, 0-1024 characters after entities parsing */
	caption?: string;
	/** Optional. Mode for parsing entities in the voice message caption. See formatting options for more details. */
	parse_mode?: string;
	/** Optional. List of special entities that appear in the caption, which can be specified instead of parse_mode */
	caption_entities?: IMessageEntity[];
	/** Optional. Inline keyboard attached to the message */
	reply_markup?: IInlineKeyboardMarkup;
	/** Optional. Content of the message to be sent instead of the voice message */
	input_message_content?: IInputMessageContent;
}
	

/** Represents a link to an MP3 audio file stored on the Telegram servers. By default, this audio file will be sent by the user. Alternatively, you can use input_message_content to send a message with the specified content instead of the audio. */
export interface IInlineQueryResultCachedAudio {
	/** Type of the result, must be audio */
	type: string;
	/** Unique identifier for this result, 1-64 bytes */
	id: string;
	/** A valid file identifier for the audio file */
	audio_file_id: string;
	/** Optional. Caption, 0-1024 characters after entities parsing */
	caption?: string;
	/** Optional. Mode for parsing entities in the audio caption. See formatting options for more details. */
	parse_mode?: string;
	/** Optional. List of special entities that appear in the caption, which can be specified instead of parse_mode */
	caption_entities?: IMessageEntity[];
	/** Optional. Inline keyboard attached to the message */
	reply_markup?: IInlineKeyboardMarkup;
	/** Optional. Content of the message to be sent instead of the audio */
	input_message_content?: IInputMessageContent;
}
	

/** This object represents the content of a message to be sent as a result of an inline query. Telegram clients currently support the following 5 types: */
export interface IInputMessageContent {

}
	

/** Represents the content of a text message to be sent as the result of an inline query. */
export interface IInputTextMessageContent {
	/** Text of the message to be sent, 1-4096 characters */
	message_text: string;
	/** Optional. Mode for parsing entities in the message text. See formatting options for more details. */
	parse_mode?: string;
	/** Optional. List of special entities that appear in message text, which can be specified instead of parse_mode */
	entities?: IMessageEntity[];
	/** Optional. Disables link previews for links in the sent message */
	disable_web_page_preview?: boolean;
}
	

/** Represents the content of a location message to be sent as the result of an inline query. */
export interface IInputLocationMessageContent {
	/** Latitude of the location in degrees */
	latitude: number;
	/** Longitude of the location in degrees */
	longitude: number;
	/** Optional. The radius of uncertainty for the location, measured in meters; 0-1500 */
	horizontal_accuracy?: number;
	/** Optional. Period in seconds for which the location can be updated, should be between 60 and 86400. */
	live_period?: number;
	/** Optional. For live locations, a direction in which the user is moving, in degrees. Must be between 1 and 360 if specified. */
	heading?: number;
	/** Optional. For live locations, a maximum distance for proximity alerts about approaching another chat member, in meters. Must be between 1 and 100000 if specified. */
	proximity_alert_radius?: number;
}
	

/** Represents the content of a venue message to be sent as the result of an inline query. */
export interface IInputVenueMessageContent {
	/** Latitude of the venue in degrees */
	latitude: number;
	/** Longitude of the venue in degrees */
	longitude: number;
	/** Name of the venue */
	title: string;
	/** Address of the venue */
	address: string;
	/** Optional. Foursquare identifier of the venue, if known */
	foursquare_id?: string;
	/** Optional. Foursquare type of the venue, if known. (For example, “arts_entertainment/default”, “arts_entertainment/aquarium” or “food/icecream”.) */
	foursquare_type?: string;
	/** Optional. Google Places identifier of the venue */
	google_place_id?: string;
	/** Optional. Google Places type of the venue. (See supported types.) */
	google_place_type?: string;
}
	

/** Represents the content of a contact message to be sent as the result of an inline query. */
export interface IInputContactMessageContent {
	/** Contact's phone number */
	phone_number: string;
	/** Contact's first name */
	first_name: string;
	/** Optional. Contact's last name */
	last_name?: string;
	/** Optional. Additional data about the contact in the form of a vCard, 0-2048 bytes */
	vcard?: string;
}
	

/** Represents the content of an invoice message to be sent as the result of an inline query. */
export interface IInputInvoiceMessageContent {
	/** Product name, 1-32 characters */
	title: string;
	/** Product description, 1-255 characters */
	description: string;
	/** Bot-defined invoice payload, 1-128 bytes. This will not be displayed to the user, use for your internal processes. */
	payload: string;
	/** Payment provider token, obtained via @BotFather */
	provider_token: string;
	/** Three-letter ISO 4217 currency code, see more on currencies */
	currency: string;
	/** Price breakdown, a JSON-serialized list of components (e.g. product price, tax, discount, delivery cost, delivery tax, bonus, etc.) */
	prices: ILabeledPrice[];
	/** Optional. The maximum accepted amount for tips in the smallest units of the currency (integer, not float/double). For example, for a maximum tip of US$ 1.45 pass max_tip_amount = 145. See the exp parameter in currencies.json, it shows the number of digits past the decimal point for each currency (2 for the majority of currencies). Defaults to 0 */
	max_tip_amount?: number;
	/** Optional. A JSON-serialized array of suggested amounts of tip in the smallest units of the currency (integer, not float/double). At most 4 suggested tip amounts can be specified. The suggested tip amounts must be positive, passed in a strictly increased order and must not exceed max_tip_amount. */
	suggested_tip_amounts?: number[];
	/** Optional. A JSON-serialized object for data about the invoice, which will be shared with the payment provider. A detailed description of the required fields should be provided by the payment provider. */
	provider_data?: string;
	/** Optional. URL of the product photo for the invoice. Can be a photo of the goods or a marketing image for a service. */
	photo_url?: string;
	/** Optional. Photo size in bytes */
	photo_size?: number;
	/** Optional. Photo width */
	photo_width?: number;
	/** Optional. Photo height */
	photo_height?: number;
	/** Optional. Pass True if you require the user's full name to complete the order */
	need_name?: boolean;
	/** Optional. Pass True if you require the user's phone number to complete the order */
	need_phone_number?: boolean;
	/** Optional. Pass True if you require the user's email address to complete the order */
	need_email?: boolean;
	/** Optional. Pass True if you require the user's shipping address to complete the order */
	need_shipping_address?: boolean;
	/** Optional. Pass True if the user's phone number should be sent to provider */
	send_phone_number_to_provider?: boolean;
	/** Optional. Pass True if the user's email address should be sent to provider */
	send_email_to_provider?: boolean;
	/** Optional. Pass True if the final price depends on the shipping method */
	is_flexible?: boolean;
}
	

/** Represents a result of an inline query that was chosen by the user and sent to their chat partner.
 * 
 * Note: It is necessary to enable inline feedback via @BotFather in order to receive these objects in updates. */
export interface IChosenInlineResult {
	/** The unique identifier for the result that was chosen */
	result_id: string;
	/** The user that chose the result */
	from: IUser;
	/** Optional. Sender location, only for bots that require user location */
	location?: ILocation;
	/** Optional. Identifier of the sent inline message. Available only if there is an inline keyboard attached to the message. Will be also received in callback queries and can be used to edit the message. */
	inline_message_id?: string;
	/** The query that was used to obtain the result */
	query: string;
}
	

/** Parameters for the answerWebAppQuery method */
export interface IAnswerWebAppQueryParams {
	/** Unique identifier for the query to be answered */
	web_app_query_id: string;
	/** A JSON-serialized object describing the message to be sent */
	result: IInlineQueryResult;
}
	

/** Your bot can accept payments from Telegram users. Please see the introduction to payments for more details on the process and how to set up payments for your bot. Please note that users will need Telegram v.4.0 or higher to use payments (released on May 18, 2017). */
export interface ISentWebAppMessage {
	/** Optional. Identifier of the sent inline message. Available only if there is an inline keyboard attached to the message. */
	inline_message_id?: string;
}
	

/** Parameters for the sendInvoice method */
export interface ISendInvoiceParams {
	/** Unique identifier for the target chat or username of the target channel (in the format @channelusername) */
	chat_id: number | string;
	/** Unique identifier for the target message thread (topic) of the forum; for forum supergroups only */
	message_thread_id?: number;
	/** Product name, 1-32 characters */
	title: string;
	/** Product description, 1-255 characters */
	description: string;
	/** Bot-defined invoice payload, 1-128 bytes. This will not be displayed to the user, use for your internal processes. */
	payload: string;
	/** Payment provider token, obtained via @BotFather */
	provider_token: string;
	/** Three-letter ISO 4217 currency code, see more on currencies */
	currency: string;
	/** Price breakdown, a JSON-serialized list of components (e.g. product price, tax, discount, delivery cost, delivery tax, bonus, etc.) */
	prices: ILabeledPrice[];
	/** The maximum accepted amount for tips in the smallest units of the currency (integer, not float/double). For example, for a maximum tip of US$ 1.45 pass max_tip_amount = 145. See the exp parameter in currencies.json, it shows the number of digits past the decimal point for each currency (2 for the majority of currencies). Defaults to 0 */
	max_tip_amount?: number;
	/** A JSON-serialized array of suggested amounts of tips in the smallest units of the currency (integer, not float/double). At most 4 suggested tip amounts can be specified. The suggested tip amounts must be positive, passed in a strictly increased order and must not exceed max_tip_amount. */
	suggested_tip_amounts?: number[];
	/** Unique deep-linking parameter. If left empty, forwarded copies of the sent message will have a Pay button, allowing multiple users to pay directly from the forwarded message, using the same invoice. If non-empty, forwarded copies of the sent message will have a URL button with a deep link to the bot (instead of a Pay button), with the value used as the start parameter */
	start_parameter?: string;
	/** JSON-serialized data about the invoice, which will be shared with the payment provider. A detailed description of required fields should be provided by the payment provider. */
	provider_data?: string;
	/** URL of the product photo for the invoice. Can be a photo of the goods or a marketing image for a service. People like it better when they see what they are paying for. */
	photo_url?: string;
	/** Photo size in bytes */
	photo_size?: number;
	/** Photo width */
	photo_width?: number;
	/** Photo height */
	photo_height?: number;
	/** Pass True if you require the user's full name to complete the order */
	need_name?: boolean;
	/** Pass True if you require the user's phone number to complete the order */
	need_phone_number?: boolean;
	/** Pass True if you require the user's email address to complete the order */
	need_email?: boolean;
	/** Pass True if you require the user's shipping address to complete the order */
	need_shipping_address?: boolean;
	/** Pass True if the user's phone number should be sent to provider */
	send_phone_number_to_provider?: boolean;
	/** Pass True if the user's email address should be sent to provider */
	send_email_to_provider?: boolean;
	/** Pass True if the final price depends on the shipping method */
	is_flexible?: boolean;
	/** Sends the message silently. Users will receive a notification with no sound. */
	disable_notification?: boolean;
	/** Protects the contents of the sent message from forwarding and saving */
	protect_content?: boolean;
	/** If the message is a reply, ID of the original message */
	reply_to_message_id?: number;
	/** Pass True if the message should be sent even if the specified replied-to message is not found */
	allow_sending_without_reply?: boolean;
	/** A JSON-serialized object for an inline keyboard. If empty, one 'Pay total price' button will be shown. If not empty, the first button must be a Pay button. */
	reply_markup?: IInlineKeyboardMarkup;
}
	

/** Parameters for the createInvoiceLink method */
export interface ICreateInvoiceLinkParams {
	/** Product name, 1-32 characters */
	title: string;
	/** Product description, 1-255 characters */
	description: string;
	/** Bot-defined invoice payload, 1-128 bytes. This will not be displayed to the user, use for your internal processes. */
	payload: string;
	/** Payment provider token, obtained via BotFather */
	provider_token: string;
	/** Three-letter ISO 4217 currency code, see more on currencies */
	currency: string;
	/** Price breakdown, a JSON-serialized list of components (e.g. product price, tax, discount, delivery cost, delivery tax, bonus, etc.) */
	prices: ILabeledPrice[];
	/** The maximum accepted amount for tips in the smallest units of the currency (integer, not float/double). For example, for a maximum tip of US$ 1.45 pass max_tip_amount = 145. See the exp parameter in currencies.json, it shows the number of digits past the decimal point for each currency (2 for the majority of currencies). Defaults to 0 */
	max_tip_amount?: number;
	/** A JSON-serialized array of suggested amounts of tips in the smallest units of the currency (integer, not float/double). At most 4 suggested tip amounts can be specified. The suggested tip amounts must be positive, passed in a strictly increased order and must not exceed max_tip_amount. */
	suggested_tip_amounts?: number[];
	/** JSON-serialized data about the invoice, which will be shared with the payment provider. A detailed description of required fields should be provided by the payment provider. */
	provider_data?: string;
	/** URL of the product photo for the invoice. Can be a photo of the goods or a marketing image for a service. */
	photo_url?: string;
	/** Photo size in bytes */
	photo_size?: number;
	/** Photo width */
	photo_width?: number;
	/** Photo height */
	photo_height?: number;
	/** Pass True if you require the user's full name to complete the order */
	need_name?: boolean;
	/** Pass True if you require the user's phone number to complete the order */
	need_phone_number?: boolean;
	/** Pass True if you require the user's email address to complete the order */
	need_email?: boolean;
	/** Pass True if you require the user's shipping address to complete the order */
	need_shipping_address?: boolean;
	/** Pass True if the user's phone number should be sent to the provider */
	send_phone_number_to_provider?: boolean;
	/** Pass True if the user's email address should be sent to the provider */
	send_email_to_provider?: boolean;
	/** Pass True if the final price depends on the shipping method */
	is_flexible?: boolean;
}
	

/** Parameters for the answerShippingQuery method */
export interface IAnswerShippingQueryParams {
	/** Unique identifier for the query to be answered */
	shipping_query_id: string;
	/** Pass True if delivery to the specified address is possible and False if there are any problems (for example, if delivery to the specified address is not possible) */
	ok: boolean;
	/** Required if ok is True. A JSON-serialized array of available shipping options. */
	shipping_options?: IShippingOption[];
	/** Required if ok is False. Error message in human readable form that explains why it is impossible to complete the order (e.g. "Sorry, delivery to your desired address is unavailable'). Telegram will display this message to the user. */
	error_message?: string;
}
	

/** Parameters for the answerPreCheckoutQuery method */
export interface IAnswerPreCheckoutQueryParams {
	/** Unique identifier for the query to be answered */
	pre_checkout_query_id: string;
	/** Specify True if everything is alright (goods are available, etc.) and the bot is ready to proceed with the order. Use False if there are any problems. */
	ok: boolean;
	/** Required if ok is False. Error message in human readable form that explains the reason for failure to proceed with the checkout (e.g. "Sorry, somebody just bought the last of our amazing black T-shirts while you were busy filling out your payment details. Please choose a different color or garment!"). Telegram will display this message to the user. */
	error_message?: string;
}
	

/** This object represents a portion of the price for goods or services. */
export interface ILabeledPrice {
	/** Portion label */
	label: string;
	/** Price of the product in the smallest units of the currency (integer, not float/double). For example, for a price of US$ 1.45 pass amount = 145. See the exp parameter in currencies.json, it shows the number of digits past the decimal point for each currency (2 for the majority of currencies). */
	amount: number;
}
	

/** This object contains basic information about an invoice. */
export interface IInvoice {
	/** Product name */
	title: string;
	/** Product description */
	description: string;
	/** Unique bot deep-linking parameter that can be used to generate this invoice */
	start_parameter: string;
	/** Three-letter ISO 4217 currency code */
	currency: string;
	/** Total price in the smallest units of the currency (integer, not float/double). For example, for a price of US$ 1.45 pass amount = 145. See the exp parameter in currencies.json, it shows the number of digits past the decimal point for each currency (2 for the majority of currencies). */
	total_amount: number;
}
	

/** This object represents a shipping address. */
export interface IShippingAddress {
	/** Two-letter ISO 3166-1 alpha-2 country code */
	country_code: string;
	/** State, if applicable */
	state: string;
	/** City */
	city: string;
	/** First line for the address */
	street_line1: string;
	/** Second line for the address */
	street_line2: string;
	/** Address post code */
	post_code: string;
}
	

/** This object represents information about an order. */
export interface IOrderInfo {
	/** Optional. User name */
	name?: string;
	/** Optional. User's phone number */
	phone_number?: string;
	/** Optional. User email */
	email?: string;
	/** Optional. User shipping address */
	shipping_address?: IShippingAddress;
}
	

/** This object represents one shipping option. */
export interface IShippingOption {
	/** Shipping option identifier */
	id: string;
	/** Option title */
	title: string;
	/** List of price portions */
	prices: ILabeledPrice[];
}
	

/** This object contains basic information about a successful payment. */
export interface ISuccessfulPayment {
	/** Three-letter ISO 4217 currency code */
	currency: string;
	/** Total price in the smallest units of the currency (integer, not float/double). For example, for a price of US$ 1.45 pass amount = 145. See the exp parameter in currencies.json, it shows the number of digits past the decimal point for each currency (2 for the majority of currencies). */
	total_amount: number;
	/** Bot specified invoice payload */
	invoice_payload: string;
	/** Optional. Identifier of the shipping option chosen by the user */
	shipping_option_id?: string;
	/** Optional. Order information provided by the user */
	order_info?: IOrderInfo;
	/** Telegram payment identifier */
	telegram_payment_charge_id: string;
	/** Provider payment identifier */
	provider_payment_charge_id: string;
}
	

/** This object contains information about an incoming shipping query. */
export interface IShippingQuery {
	/** Unique query identifier */
	id: string;
	/** User who sent the query */
	from: IUser;
	/** Bot specified invoice payload */
	invoice_payload: string;
	/** User specified shipping address */
	shipping_address: IShippingAddress;
}
	

/** Telegram Passport is a unified authorization method for services that require personal identification. Users can upload their documents once, then instantly share their data with services that require real-world ID (finance, ICOs, etc.). Please see the manual for details. */
export interface IPreCheckoutQuery {
	/** Unique query identifier */
	id: string;
	/** User who sent the query */
	from: IUser;
	/** Three-letter ISO 4217 currency code */
	currency: string;
	/** Total price in the smallest units of the currency (integer, not float/double). For example, for a price of US$ 1.45 pass amount = 145. See the exp parameter in currencies.json, it shows the number of digits past the decimal point for each currency (2 for the majority of currencies). */
	total_amount: number;
	/** Bot specified invoice payload */
	invoice_payload: string;
	/** Optional. Identifier of the shipping option chosen by the user */
	shipping_option_id?: string;
	/** Optional. Order information provided by the user */
	order_info?: IOrderInfo;
}
	

/** Describes Telegram Passport data shared with the bot by the user. */
export interface IPassportData {
	/** Array with information about documents and other Telegram Passport elements that was shared with the bot */
	data: IEncryptedPassportElement[];
	/** Encrypted credentials required to decrypt the data */
	credentials: IEncryptedCredentials;
}
	

/** This object represents a file uploaded to Telegram Passport. Currently all Telegram Passport files are in JPEG format when decrypted and don't exceed 10MB. */
export interface IPassportFile {
	/** Identifier for this file, which can be used to download or reuse the file */
	file_id: string;
	/** Unique identifier for this file, which is supposed to be the same over time and for different bots. Can't be used to download or reuse the file. */
	file_unique_id: string;
	/** File size in bytes */
	file_size: number;
	/** Unix time when the file was uploaded */
	file_date: number;
}
	

/** Describes documents or other Telegram Passport elements shared with the bot by the user. */
export interface IEncryptedPassportElement {
	/** Element type. One of “personal_details”, “passport”, “driver_license”, “identity_card”, “internal_passport”, “address”, “utility_bill”, “bank_statement”, “rental_agreement”, “passport_registration”, “temporary_registration”, “phone_number”, “email”. */
	type: string;
	/** Optional. Base64-encoded encrypted Telegram Passport element data provided by the user, available for “personal_details”, “passport”, “driver_license”, “identity_card”, “internal_passport” and “address” types. Can be decrypted and verified using the accompanying EncryptedCredentials. */
	data?: string;
	/** Optional. User's verified phone number, available only for “phone_number” type */
	phone_number?: string;
	/** Optional. User's verified email address, available only for “email” type */
	email?: string;
	/** Optional. Array of encrypted files with documents provided by the user, available for “utility_bill”, “bank_statement”, “rental_agreement”, “passport_registration” and “temporary_registration” types. Files can be decrypted and verified using the accompanying EncryptedCredentials. */
	files?: IPassportFile[];
	/** Optional. Encrypted file with the front side of the document, provided by the user. Available for “passport”, “driver_license”, “identity_card” and “internal_passport”. The file can be decrypted and verified using the accompanying EncryptedCredentials. */
	front_side?: IPassportFile;
	/** Optional. Encrypted file with the reverse side of the document, provided by the user. Available for “driver_license” and “identity_card”. The file can be decrypted and verified using the accompanying EncryptedCredentials. */
	reverse_side?: IPassportFile;
	/** Optional. Encrypted file with the selfie of the user holding a document, provided by the user; available for “passport”, “driver_license”, “identity_card” and “internal_passport”. The file can be decrypted and verified using the accompanying EncryptedCredentials. */
	selfie?: IPassportFile;
	/** Optional. Array of encrypted files with translated versions of documents provided by the user. Available if requested for “passport”, “driver_license”, “identity_card”, “internal_passport”, “utility_bill”, “bank_statement”, “rental_agreement”, “passport_registration” and “temporary_registration” types. Files can be decrypted and verified using the accompanying EncryptedCredentials. */
	translation?: IPassportFile[];
	/** Base64-encoded element hash for using in PassportElementErrorUnspecified */
	hash: string;
}
	

/** Describes data required for decrypting and authenticating EncryptedPassportElement. See the Telegram Passport Documentation for a complete description of the data decryption and authentication processes. */
export interface IEncryptedCredentials {
	/** Base64-encoded encrypted JSON-serialized data with unique user's payload, data hashes and secrets required for EncryptedPassportElement decryption and authentication */
	data: string;
	/** Base64-encoded data hash for data authentication */
	hash: string;
	/** Base64-encoded secret, encrypted with the bot's public RSA key, required for data decryption */
	secret: string;
}
	

/** Parameters for the setPassportDataErrors method */
export interface ISetPassportDataErrorsParams {
	/** User identifier */
	user_id: number;
	/** A JSON-serialized array describing the errors */
	errors: IPassportElementError[];
}
	

/** This object represents an error in the Telegram Passport element which was submitted that should be resolved by the user. It should be one of: */
export interface IPassportElementError {

}
	

/** Represents an issue in one of the data fields that was provided by the user. The error is considered resolved when the field's value changes. */
export interface IPassportElementErrorDataField {
	/** Error source, must be data */
	source: string;
	/** The section of the user's Telegram Passport which has the error, one of “personal_details”, “passport”, “driver_license”, “identity_card”, “internal_passport”, “address” */
	type: string;
	/** Name of the data field which has the error */
	field_name: string;
	/** Base64-encoded data hash */
	data_hash: string;
	/** Error message */
	message: string;
}
	

/** Represents an issue with the front side of a document. The error is considered resolved when the file with the front side of the document changes. */
export interface IPassportElementErrorFrontSide {
	/** Error source, must be front_side */
	source: string;
	/** The section of the user's Telegram Passport which has the issue, one of “passport”, “driver_license”, “identity_card”, “internal_passport” */
	type: string;
	/** Base64-encoded hash of the file with the front side of the document */
	file_hash: string;
	/** Error message */
	message: string;
}
	

/** Represents an issue with the reverse side of a document. The error is considered resolved when the file with reverse side of the document changes. */
export interface IPassportElementErrorReverseSide {
	/** Error source, must be reverse_side */
	source: string;
	/** The section of the user's Telegram Passport which has the issue, one of “driver_license”, “identity_card” */
	type: string;
	/** Base64-encoded hash of the file with the reverse side of the document */
	file_hash: string;
	/** Error message */
	message: string;
}
	

/** Represents an issue with the selfie with a document. The error is considered resolved when the file with the selfie changes. */
export interface IPassportElementErrorSelfie {
	/** Error source, must be selfie */
	source: string;
	/** The section of the user's Telegram Passport which has the issue, one of “passport”, “driver_license”, “identity_card”, “internal_passport” */
	type: string;
	/** Base64-encoded hash of the file with the selfie */
	file_hash: string;
	/** Error message */
	message: string;
}
	

/** Represents an issue with a document scan. The error is considered resolved when the file with the document scan changes. */
export interface IPassportElementErrorFile {
	/** Error source, must be file */
	source: string;
	/** The section of the user's Telegram Passport which has the issue, one of “utility_bill”, “bank_statement”, “rental_agreement”, “passport_registration”, “temporary_registration” */
	type: string;
	/** Base64-encoded file hash */
	file_hash: string;
	/** Error message */
	message: string;
}
	

/** Represents an issue with a list of scans. The error is considered resolved when the list of files containing the scans changes. */
export interface IPassportElementErrorFiles {
	/** Error source, must be files */
	source: string;
	/** The section of the user's Telegram Passport which has the issue, one of “utility_bill”, “bank_statement”, “rental_agreement”, “passport_registration”, “temporary_registration” */
	type: string;
	/** List of base64-encoded file hashes */
	file_hashes: string[];
	/** Error message */
	message: string;
}
	

/** Represents an issue with one of the files that constitute the translation of a document. The error is considered resolved when the file changes. */
export interface IPassportElementErrorTranslationFile {
	/** Error source, must be translation_file */
	source: string;
	/** Type of element of the user's Telegram Passport which has the issue, one of “passport”, “driver_license”, “identity_card”, “internal_passport”, “utility_bill”, “bank_statement”, “rental_agreement”, “passport_registration”, “temporary_registration” */
	type: string;
	/** Base64-encoded file hash */
	file_hash: string;
	/** Error message */
	message: string;
}
	

/** Represents an issue with the translated version of a document. The error is considered resolved when a file with the document translation change. */
export interface IPassportElementErrorTranslationFiles {
	/** Error source, must be translation_files */
	source: string;
	/** Type of element of the user's Telegram Passport which has the issue, one of “passport”, “driver_license”, “identity_card”, “internal_passport”, “utility_bill”, “bank_statement”, “rental_agreement”, “passport_registration”, “temporary_registration” */
	type: string;
	/** List of base64-encoded file hashes */
	file_hashes: string[];
	/** Error message */
	message: string;
}
	

/** Your bot can offer users HTML5 games to play solo or to compete against each other in groups and one-on-one chats. Create games via @BotFather using the /newgame command. Please note that this kind of power requires responsibility: you will need to accept the terms for each game that your bots will be offering. */
export interface IPassportElementErrorUnspecified {
	/** Error source, must be unspecified */
	source: string;
	/** Type of element of the user's Telegram Passport which has the issue */
	type: string;
	/** Base64-encoded element hash */
	element_hash: string;
	/** Error message */
	message: string;
}
	

/** Parameters for the sendGame method */
export interface ISendGameParams {
	/** Unique identifier for the target chat */
	chat_id: number;
	/** Unique identifier for the target message thread (topic) of the forum; for forum supergroups only */
	message_thread_id?: number;
	/** Short name of the game, serves as the unique identifier for the game. Set up your games via @BotFather. */
	game_short_name: string;
	/** Sends the message silently. Users will receive a notification with no sound. */
	disable_notification?: boolean;
	/** Protects the contents of the sent message from forwarding and saving */
	protect_content?: boolean;
	/** If the message is a reply, ID of the original message */
	reply_to_message_id?: number;
	/** Pass True if the message should be sent even if the specified replied-to message is not found */
	allow_sending_without_reply?: boolean;
	/** A JSON-serialized object for an inline keyboard. If empty, one 'Play game_title' button will be shown. If not empty, the first button must launch the game. */
	reply_markup?: IInlineKeyboardMarkup;
}
	

/** This object represents a game. Use BotFather to create and edit games, their short names will act as unique identifiers. */
export interface IGame {
	/** Title of the game */
	title: string;
	/** Description of the game */
	description: string;
	/** Photo that will be displayed in the game message in chats. */
	photo: IPhotoSize[];
	/** Optional. Brief description of the game or high scores included in the game message. Can be automatically edited to include current high scores for the game when the bot calls setGameScore, or manually edited using editMessageText. 0-4096 characters. */
	text?: string;
	/** Optional. Special entities that appear in text, such as usernames, URLs, bot commands, etc. */
	text_entities?: IMessageEntity[];
	/** Optional. Animation that will be displayed in the game message in chats. Upload via BotFather */
	animation?: IAnimation;
}
	

/** A placeholder, currently holds no information. Use BotFather to set up your game. */
export interface ICallbackGame {

}
	

/** Parameters for the setGameScore method */
export interface ISetGameScoreParams {
	/** User identifier */
	user_id: number;
	/** New score, must be non-negative */
	score: number;
	/** Pass True if the high score is allowed to decrease. This can be useful when fixing mistakes or banning cheaters */
	force?: boolean;
	/** Pass True if the game message should not be automatically edited to include the current scoreboard */
	disable_edit_message?: boolean;
	/** Required if inline_message_id is not specified. Unique identifier for the target chat */
	chat_id?: number;
	/** Required if inline_message_id is not specified. Identifier of the sent message */
	message_id?: number;
	/** Required if chat_id and message_id are not specified. Identifier of the inline message */
	inline_message_id?: string;
}
	

/** Parameters for the getGameHighScores method */
export interface IGetGameHighScoresParams {
	/** Target user id */
	user_id: number;
	/** Required if inline_message_id is not specified. Unique identifier for the target chat */
	chat_id?: number;
	/** Required if inline_message_id is not specified. Identifier of the sent message */
	message_id?: number;
	/** Required if chat_id and message_id are not specified. Identifier of the inline message */
	inline_message_id?: string;
}


/** This object represents one row of the high scores table for a game. */
export interface IGameHighScore {
	/** Position in high score table for the game */
	position: number;
	/** User */
	user: IUser;
	/** Score */
	score: number;
}