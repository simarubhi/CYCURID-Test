import { useState, useEffect } from 'react';
import Favourites from './components/Favourites';
import AllCoins from './components/AllCoins';
import TradeSection from './components/TradeSection';
import './sass/App.scss';

function App() {
	const [tradeSectionOpen, setTradeSectionOpen] = useState(false);
	const [coin, setCoin] = useState();
	const [favouriteCoin, setFavouriteCoin] = useState();

	return (
		<div className='container'>
			<Favourites favouriteCoin={favouriteCoin} />
			<AllCoins
				checkTradeSectionOpen={status => setTradeSectionOpen(status)}
				coinInfo={coinId => setCoin(coinId)}
			/>
			<TradeSection
				showInfo={tradeSectionOpen}
				selectedCoin={coin}
				newFavouriteCoin={coin => setFavouriteCoin(coin)}
			/>
		</div>
	);
}

export default App;
