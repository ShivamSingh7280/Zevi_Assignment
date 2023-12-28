import React, { useEffect, useRef, useState } from "react";
import styles from "./ExplorePage.module.css";
import SearchIcon from "../../assets/SearchIcon.svg";
import { PRICE_RANGE } from "../../config";
import { Grid } from "@mui/material";
import ExploreCards from "../ExploreCards/ExploreCards";
import { useNavigate } from "react-router-dom";
import { exploreProducts, getProductsCategories } from "../../https/http-calls";
import { extractMaxMinPrice } from "../../helper/helper-methods";

const ExplorePage = () => {
	const navigate = useNavigate();

	const searchRef = useRef(null);

	const [filters, setFilters] = useState({});
	const [exploreCardsData, setExploreCardsData] = useState([]);
	const [productsCategories, setProductsCategories] = useState([]);

	const _fetchExploreCardProducts = async (payload) => {
		try {
			const response = await exploreProducts(payload);
			setExploreCardsData(response?.length ? response : []);
		} catch (error) {
			console.log(error);
		}
	};

	const _redirectToHomePage = () => {
		navigate("/");
	};

	const _createPayload = (newFilters) => {
		const payload = {};

		Object.keys(newFilters).forEach((key) => {
			if (key === "priceRange") {
				const { price_min, price_max } = extractMaxMinPrice(newFilters[key]);
				payload["price_min"] = price_min;
				payload["price_max"] = price_max;
			} else {
				payload[key] = newFilters?.[key];
			}
		});

		return payload;
	};

	const _onFilterChange = (key, value) => {
		const newFilters = { ...filters };
		newFilters[key] = value;
		setFilters(newFilters);

		const payload = _createPayload(newFilters);

		if (key === "title") {
			if (searchRef?.current) clearTimeout(searchRef?.current);

			searchRef.current = setTimeout(() => {
				_fetchExploreCardProducts(payload);
			}, 1000);
		} else {
			_fetchExploreCardProducts(payload);
		}
	};

	const _fetchProductCategories = async () => {
		try {
			const res = await getProductsCategories();
			setProductsCategories(res);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		_fetchExploreCardProducts(filters);
		_fetchProductCategories();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div className={styles.explorePageContainer}>
			<div className={styles.exploreSearchContainer}>
				<input
					type="text"
					placeholder="Search"
					value={filters?.title || ""}
					onChange={(e) => _onFilterChange("title", e.target.value)}
				/>
				<span className={styles.searchIcon}>
					<img src={SearchIcon} alt="icon" height={30} width={30} />
				</span>

				<span className={styles.logo} onClick={_redirectToHomePage}></span>
			</div>

			<div className={styles.contentContainer}>
				<div className={styles.filterSection}>
					<p className={styles.filterHeading}>Search Results</p>

					<div className={styles.filters}>
						<div className={styles.priceRange}>
							<p className={styles.checkboxHeading}>Price Range</p>
							{PRICE_RANGE?.map((item, index) => (
								<div key={index}>
									<input
										type="radio"
										name="priceRange"
										value={item?.range}
										onClick={() => _onFilterChange("priceRange", item?.range)}
									/>
									<label className={styles.subHeading} htmlFor={item?.range}>
										{item?.range}
									</label>
								</div>
							))}
						</div>

						<div className={styles.categories}>
							<p className={styles.checkboxHeading}>Categories</p>

							{productsCategories?.length ? (
								productsCategories?.map((item, index) => (
									<div key={index}>
										<input
											type="radio"
											name="productCategory"
											value={item?.id}
											id={item?.id}
											onClick={() => _onFilterChange("categoryId", item?.id)}
										/>
										<label className={styles.subHeading} htmlFor={item?.id}>
											{item?.name}
										</label>
									</div>
								))
							) : (
								<p>Loading Categories...</p>
							)}
						</div>
					</div>
				</div>

				<div className={styles.cardSection}>
					{exploreCardsData.length ? (
						<div className={styles.gridContainer}>
							<Grid container rowSpacing={1} columnSpacing={1}>
								{exploreCardsData?.map((card, index) => (
									<Grid item xs={2} sm={3} md={3} key={index}>
										<span>
											<ExploreCards cardData={card} />
										</span>
									</Grid>
								))}
							</Grid>
						</div>
					) : (
						<div className={styles.noProductFound}>No Product Found</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default ExplorePage;
