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
				'Content-Type': 'application/json',
				'Content-Length': postData?.length || 0
			}
		}, res => {
			const chunks: any = [];

        	res.on("data", chunk => chunks.push(chunk));
			res.on("end", () => resolve(JSON.parse(Buffer.concat(chunks).toString())));
		});

		if(postData) req.write(postData);
		req.end();
	});
}