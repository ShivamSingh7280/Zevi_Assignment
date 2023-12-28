import { structureQueryParams } from "../helper/helper-methods";

export const makeGetRequest = async (url, params = null) => {
	let queryString = "";
	if (params) {
		queryString = structureQueryParams(params);
	}
	let headers = {
		Accept: "application/json",
		"Content-Type": "application/json",
	};

	return new Promise((resolve, reject) => {
		try {
			fetch(url + queryString, {
				method: "GET",
				headers: headers,
			})
				.then((res) => {
					return res.json();
				})
				.then((jsonResponse) => {
					if (jsonResponse) {
						resolve(jsonResponse);
					} else {
						console.log(jsonResponse);
						reject(jsonResponse);
					}
				})
				.catch((e) => {
					console.log("XHR GET Error: ", e);
					reject(e);
				});
		} catch (e) {
			console.log(e);
			reject();
		}
	});
};
