import { API } from "./API";
import { Updates } from "./updates";

export interface IEvogramParams {
	token: string;
}

export class Evogram {
	public api: API;
	public updates: Updates;

	constructor(options: IEvogramParams) {
		this.api = new API(options.token);
		this.updates = new Updates(options.token);
	}
}