import https from "https";
import url from "url";

export function fetch(uri: string, data?: any): Promise<object> {
	const postData = JSON.stringify(data);
	const { hostname, path } = url.parse(uri);

	return new Promise(resolve => {
		const req = https.request({
			method: "POST",
			hostname,
			path,
			headers: {
				'Content-Type': 'application/json; charset=UTF-8',
				'Content-Length': Buffer.byteLength(postData || "")
			}
		}, res => {
			const chunks: any = [];

        	res.on("data", chunk => chunks.push(chunk));
			res.on("end", () => resolve(JSON.parse(Buffer.concat(chunks).toString())));
		});

		if(postData) req.write(Buffer.from(postData, 'utf8'));
		req.end();
	});
}