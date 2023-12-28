import React, { useEffect, useState } from "react";
import styles from "./SuggestedSearch.module.css";
import { Grid } from "@mui/material";
import { POPULAR_SUGGESTIONS, TrendingCards_API } from "../../config";
import TrendingCards from "../TrendingCards/TrendingCards";

const SuggestedSearch = () => {
	const [cardsData, setCardsData] = useState([]);

	const Limit = 6;

	const _fetchTrendingCardsData = async (limit) => {
		const response = await fetch(`${TrendingCards_API}&limit=${limit}`);
		const data = await response.json();
		setCardsData(data);
	};

	useEffect(() => {
		_fetchTrendingCardsData(Limit);
	}, []);

	return (
		<div className={styles.SuggestedSearchBoxContainer}>
			<p className={styles.heading}>Latest Trends</p>

			<div className={styles.gridContainer}>
				<Grid container rowSpacing={1} columnSpacing={1}>
					{cardsData?.map((card) => (
						<Grid item xs={2} sm={2} md={2} key={card?.id}>
							<span>
								<TrendingCards cardData={card} />
							</span>
						</Grid>
					))}
				</Grid>
			</div>

			<div className={styles.footerHeading}>
				<p className={styles.heading}>Popular suggestions</p>

				{POPULAR_SUGGESTIONS.map((item, index) => (
					<p key={index} className={styles.suggestions}>
						{item?.title}
					</p>
				))}
			</div>
		</div>
	);
};

export default SuggestedSearch;
