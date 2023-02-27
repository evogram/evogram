import { Evogram } from "../../Client";

export class Context<T> {
	constructor(protected client: Evogram, public source: T) {}
}