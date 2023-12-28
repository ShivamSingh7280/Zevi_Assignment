import { Route, Routes } from "react-router-dom";
import "./App.css";
import ExplorePage from "./components/ExplorePage/ExplorePage";
import HomePage from "./components/HomePage/HomePage";

function App() {
	return (
		<Routes>
			<Route path="/" element={<HomePage />} />

			<Route path="/explore" element={<ExplorePage />} />

			<Route path="/*" element={<HomePage />} />
		</Routes>
	);
}

export default App;
