import React, { useState } from "react";
import styles from "./ExploreCards.module.css";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";

const ExploreCards = ({ cardData }) => {
	const [isWishlist, setIsWishlist] = useState(false);

	const _handleWishlist = () => {
		setIsWishlist((prev) => !prev);
	};

	const { title, price, images, category } = cardData;

	return (
		<div className={styles.exploreCardContainer}>
			<Card
				sx={{ maxWidth: 345, height: 345 }}
				className={styles.cardContainer}>
				<CardMedia
					sx={{ height: 200 }}
					image={images?.[0]}
					title={title}
					className={styles.imgContainer}
				/>

				<span className={styles.viewProduct}>View Product</span>

				<span className={styles.wishlistContainer} onClick={_handleWishlist}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						width="30"
						height="30"
						strokeWidth="0.8"
						fill={isWishlist ? "red" : "transparent"}
						stroke={isWishlist ? "red" : "white"}
						strokeLinecap="round"
						strokeLinejoin="round">
						<path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3 9 3 10.38 3.74 11 5.08 11.62 3.74 13 3 14.5 3 17.58 3 20 5.42 20 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
					</svg>
				</span>

				<CardContent>
					<Typography gutterBottom variant="h6">
						{title}
					</Typography>
					<Typography variant="body1" color="text.primary">
						Price : {price} INR
					</Typography>
					<Typography variant="body1" color="text.primary" sx={{ mt: 1 }}>
						Category : {category?.name}
					</Typography>
				</CardContent>
			</Card>
		</div>
	);
};

export default ExploreCards;
