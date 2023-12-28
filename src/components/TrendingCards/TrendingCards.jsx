import React from "react";
import styles from "./TrendingCards.module.css";
import {
	Card,
	CardActionArea,
	CardContent,
	CardMedia,
	Typography,
} from "@mui/material";

const TrendingCards = ({ cardData }) => {
	const { images, title } = cardData;
	return (
		<div className={styles.cardContainer}>
			<Card sx={{ maxWidth: 175, height: 180 }}>
				<CardActionArea>
					<CardMedia
						component="img"
						height="100"
						image={images[0]}
						alt={title}
					/>

					<CardContent>
						<Typography variant="body2">{title}</Typography>
					</CardContent>
				</CardActionArea>
			</Card>
		</div>
	);
};

export default TrendingCards;
