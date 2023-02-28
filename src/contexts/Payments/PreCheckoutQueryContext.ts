import { IPreCheckoutQuery } from "../../interfaces";
import { Context } from "../../modules/context";
import { UserContext } from "../Essence/UserContext";
import { OrderInfoContext } from "./OrderInfoContext";

export class PreCheckoutQueryContext extends Context<IPreCheckoutQuery> {
	/** Returns a `UserContext` object that represents the user who initiated the pre-checkout query. */
	public user = this.client.contexts.getContext<UserContext>("User", this.source.from);
	/** Returns the ID associated with the pre-checkout query. */
	public get id() { return this.source.id }
	/** Returns the currency code associated with the pre-checkout query. */
	public get currency() { return this.source.currency }
	/** Returns the total amount of the pre-checkout query. */
	public get amount() { return this.source.total_amount }
	/** Returns the invoice payload associated with the pre-checkout query. */
	public get payload() { return this.source.invoice_payload }
	/** Returns the ID of the shipping option selected by the user, if any. */
	public get shippingOptionID() { return this.source.shipping_option_id }

	/**
	 * Returns an `OrderInfoContext` object that represents the order information associated with the pre-checkout query.
	 * If the `order_info` property of the `source` property is not defined, returns `undefined`.
	 */
	public orderInfo = (this.source.order_info && this.client.contexts.getContext<OrderInfoContext>("OrderInfo", this.source.order_info));
}
