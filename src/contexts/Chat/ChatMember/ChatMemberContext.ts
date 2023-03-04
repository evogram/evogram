import type { IChatMember } from "../../../interfaces";
import { Context } from "../../../modules/context";
import { UserContext, ChatMemberAdministratorContext, ChatMemberBannedContext, ChatMemberMemberContext, ChatMemberOwnerContext, ChatMemberRestrictedContext } from "../../";

export class ChatMemberContext extends Context<IChatMember & { chat_id?: number | string }> {
	public source = this._source;

	/** The user of the chat member. */
	public user: UserContext = this.client.contexts.getContext<UserContext>("User", this._source.user);
	/** The status of the chat member, which can be any of the following: creator, administrator, member, restricted, left or kicked. */
	public get status() { return this._source.status }

	/** The creator of the chat if the status of the chat member is "creator". */
	public creator = (this._source.status === "creator" && this.client.contexts.getContext<ChatMemberOwnerContext>("ChatMemberOwner", this._source)) || undefined;
	/** The administrator of the chat if the status of the chat member is "administrator". */
	public administator = (this._source.status === "administrator" && this.client.contexts.getContext<ChatMemberAdministratorContext>("ChatMemberAdministrator", Object.assign(this._source, { chat_id: this._source.chat_id }))) || undefined;
	/** The member of the chat if the status of the chat member is "member". */
	public member = (this._source.status === "member" && this.client.contexts.getContext<ChatMemberMemberContext>("ChatMemberMember", Object.assign(this._source, { chat_id: this._source.chat_id }))) || undefined;
	/** The restricted chat member if the status of the chat member is "restricted". */
	public restricted = (this._source.status === "restricted" && this.client.contexts.getContext<ChatMemberRestrictedContext>("ChatMemberRestricted", Object.assign(this._source, { chat_id: this._source.chat_id }))) || undefined;
	/** The banned chat member if the status of the chat member is "kicked".*/
	public kicked = (this._source.status === "kicked" && this.client.contexts.getContext<ChatMemberBannedContext>("ChatMemberBanned", Object.assign(this._source, { chat_id: this._source.chat_id }))) || undefined;
}
