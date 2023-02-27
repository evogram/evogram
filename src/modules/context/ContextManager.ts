import { Evogram } from "../../Client";

/** A class representing a ContextManager used to manage and manipulate contexts. */
export class ContextManager {
	/**
	 * Create a new ContextManager.
	 * @param client - The Evogram client instance.
	 */
	constructor(private client: Evogram) {}

	/** An object containing all the contexts. */
	private contexts: { [key: string]: any } = {};
  
	/**
	 * Set the context for a given key.
	 * @param key - The key to set the context for.
	 * @param context - The class to set as the context.
	 */
	public setContext(key: string, context: any): this {
		this.contexts[key] = context;
		return this;
	}
  
	/**
	 * Get the context for a given key.
	 * @param {string} key - The key to get the context for.
 	 * @param {object} data - The data to use when creating a new context.
	 * @return {T} The context for the given key or the data if the context is not found.
	 */
	public getContext<T extends object = any>(key: string, data: object): T {
		const Context = this.contexts[key];
	  	return Context ? new Context(this.client, data) : data;
	}

	/**
	 * Delete the context for a given key.
	 * @param {string} key - The key to delete the context for.
	 */
	public deleteContext(key: string): this {
	  	delete this.contexts[key];
		return this;
	}
}