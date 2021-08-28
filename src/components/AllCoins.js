import { useState, useEffect } from 'react';
import axios from 'axios';
import '../sass/AllCoins.scss';

const AllCoins = props => {
	const [data, setData] = useState();
	const [dataLoading, setDataLoading] = useState(true);

	const [coinsPerPage, setCoinsPerPage] = useState(10);

	// Updates when view more buttons clicked
	useEffect(() => {
		setDataLoading(true);
		axios
			.get(
				`https://api.coingecko.com/api/v3/coins/markets?vs_currency=cad&per_page=${coinsPerPage}`
			)
			.then(res => {
				setData(res.data);
				setDataLoading(false);
			});
	}, [coinsPerPage]);

	if (dataLoading) {
		return (
			<section className='all-coins'>
				<h2 className='heading'>Loading...</h2>
			</section>
		);
	}

	return (
		<section className='all-coins'>
			<h2 className='heading'>ALL COINS</h2>
			<table className='table'>
				<thead>
					<tr>
						<th>NAME</th>
						<th>TOTAL SUPPLY</th>
						<th>MARKET CAP</th>
						<th>CURRENT PRICE</th>
					</tr>
				</thead>
				<tbody>
					{data.map(coin => (
						<tr key={coin.id}>
							<td
								onClick={e => {
									// Lifting Props to App.js
									props.checkTradeSectionOpen(true);
									props.coinInfo(
										e.target.innerText.toLowerCase()
									);
								}}
							>
								{coin.id ? coin.id.toUpperCase() : 'Not Found'}
							</td>
							<td>
								{coin.total_supply
									? coin.total_supply
									: 'Not Found'}
							</td>
							<td>
								{coin.market_cap
									? coin.market_cap
									: 'Not Found'}
							</td>
							<td>
								{coin.current_price
									? `$${coin.current_price}`
									: 'Not Found'}
							</td>
						</tr>
					))}
				</tbody>
			</table>
			{/* Limit is 100 coins per page, if 100 coins view more buttons dispaly none */}
			{coinsPerPage !== 100 && (
				<div className='view-more-container'>
					<span
						className='view-more-btn'
						onClick={() => setCoinsPerPage(coinsPerPage + 10)}
					>
						View 10 More
					</span>
					<span
						className='view-more-btn'
						onClick={() => setCoinsPerPage(100)}
					>
						View All
					</span>
				</div>
			)}
		</section>
	);
};

export default AllCoins;
