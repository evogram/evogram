import { API } from "./API";
import { ContextManager } from "./modules/context";
import { Updates } from "./updates";

/** Options for initializing the Evogram */
export interface IEvogramParams {
	token: string;
}

/** A class representing an instance of the Telegram bot. */
export class Evogram {
	/** An instance of the Telegram Bot API client. */
	public api: API;
	/** An instance of the Telegram updates client. */
	public updates: Updates;
	/** An instance of the ContextManager for managing and manipulating contexts. */
	public contexts: ContextManager;

	/**
	 * Create a new instance of the Evogram class.
	 * @param {IEvogramParams} options - The options for initializing the instance.
	 */
	constructor(public options: IEvogramParams) {
		this.api = new API(this);
		this.updates = new Updates(this);
		this.contexts = new ContextManager(this);
	}
}