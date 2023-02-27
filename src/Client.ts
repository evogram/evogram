import { API } from "./API";
import { Updates } from "./updates";

export interface IEvogramParams {
	token: string;
}

export class Evogram {
	public api: API;
	public updates: Updates;

	constructor(public options: IEvogramParams) {
		this.api = new API(this);
		this.updates = new Updates(this);
	}
}