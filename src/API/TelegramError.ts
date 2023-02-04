interface ErrorPayload {
	error_code: number
	description: string
	params?: object
  }

export class TelegramError extends Error {
	constructor(readonly response: ErrorPayload, readonly on = {}) {
	  	super(`${response?.error_code}: ${response?.description}`);
	}
  
	get code() {
	  	return this.response.error_code;
	}
  
	get description() {
	  	return this.response.description;
	}
  
	get params() {
	  	return this.response.params;
	}
  }