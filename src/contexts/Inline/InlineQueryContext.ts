import { IAnswerInlineQueryParams, IInlineQuery, IInlineQueryResult } from "../../interfaces";
import { Context } from "../../modules/context";
import { UserContext } from "../Essence";
import { LocationContext } from "../LocationContext";

export class InlineQueryContext extends Context<IInlineQuery> {
	/** Sender */
	public user = this.client.contexts.getContext<UserContext>("User", this._source.from);
	/** Sender location, only for bots that request user location */
	public location = this._source.location && this.client.contexts.getContext<LocationContext>("Location", this._source.location);

	
	/** Unique identifier for this query */
	public get id() { return this._source.id }

	/** Text of the query (up to 256 characters) */
	public get query() { return this._source.query }

	/** Offset of the results to be returned, can be controlled by the bot */
	public get offset() { return this._source.offset }

	/** Type of the chat from which the inline query was sent */
	public get chatType() { return this._source.chat_type }


	/** Internal implementation of the answer method */
	public answer(results: IInlineQueryResult[], params?: Partial<IAnswerInlineQueryParams>): Promise<true>;
	public answer(params: { inline_query_id?: string } & IAnswerInlineQueryParams): Promise<true>;
	public answer(results: any, params?: any): Promise<true> {
		if(params && !params.results) params.results = results;
		else if(!params) params = { results };
		
		return this.client.api.answerInlineQuery(Object.assign({ inline_query_id: this._source.id }, params));
	}
}