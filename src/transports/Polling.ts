import type { IGetUpdatesParams } from "../interfaces";
import { EventTransport, EventTransportState } from "./EventTransport";

export class Polling extends EventTransport {
	public async start(params?: IGetUpdatesParams) {
		this.state = EventTransportState.Enabled;
		return this.worker(params);
	}

	public stop() {
		this.state = EventTransportState.Disabled;
	}

	private async worker(params: IGetUpdatesParams = {}) {
		try {
			for (let update of await this.client.api.getUpdates(Object.assign(params, { allowed_updates: Object.keys(this.handler.handlers) }))) {
				await this.handler.onUpdate(update);
				params.offset = update.source.update_id+1;
			}
		} catch(error) {
			console.error(error);
		} finally {
			if(this.state === EventTransportState.Enabled) this.worker(params);
		}
	}
}