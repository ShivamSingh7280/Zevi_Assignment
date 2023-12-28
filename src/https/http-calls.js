import { BASE_URL } from "../config";
import { makeGetRequest } from "./https-service";

export const exploreProducts = (payload) => {
	return new Promise(async (resolve) => {
		try {
			const res = await makeGetRequest(`${BASE_URL}/products/`, payload);
			resolve(res);
		} catch (error) {
			console.log(error);
		}
	});
};

export const getProductsCategories = () => {
	return new Promise(async (resolve) => {
		try {
			const res = await makeGetRequest(`${BASE_URL}/categories`);
			resolve(res);
		} catch (error) {
			console.log(error);
		}
	});
};
