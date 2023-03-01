import { Evogram } from "../../Client";
import { BotContext, CallbackQueryContext, ChatContext, ChatInviteLinkContext, ChatJoinRequestContext, ChatMemberAdministratorContext, ChatMemberBannedContext, ChatMemberContext, ChatMemberMemberContext, ChatMemberOwnerContext, ChatMemberRestrictedContext, ChatMemberUpdatedContext, ContactContext, DetailedChatContext, InlineQueryContext, LocationContext, OrderInfoContext, PollAnswerContext, PollContext, PreCheckoutQueryContext, ShippingQueryContext, UpdateContext, UserContext } from "../../contexts";
import { Context } from "./Context";

export type ISupportedContexts = "Update" | "User" | "Bot" | "Poll" | "PollAnswer" | "OrderInfo" | "PreCheckoutQuery" | "ShippingQuery" | "Contact" | "Chat" | "DetailedChat" | "ChatInviteLink" | "MessageEntity" | "Message" | "InlineQuery" | "ChosenInlineResult" | "CallbackQuery" | "ChatMemberUpdated" | "ChatJoinRequest" | "ChatPhoto" | "ChatPermissions" | "ChatLocation" | "ShippingAddress" | "BotCommand" | "PollOption" | "MenuButton" | "ChatAdministratorRights" | "ChatMember" | "ChatMemberOwner" | "ChatMemberAdministrator" | "ChatMemberMember" | "ChatMemberRestricted" | "ChatMemberBanned" | "Location";

/** A class representing a ContextManager used to manage and manipulate contexts. */
export class ContextManager {
	/**
	 * Create a new ContextManager.
	 * @param client - The Evogram client instance.
	 */
	constructor(private client: Evogram) {}

	/** An object containing all the contexts. */
	private contexts: { [key in ISupportedContexts]?: any } = {
		"Update": UpdateContext,
		"User": UserContext,
		"Bot": BotContext,
		"Poll": PollContext,
		"PollAnswer": PollAnswerContext,
		"OrderInfo": OrderInfoContext,
		"PreCheckoutQuery": PreCheckoutQueryContext,
		"ShippingQuery": ShippingQueryContext,
		"Contact": ContactContext,
		"Chat": ChatContext,
		"DetailedChat": DetailedChatContext,
		"ChatInviteLink": ChatInviteLinkContext,
		"ChatJoinRequest": ChatJoinRequestContext,
		"ChatMember": ChatMemberContext,
		"ChatMemberAdministrator": ChatMemberAdministratorContext,
		"ChatMemberBanned": ChatMemberBannedContext,
		"ChatMemberMember": ChatMemberMemberContext,
		"ChatMemberOwner": ChatMemberOwnerContext,
		"ChatMemberRestricted": ChatMemberRestrictedContext,
		"ChatMemberUpdated": ChatMemberUpdatedContext,
		"CallbackQuery": CallbackQueryContext,
		"Location": LocationContext,
		"InlineQuery": InlineQueryContext
	};
  
	/**
	 * Set the context for a given key.
	 * @param key - The key to set the context for.
	 * @param context - The class to set as the context.
	 */
	public setContext(key: ISupportedContexts, context: any): this {
		this.contexts[key] = context;
		return this;
	}
  
	/**
	 * Get the context for a given key.
	 * @param {string} key - The key to get the context for.
 	 * @param {object} data - The data to use when creating a new context.
	 * @return {T} The context for the given key or the data if the context is not found.
	 */
	public getContext<T extends Context<any> | object>(key: ISupportedContexts, data: object): T {
		const context = this.contexts[key];
	  	return context ? new context(this.client, data) : data;
	}

	/**
	 * Delete the context for a given key.
	 * @param {string} key - The key to delete the context for.
	 */
	public deleteContext(key: ISupportedContexts): this {
	  	delete this.contexts[key];
		return this;
	}
}