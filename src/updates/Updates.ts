import { EventEmitter } from "stream";
import { API } from "..";

export class Updates extends EventEmitter {
	private api: API;

	constructor(token: string) {
		super();
		this.api = new API(token);
	}

	public startLongpoll(params?: any) {
		this.api.call("getUpdates", params).then(async response => {
			for(const update of response.result) this.emit(Object.keys(update)[1], update[Object.keys(update)[1]]);

			this.startLongpoll({ timeout: 100, ...params, offset: response.result[response.result.length-1]?.update_id+1 || 0 });
		});
	}

	public startWebhook(params?: any) {
		
	}
}