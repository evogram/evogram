import { Context } from "../../modules/context";
import { IChatMember, IGetUserProfilePhotosParams, IUser } from "../../interfaces";
import { getCountryWithCode } from "../../utils";

export class UserContext extends Context<IUser & { chat_id?: number | string }> {
	/** Returns the user's ID. */
	public get id() { return this.source.id }
	/** Returns the user's first name. */
	public get firstname() { return this.source.first_name }
	/** Returns the user's last name. */
	public get lastname() { return this.source.last_name }
	/** Returns the user's username. */
	public get username() { return this.source.username }
	/** Returns whether the user is a bot. */
	public get isBot() { return this.source.is_bot }
	/** Returns whether the user is a premium user. */
	public get isPremium() { return this.source.is_premium }
	/** Returns the user's language code and country. */
	public get language() { return this.source.language_code && { code: this.source.language_code, country: getCountryWithCode(this.source.language_code) } }


	/** Returns the user's appeal, which is either their username or full name. */
	public get appeal() {
		return (this.username && `@${this.username}`) ?? this.fullname;
	}

	/** Returns the user's full name. */
	public get fullname() {
		return [this.source.first_name, this.source.last_name].join(" ").trimEnd();
	}


	/**
	 * Gets the user's profile photos.
	 * @param {Partial} [params] - Additional parameters for the API call.
	 * @returns The API response.
	 */
	public getProfilePhotos(params?: Partial<IGetUserProfilePhotosParams>) {
		return this.client.api.getUserProfilePhotos({ user_id: this.source.id, ...params });
	}

	#member: any;
	/**
	 * Gets the user's chat member object.
	 * @returns The chat member object or null if the user is not a member of a chat.
	*/
	public async getMember<T extends Context<IChatMember> | object = IChatMember>(): Promise<T | null> {
		if(!this.source.chat_id) return null;

		if(!this.#member) this.#member = await this.client.api.getChatMember({ chat_id: this.source.chat_id, user_id: this.source.id });
		return this.#member;
	}
}