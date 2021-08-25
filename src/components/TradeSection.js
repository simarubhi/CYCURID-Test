import { useState } from 'react';
import CoinInfo from './CoinInfo';
import TradeForm from './TradeForm';
import '../sass/TradeSection.scss';

const TradeSection = () => {
	const [showInfo, setShowInfo] = useState(true);

	return (
		<section className='trade-section'>
			{showInfo ? (
				[<CoinInfo />, <TradeForm />]
			) : (
				<div className='select-coin-message'>
					Select a coin to view more information
				</div>
			)}
		</section>
	);
};

export default TradeSection;
