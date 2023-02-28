import { IChatLocation, IChatPermissions, IChatPhoto, IMessage } from "../../interfaces";
import { ChatContext } from "./ChatContext";

export class DetailedChatContext extends ChatContext {
	/* The chat's photo object. */
	public photo = this.source.photo && this.client.contexts.getContext<IChatPhoto>("ChatPhoto", this.source.photo);
	/** The chat's pinned message object. */
	public pinnedMessage = this.source.pinned_message && this.client.contexts.getContext<IMessage>("Message", this.source.pinned_message);
	/** The chat's permissions object. */
	public permissions = this.source.permissions && this.client.contexts.getContext<IChatPermissions>("ChatPermissions", this.source.permissions);
	/** The chat's location object. */
	public location = this.source.location && this.client.contexts.getContext<IChatLocation>("ChatLocation", this.source.location);

	/** An array of usernames of the chat's currently active users. */
	public get activeUsers() { return this.source.active_usernames }
	/** The custom emoji status of the chat. */
	public get customEmojiStatus() { return this.source.emoji_status_custom_emoji_id }
	/** The description or bio of the chat. */
	public get description() { return this.source.bio || this.source.description }
	/** Whether the chat has private forwards enabled. */
	public get hasPrivateForwards() { return this.source.has_private_forwards }
	/** Whether the chat has restricted voice and video messages enabled. */
	public get hasRestrictedVoiceAndVideoMessages() { return this.source.has_restricted_voice_and_video_messages }
	/** Whether users need to be invited to the chat to send messages. */
	public get joinToSendMessages() { return this.source.join_to_send_messages }
	/** Whether users can join the chat by request. */
	public get joinByRequest() { return this.source.join_by_request }
	/** The invite link of the chat. */
	public get inviteLink() { return this.source.invite_link }
	/** The delay for slow mode in the chat. */
	public get slowModeDelay() { return this.source.slow_mode_delay }
	/** The time in seconds after which messages are automatically deleted. */
	public get messageAutoDeleteTime() { return this.source.message_auto_delete_time }
	/** Whether aggressive anti-spam measures are enabled in the chat. */
	public get hasAggressiveAntiSpamEnabled() { return this.source.has_aggressive_anti_spam_enabled }
	/** Whether the chat has hidden members. */
	public get hasHiddenMembers() { return this.source.has_hidden_members }
	/** Whether the chat has protected content. */
	public get hasProtectedContent() { return this.source.has_protected_content }
	/** The name of the sticker set used in the chat. */
	public get stickerSetName() { return this.source.sticker_set_name }
	/** Whether the user can set a sticker set for the chat. */
	public get canSetStickerSet() { return this.source.can_set_sticker_set }
	/** The ID of the linked chat (for channels only). */
	public get linkedChatID() { return this.source.linked_chat_id }
}