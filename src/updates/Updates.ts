import { ICallbackQuery, IChatJoinRequest, IChatMemberUpdated, IChosenInlineResult, IGetUpdatesParams, IInlineQuery, IMessage, IPoll, IPollAnswer, IPreCheckoutQuery, ISetWebhookParams, IShippingQuery, IUpdate, IUpdateName } from "../interfaces";
import { API } from "../API"
import { IncomingMessage, ServerResponse, Server, createServer } from "http";
import url from "url";

export type IUpdateHandler<T> = (data: T) => void;

export class Updates {
	private api: API;
	private webhookServer: Server | undefined;

	public handlers: { [updateName in IUpdateName]?: ((data: any) => void)[]} = {}

	constructor(token: string) {
		this.api = new API(token);
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

	private onUpdate(update: IUpdate) {
		//@ts-ignore
		this.handlers[Object.keys(update)[1]]?.map(handler => handler(update[Object.keys(update)[1]]));
	}

	public startLongpoll(params?: IGetUpdatesParams) {
		this.api.call("getUpdates", params).then(async (updates: IUpdate[]) => {
			for(const update of updates) this.onUpdate(update);
			this.startLongpoll({ timeout: 100, ...params, offset: updates[updates.length-1]?.update_id+1 || 0 });
		}).catch((error) => {
			console.error(error);
			this.startLongpoll(params);
		});
	}

	public startWebhook(params: ISetWebhookParams & { port?: number }) {
		const webhookURL = url.parse(params.url).pathname;
		this.webhookServer = createServer((req: IncomingMessage, res: ServerResponse) => {
			if(req.method !== "POST" || req.url !== webhookURL) return res.end();

			const chunks: any = [];

        	req.on("data", chunk => chunks.push(chunk));
			req.on("end", () => { this.onUpdate(JSON.parse(Buffer.concat(chunks).toString())); res.end() });
		});

		this.webhookServer.listen(params.port || 8080, () => {
			this.api.setWebhook(params).then(() => console.log(`🚀 Webhook server is listening on port ${params.port || 8080}`));
		});
	}
}