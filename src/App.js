import Favourites from './components/Favourites';
import AllCoins from './components/AllCoins';
import TradeSection from './components/TradeSection';
import './sass/App.scss';

function App() {
	return (
		<div className='container'>
			<Favourites />
			<AllCoins />
			<TradeSection />
		</div>
	);
}

export default App;
