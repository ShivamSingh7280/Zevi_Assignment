export const structureQueryParams = (params) => {
	let queryStrings = "?";
	const keys = Object.keys(params);
	keys.forEach((key, index) => {
		queryStrings += key + "=" + params[key];
		if (params[keys[index + 1]]) {
			queryStrings += "&";
		}
	});
	return queryStrings;
};

export const extractQueryParams = () => {
	let {
		location: { search: queryParamString },
	} = window;
	let params = {};
	if (queryParamString.length > 1 && queryParamString.indexOf("?") > -1) {
		queryParamString = queryParamString.replace("?", "");
		queryParamString = decodeURIComponent(queryParamString);
		if (queryParamString.indexOf("&") === -1) {
			// Contains only one param
			const paramParts = queryParamString.split("=");
			params[paramParts[0]] = paramParts[1];
		} else {
			// Contains multiple params
			const queryParams = queryParamString.split("&");
			queryParams.forEach((queryParam) => {
				const paramParts = queryParam.split("=");
				params[paramParts[0]] = paramParts[1];
			});
		}
	}
	return params;
};

export const extractMaxMinPrice = (priceRange) => {
	const tempArr = priceRange?.split("-");
	return { price_min: tempArr[0], price_max: tempArr[1] };
};
