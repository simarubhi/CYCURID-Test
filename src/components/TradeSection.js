import { useState, useEffect } from 'react';
import CoinInfo from './CoinInfo';
import TradeForm from './TradeForm';
import '../sass/TradeSection.scss';

const TradeSection = props => {
	// Holds sendFavouriteCoin data
	const [data, setData] = useState();

	// Lifts props (sendFavouriteCoin) from CoinInfo.js to App.js
	useEffect(() => {
		props.newFavouriteCoin(data);
	});

	return (
		<section className='trade-section'>
			{props.showInfo ? (
				[
					<CoinInfo
						selectedCoin={props.selectedCoin}
						sendFavouriteCoin={data => setData(data)}
						key={1}
					/>,
					<TradeForm selectedCoin={props.selectedCoin} key={2} />,
				]
			) : (
				<div className='select-coin-message'>
					Select a coin to view more information
				</div>
			)}
		</section>
	);
};

export default TradeSection;
