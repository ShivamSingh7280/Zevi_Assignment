import React, { useState } from "react";
import styles from "./HomePage.module.css";
import SuggestedSearch from "../SuggestedSearch/SuggestedSearch";
import SearchIcon from "../../assets/SearchIcon.svg";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
	const navigate = useNavigate();

	const [isSearchBarFocused, setIsSearchBarFocused] = useState(false);
	const [searchValue, setSearchValue] = useState("");

	const _handleSearchBarFocus = () => {
		setIsSearchBarFocused((prev) => !prev);
	};

	const _handleSubmit = (e) => {
		if (e) e.preventDefault();

		_redirectToExplorePage();
	};

	const _handleOnChange = (value) => {
		setSearchValue(value);
	};

	const _redirectToExplorePage = () => {
		navigate("/explore");
	};

	return (
		<div className={styles.homePageContainer}>
			<span className={styles.logo}></span>

			<div className={styles.searchContainer}>
				<div className={styles.searchBarContainer}>
					<form onSubmit={() => _handleSubmit()}>
						<input
							type="text"
							placeholder="Search Products..."
							value={searchValue}
							onChange={(e) => _handleOnChange(e.target.value)}
							onFocus={_handleSearchBarFocus}
							onBlur={_handleSearchBarFocus}
						/>
						<span
							className={styles.searchIcon}
							onClick={(e) => _handleSubmit(e)}>
							<img src={SearchIcon} alt="icon" height={30} width={30} />
						</span>
					</form>
				</div>
			</div>

			{isSearchBarFocused ? (
				<div className={styles.suggestedSearchContainer}>
					<SuggestedSearch />
				</div>
			) : (
				<></>
			)}
		</div>
	);
};

export default HomePage;
