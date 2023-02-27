import { API } from "../API";
import { Updates } from "../updates";

export enum EventTransportState {
	Enabled = 1,
	Disabled = 0
}

export abstract class EventTransport {
	public state = EventTransportState.Disabled;
	constructor(protected api: API, protected handler: Updates) {}

	public abstract start(params: any, handle: any): void;
	public abstract stop(): void;
}