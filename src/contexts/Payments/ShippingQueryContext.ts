import { IAnswerShippingQueryParams, IShippingAddress, IShippingQuery } from "../../interfaces";
import { Context } from "../../modules/context";
import { UserContext } from "../Essence/UserContext";

export class ShippingQueryContext extends Context<IShippingQuery> {
	/** The user who sent the shipping query */
	public user = this.client.contexts.getContext<UserContext>("User", this.source.from);
	/** The unique identifier for the shipping query */
	public get id() { return this.source.id }
	/** The invoice payload associated with the shipping query */
	public get payload() { return this.source.invoice_payload }
	/** The shipping address associated with the shipping query */
	public get shippingAddress() { return this.client.contexts.getContext<IShippingAddress>("ShippingAddress", this.source.shipping_address) }

	
    /**
     * Answer the shipping query
     * @param ok - Whether the query was successful
     * @param params - Additional parameters for the response
     * @returns A Promise that resolves with a boolean indicating success or failure
     */
	public answer(ok: boolean, params?: Partial<IAnswerShippingQueryParams>) {
		return this.client.api.answerShippingQuery(Object.assign({ ok, shipping_query_id: this.source.id }, params));
	}
}