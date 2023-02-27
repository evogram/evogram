import { ICallbackQuery, IChatJoinRequest, IChatMemberUpdated, IChosenInlineResult, IInlineQuery, IMessage, IPoll, IPollAnswer, IPreCheckoutQuery, IShippingQuery, IUpdate, IUpdateName } from "../interfaces";
import { Evogram } from "../Client";
import { Polling, Webhook } from "../transports";

export type IUpdateHandler<T> = (data: T) => void;

export class Updates {
	public polling: Polling;
	public webhook: Webhook;

	public handlers: { [updateName in IUpdateName]?: ((data: any) => void)[]} = {}

	constructor(private client: Evogram) {
		this.polling = new Polling(client.api, this);
		this.webhook = new Webhook(client.api, this);
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

	public async onUpdate(update: IUpdate) {
		//@ts-ignore
		this.handlers[Object.keys(update)[1]]?.map(handler => handler(update[Object.keys(update)[1]]));
	}
}