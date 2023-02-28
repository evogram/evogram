import { Evogram } from "../../Client";

export class Context<T> {
	constructor(protected client: Evogram, protected _source: T) {}
	/**
	 * Converts the source object to a context object of a given type.
	 * @template TContext - Generic type parameter for the context object.
	 * @param {any} source - The source object to convert.
	 * @returns {TContext} The context object.
	 * 
	 * @example
	 * 	client.updates.on("message", message => {
	 * 		const user = message.toContext<CustomUserContext>(message.user);
	 * 		// Now user works correctly with your context
	 * 	})
	 */
	public toContext<TContext extends object>(source: any): TContext { return source }
}