import { IChatMemberUpdated } from "../../../interfaces";
import { Context } from "../../../modules/context";
import { UserContext, ChatContext, ChatInviteLinkContext, ChatMemberContext } from "../../";

export class ChatMemberUpdatedContext extends Context<IChatMemberUpdated> {
	/** The chat where the update happened. */
	public chat = this.client.contexts.getContext<ChatContext>("Chat", this._source.chat);
	/** The user who initiated the update. */
	public user = this.client.contexts.getContext<UserContext>("User", this._source.from);
	/** The invite link used to join the chat. */
	public link = this._source.invite_link && this.client.contexts.getContext<ChatInviteLinkContext>("ChatInviteLink", Object.assign(this._source.invite_link, { chat_id: this._source.chat.id }));
	/** The date when the update happened. */
	public date = new Date(this._source.date);
	/** The chat member before the update. */
	public oldChatMember = this.client.contexts.getContext<ChatMemberContext>("ChatMember", Object.assign(this._source.old_chat_member, { chat_id: this._source.chat.id }));
	/** The chat member after the update. */
	public newChatMember = this.client.contexts.getContext<ChatMemberContext>("ChatMember", Object.assign(this._source.new_chat_member, { chat_id: this._source.chat.id }));
}