import { IChat, ICreateChatInviteLinkParams, IInputFile } from "../../interfaces";
import { Context } from "../../modules/context";
import { ChatInviteLinkContext } from "./ChatInviteLink";
import { DetailedChatContext } from "./DetailedChatContext";

export class ChatContext extends Context<IChat> {
	/** The ID of the chat. */
	public get id() { return this.source.id }
	/** The type of the chat. */
	public get type() { return this.source.type }
	/** The title of the chat, or its username, or the concatenation of its first_name and last_name. */
	public get title() { return this.source.title || this.source.username || [this.source.first_name, this.source.last_name].join(" ").trimEnd() }
	/** Whether the chat is a forum. */
	public get isForum() { return this.source.is_forum }


	/**
	 * Calls the exportChatInviteLink method of the api object to export an invite link for the chat.
	 * @returns A Promise that resolves to the invite link.
	 */
	public exportInviteLink() {
		return this.client.api.exportChatInviteLink({ chat_id: this.source.id });
	}

	/**
	 * Calls the createChatInviteLink method of the api object to create a new invite link for the chat.
	 * @param [params] Optional parameters for creating the invite link.
	 * @returns A Promise that resolves to the new invite link.
	 */
	public createInviteLink<T extends object = ChatInviteLinkContext>(params?: Partial<ICreateChatInviteLinkParams>): Promise<T> {
		return this.client.api.createChatInviteLink({ chat_id: this.source.id, ...params });
	}

	/**
	 * Calls the setChatPhoto method of the api object to set the chat photo.
	 * @param photo The photo to set, represented as a URL or Buffer object.
	 * @returns A Promise that resolves to true if the photo was successfully set.
	 */
	public setPhoto(photo: IInputFile) {
		return this.client.api.setChatPhoto({ chat_id: this.source.id, photo });
	}

	/**
	 * Calls the setChatTitle method of the api object to set the chat title.
	 * @param title The new title of the chat.
	 * @returns A Promise that resolves to true if the title was successfully set.
	 */
	public setTitle(title: string) {
		return this.client.api.setChatTitle({ chat_id: this.source.id, title });
	}

	/**
	 * Calls the setChatDescription method of the api object to set the chat description.
	 * @param [description] Optional new description of the chat.
	 * @returns A Promise that resolves to true if the description was successfully set.
	 */
	public setDescription(description?: string) {
		return this.client.api.setChatDescription({ chat_id: this.source.id, description });
	}

	/**
	 * Calls the leaveChat method of the api object to leave the chat.
	 * @returns A Promise that resolves to true if the chat was successfully left.
	 */
	public leave() {
		return this.client.api.leaveChat({ chat_id: this.source.id });
	}

	#detailedChat: any = null;
	public async getChat<T extends object = DetailedChatContext>(): Promise<T> {
		if(this.#detailedChat) return this.#detailedChat;

		this.#detailedChat = await this.client.api.getChat({ chat_id: this.source.id });
		return this.#detailedChat;
	}
}
