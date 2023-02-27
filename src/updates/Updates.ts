import { ICallbackQuery, IChatJoinRequest, IChatMemberUpdated, IChosenInlineResult, IInlineQuery, IMessage, IPoll, IPollAnswer, IPreCheckoutQuery, IShippingQuery, IUpdateName } from "../interfaces";
import { Evogram } from "../Client";
import { Polling, Webhook } from "../transports";
import { UpdateContext } from "../contexts";

export type IUpdateHandler<T> = (data: T) => Promise<void> | void;

export class Updates {
	public polling: Polling;
	public webhook: Webhook;

	public handlers: { [updateName in IUpdateName]?: ((data: any) => Promise<void> | void)[]} = {}

	constructor(client: Evogram) {
		this.polling = new Polling(client, this);
		this.webhook = new Webhook(client, this);
	}

	public on(update: "message" | "edited_message" | "channel_post" | "edited_channel_post", handler: IUpdateHandler<IMessage>): this;
	public on(update: "inline_query", handler: IUpdateHandler<IInlineQuery>): this;
	public on(update: "chosen_inline_result", handler: IUpdateHandler<IChosenInlineResult>): this;
	public on(update: "callback_query", handler: IUpdateHandler<ICallbackQuery>): this;
	public on(update: "shipping_query", handler: IUpdateHandler<IShippingQuery>): this;
	public on(update: "pre_checkout_query", handler: IUpdateHandler<IPreCheckoutQuery>): this;
	public on(update: "poll", handler: IUpdateHandler<IPoll>): this;
	public on(update: "poll_answer", handler: IUpdateHandler<IPollAnswer>): this;
	public on(update: "my_chat_member" | "chat_member", handler: IUpdateHandler<IChatMemberUpdated>): this;
	public on(update: "chat_join_request", handler: IUpdateHandler<IChatJoinRequest>): this;
	public on(update: IUpdateName, handler: (data: any) => void): this {
		this.handlers[update] = (this.handlers[update] || []).concat(handler);
		return this;
	}

	public async onUpdate(update: UpdateContext) {
		if(!update.name || !this.handlers[update.name]) return;
		//@ts-ignore
		for(const handler of this.handlers[update.name]) await handler(update[update.name]);
	}
}