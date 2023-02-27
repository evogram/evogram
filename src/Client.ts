import { API } from "./API";
import { ContextManager } from "./modules/context/ContextManager";
import { Updates } from "./updates";

export interface IEvogramParams {
	token: string;
}

export class Evogram {
	public api: API;
	public updates: Updates;
	public contexts: ContextManager;

	constructor(public options: IEvogramParams) {
		this.api = new API(this);
		this.updates = new Updates(this);
		this.contexts = new ContextManager(this);
	}
}