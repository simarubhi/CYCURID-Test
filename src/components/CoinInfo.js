import { useEffect, useState } from 'react';
import axios from 'axios';
import Add from '../assets/AddFavourite.png';
import '../sass/CoinInfo.scss';

const CoinInfo = props => {
	const [data, setData] = useState();
	const [dataLoading, setDataLoading] = useState(true);

	// Getting selected coin info
	useEffect(() => {
		setDataLoading(true);
		axios
			.get(
				`https://api.coingecko.com/api/v3/coins/markets?vs_currency=cad&ids=${props.selectedCoin}`
			)
			.then(res => {
				setData(res.data[0]);
				setDataLoading(false);
			});
	}, [props.selectedCoin]);

	if (dataLoading) {
		return (
			<div className='coin-info loading'>
				<div className='heading'>
					<h3 className='coin-name'>Loading...</h3>
				</div>
			</div>
		);
	}

	return (
		<div className='coin-info'>
			<div className='heading'>
				<img className='logo' src={data.image} alt='Logo'></img>
				<h3 className='coin-name'>{data.name.toUpperCase()}</h3>
			</div>

			<div className='info-container'>
				<div className='info'>
					<span>Current Price:</span>
					<span>${data.current_price}</span>
				</div>
				<div className='info'>
					<span>Market Cap:</span>
					<span>{data.market_cap}</span>
				</div>
				<div className='info'>
					<span>Low 24H:</span>
					<span>${data.low_24h}</span>
				</div>
				<div className='info'>
					<span>High 24H:</span>
					<span>${data.high_24h}</span>
				</div>
				<div className='info'>
					<span>Circulating Supply:</span>
					<span>{data.circulating_supply}</span>
				</div>
				<div className='info'>
					<span>Total Supply:</span>
					<span>{data.total_supply}</span>
				</div>
				<div className='info'>
					<span>Market Cap Rank:</span>
					<span>{data.market_cap_rank}</span>
				</div>

				<div
					className='add-favourites'
					onClick={() => {
						// Lifting props (Favourite Coin Data) to TradeSection.js
						props.sendFavouriteCoin(data);
					}}
				>
					<img className='symbol' src={Add} alt='Add Symbol'></img>
					<span className='add-text'>ADD TO FAVOURITES</span>
				</div>
			</div>
		</div>
	);
};

export default CoinInfo;
