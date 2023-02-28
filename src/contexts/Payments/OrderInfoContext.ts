import { IOrderInfo, IShippingAddress } from "../../interfaces";
import { Context } from "../../modules/context";
import { getCountryCodesWithPhone, getCountryWithCode } from "../../utils";

export class OrderInfoContext extends Context<IOrderInfo> {
	/** Returns the name associated with the order. */
	public get name() { return this.source.name }
	/** Returns the email associated with the order. */
	public get email() { return this.source.email }
	/** Returns the shipping address associated with the order. */
	public get address() { return this.source.shipping_address && this.client.contexts.getContext<IShippingAddress>("ShippingAddress", this.source.shipping_address) }

	/**
	 * Returns an object that contains the phone number and country code associated with the order.
	 * If the `phone_number` property of the `source` property is not defined, returns `undefined`.
	 * @property number - The phone number associated with the order.
	 * @property country - An array of objects that contain the name of the country and the country code associated with the phone number.
	 */
	public phoneNumber = (this.source.phone_number && {
		number: this.source.phone_number,
		country: getCountryCodesWithPhone(this.source.phone_number).map(code => ({ country: getCountryWithCode(code), code }))
	}) || undefined;
}
