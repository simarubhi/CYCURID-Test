import { useState, useEffect } from 'react';
import CoinInfo from './CoinInfo';
import TradeForm from './TradeForm';
import '../sass/TradeSection.scss';

const TradeSection = props => {
	const [data, setData] = useState();

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
					/>,
					<TradeForm selectedCoin={props.selectedCoin} />,
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
