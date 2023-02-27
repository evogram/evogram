export interface IVCard {
	name?: {
		firstname?: string;
		lastname?: string;
		patronymic?: string;
		prefix?: string;
		suffix?: string;
	},
	email?: Array<{ type?: "HOME" | "WORK" | string, value: string, isPreferred: boolean }>;
	telephone?: Array<{ type?: "CELL" | "WORK" | "VOICE" | "HOME" | "PAGER" | "BBS" | "CAR" | "MODEM" | "ISDN" | "PCS" | string, value: string, isPreferred: boolean }>;
	website?: Array<string>;
	address?: {
		subscriberBox?: string;
		extendedAddress?: string;
		houseAndStreet?: string;
		locality?: string;
		state?: string;
		zip?: string;
		country?: string;
		type?: "WORK" | "HOME" | "POSTAL" | "DOM" | "INTL" | "PARCEL" | string;
		isPreferred: boolean;
	}[],
	bday?: string;
	note?: string;
	org?: {
		name?: string;
		title?: string;
	}

	[key: string]: any;
}

export function decodeQuotedPrintable(encodedString: string): string {
	const byteSequence = encodedString.replace(/=\r\n/g, '').replace(/=([0-9A-F]{2})/g, (_, hex) => {
	  return String.fromCharCode(parseInt(hex, 16));
	});
  
	const decoder = new TextDecoder('utf-8');
	const decodedString = decoder.decode(new Uint8Array([...byteSequence].map((char) => char.charCodeAt(0))));
  
	return decodedString;
}
  
export function parseVCard(text: string) {
	const vCardContentMatch = text.match(/BEGIN:VCARD([\s\S]*?)END:VCARD/);
	if(!vCardContentMatch) return;

	const lines = vCardContentMatch[1].split("\n");
	let vCard: IVCard = {};
	
	for(const line of lines) {
		const match = line.match(/(.+?):(.+)/);
		if(!match) continue;

		let [, field, value] = match;
		value = decodeQuotedPrintable(value);

		const fieldSplit = field.split(";");
		const valueSplit = value.split(";");

		let isPreferred;
		switch(fieldSplit[0]) {
			case "N":
				vCard.name = {
					lastname: valueSplit[0] || undefined,
					firstname: valueSplit[1] || undefined,
					patronymic: valueSplit[2] || undefined,
					prefix: valueSplit[3] || undefined,
					suffix: valueSplit[4] || undefined
				}

				break;
			case "EMAIL":
				if(!vCard.email) vCard.email = [];

				isPreferred = fieldSplit[1] === "PREF";
				vCard.email.push({ type: fieldSplit.length > 2 ? fieldSplit[2] : fieldSplit[1], value, isPreferred });
				
				break;
			case "TEL":
				if(!vCard.telephone) vCard.telephone = [];

				isPreferred = fieldSplit[2] === "PREF";
				vCard.telephone.push({ type: fieldSplit[1] || undefined, value: value, isPreferred });

				break;
			case "URL":
				if(!vCard.website) vCard.website = [];
				vCard.website.push(value);

				break;
			case "ADR":
				if(!vCard.address) vCard.address = [];

				isPreferred = fieldSplit[1] === "PREF";
				vCard.address.push({
					subscriberBox: valueSplit[0] || undefined,
					extendedAddress: valueSplit[1] || undefined,
					houseAndStreet: valueSplit[2] || undefined,
					locality: valueSplit[3] || undefined,
					state: valueSplit[4] || undefined,
					zip: valueSplit[5] || undefined,
					country: valueSplit[6] || undefined,
					isPreferred,
					type: isPreferred ? fieldSplit[2] : fieldSplit[1]
				});

				break;
			case "BDAY":
				vCard.bday = value;

				break;
			case "NOTE":
				vCard.note = value;

				break;
			case "ORG":
				if(!vCard.org) vCard.org = {}
				vCard.org.name = value;
				
				break;
			case "TITLE":
				if(!vCard.org) vCard.org = {}
				vCard.org.title = value;

				break;
			default:
				vCard[field] = value;
		}
	}

	return vCard;
}