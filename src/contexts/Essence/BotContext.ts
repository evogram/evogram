import { IBotCommand, IChatAdministratorRights, IDeleteMyCommandsParams, IGetChatMenuButtonParams, IGetMyCommandsParams, IGetMyDefaultAdministratorRightsParams, IMenuButton, ISetChatMenuButtonParams, ISetMyCommandsParams, ISetMyDefaultAdministratorRightsParams } from "../../interfaces";
import { Context } from "../../modules/context";
import { UserContext } from "./UserContext";

export class BotContext extends UserContext {
	/**
	 * Retrieves the current list of the bot's commands.
	 * @param params Optional parameters to customize the behavior of the method.
	 * @returns A Promise that resolves to the current list of the bot's commands.
	 */
	public getCommands<T extends Context<IBotCommand> | object = IBotCommand>(params?: IGetMyCommandsParams) {
		return this.client.api.getMyCommands<T>(params);
	}

	/**
	 * Sets the bot's commands.
	 * @param commands An array of IBotCommand objects representing the new list of the bot's commands.
	 * @param params Optional parameters to customize the behavior of the method.
	 * @returns A Promise that resolves to true if the operation succeeded.
	 */
	public setCommands(commands: IBotCommand[], params?: Partial<ISetMyCommandsParams>): Promise<true>;

	/**
	 * Sets the bot's commands.
	 * @param params Optional parameters to customize the behavior of the method.
	 * @returns A Promise that resolves to true if the operation succeeded.
	 */
	public setCommands(params: ISetMyCommandsParams): Promise<true>;

	public setCommands(commands: any, params?: any): Promise<true> {
		if(params && !params.commands) params.commands = commands;
		else if(!params) params = { commands };

		return this.client.api.setMyCommands(params);
	}

	/**
	 * Deletes the bot's commands.
	 * @param params Optional parameters to customize the behavior of the method.
	 * @returns A Promise that resolves to true if the operation succeeded.
	 */
	public deleteCommands(params?: IDeleteMyCommandsParams) {
		return this.client.api.deleteMyCommands(params);
	}

	/**
	 * Sets the bot's menu button for a chat.
	 * @param params Optional parameters to customize the behavior of the method.
	 * @returns A Promise that resolves to true if the operation succeeded.
	 */
	public setChatMenuButton(params?: ISetChatMenuButtonParams) {
		return this.client.api.setChatMenuButton(params);
	}

	/**
	 * Retrieves the bot's menu button for a chat.
	 * @param params Optional parameters to customize the behavior of the method.
	 * @returns A Promise that resolves to the bot's menu button for the specified chat.
	 */
	public getChatMenuButton<T extends Context<IMenuButton> | object = IMenuButton>(params?: IGetChatMenuButtonParams) {
		return this.client.api.getChatMenuButton<T>(params);
	}

	/**
	 * Sets the bot's default administrator rights.
	 * @param params Optional parameters to customize the behavior of the method.
	 * @returns A Promise that resolves to true if the operation succeeded.
	 */
	public setDefaultAdministratorRights(params?: ISetMyDefaultAdministratorRightsParams) {
		return this.client.api.setMyDefaultAdministratorRights(params);
	}

	/**
	 * Retrieves the bot's default administrator rights.
	 * @param params Optional parameters to customize the behavior of the method.
	 * @returns A Promise that resolves to the bot's default administrator rights.
	 */
	public getDefaultAdministratorRights<T extends Context<IChatAdministratorRights> | object = IChatAdministratorRights>(params?: IGetMyDefaultAdministratorRightsParams) {
		return this.client.api.getMyDefaultAdministratorRights<T>(params);
	}
}
