import { IChatJoinRequest } from "../../interfaces";
import { Context } from "../../modules/context";
import { UserContext } from "../Essence";
import { ChatContext } from "./ChatContext";
import { ChatInviteLinkContext } from "./ChatInviteLinkContext";

export class ChatJoinRequestContext extends Context<IChatJoinRequest> {
	/** The chat the join request was sent to. */
	public chat = this.client.contexts.getContext<ChatContext>("Chat", this.source.chat);
	/** The user who sent the join request. */
	public user = this.client.contexts.getContext<UserContext>("User", this.source.from);
	/** The invite link used to send the join request. Undefined if no invite link was used. */
	public link = this.source.invite_link && this.client.contexts.getContext<ChatInviteLinkContext>("ChatInviteLink", Object.assign(this.source.invite_link, { chat_id: this.source.chat.id }));
	/** The date when the join request was sent. */
	public date = new Date(this.source.date);

	/** Returns the ID of the user in the chat. */
	public get userChatID() { return this.source.user_chat_id }
	/** Returns the user's bio. */
	public get bio() { return this.source.bio }


	/**
	 * Approves the chat join request.
	 * @returns Promise that resolves with true on success, or rejects with an error on failure.
	 */
	public approve() {
		return this.client.api.approveChatJoinRequest({ chat_id: this.source.chat.id, user_id: this.source.from.id });
	}

	/**
	 * Declines the chat join request.
	 * @returns Promise that resolves with true on success, or rejects with an error on failure.
	 */
	public decline() {
		return this.client.api.declineChatJoinRequest({ chat_id: this.source.chat.id, user_id: this.source.from.id });
	}
}
