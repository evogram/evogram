import { IChatMemberOwner } from "../../../interfaces"
import { Context } from "../../../modules/context"

export class ChatMemberOwnerContext extends Context<IChatMemberOwner> {
	/**
	 * Returns a boolean indicating whether the owner is anonymous.
	 * @returns `true` if the owner is anonymous, `false` otherwise.
	 */
	public get isAnonymous() { return this._source.is_anonymous }

	/** Returns the custom title of the owner. */
	public get customTitle() { return this._source.custom_title }
}