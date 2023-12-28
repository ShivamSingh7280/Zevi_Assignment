import React from "react";
import styles from "./SearchBar.module.css";
import SearchIcon from "../../assets/SearchIcon.svg";

const SearchBar = ({ handleSearchBar }) => {
	return (
		<div className={styles.searchBarContainer}>
			<input type="text" placeholder="Search" onChange={handleSearchBar} />
			<span className={styles.searchIcon}>
				<img src={SearchIcon} alt="icon" height={30} width={30} />
			</span>
		</div>
	);
};

export default SearchBar;
