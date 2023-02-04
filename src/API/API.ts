import { TelegramError } from ".";
import { fetch } from "../utils";

export class API {
	public url: string;

	constructor(public token: string) {
		this.url = "https://api.telegram.org/bot" + token;
	}

	public async call(method: string, params?: object): Promise<any> {
		const response: any = await fetch(`${this.url}/${method}`, params);

		if(!response?.ok) throw new TelegramError(response, { method, params });
		else return response;
	}
}

