import { Context } from "../../../modules/context";
import { IContact } from "../../../interfaces";
import { getCountryCodesWithPhone, getCountryWithCode, parseVCard } from "../../../utils";

export class ContactContext extends Context<IContact> {
	/** The contact's first name. */
	public get firstname() { return this._source.first_name }
	/** The contact's last name. */
	public get lastname() { return this._source.last_name }
	/** The contact's user ID. */
	public get userID() { return this._source.user_id }
	/** The contact's phone number. */
	public get phone() { return this._source.phone_number }
	/** The contact's full name, consisting of the first name and last name. */
	public get fullname() {
		return [this._source.first_name, this._source.last_name].join(" ").trimEnd();
	}

	/**
	 * An array of objects containing information about the countries
	 * associated with this contact's phone number.
     * @returns An array of objects containing country and code information.
	 */
	public country: Array<{ country: string | undefined, code: string }> = getCountryCodesWithPhone(this._source.phone_number).map(code => ({ country: getCountryWithCode(code), code }));

	/**
	 * The contact's vCard information, parsed from the vcard string if it exists.
     * @returns An object representing the contact's vCard information, or undefined if not available.
	 */
	public vCard = (this._source.vcard && parseVCard(this._source.vcard)) || undefined;
}