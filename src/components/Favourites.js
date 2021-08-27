import { useState, useEffect } from 'react';
import '../sass/Favourites.scss';

const Favourites = props => {
	const [localCoins, setlocalCoins] = useState(
		JSON.parse(localStorage.getItem('Coins'))
			? JSON.parse(localStorage.getItem('Coins'))
			: []
	);

	const addNewCoin = () => {
		if (
			props.favouriteCoin &&
			!localCoins.some(coin => coin.id === props.favouriteCoin.id)
		) {
			setlocalCoins(localCoins.push(props.favouriteCoin));
		}
		localStorage.setItem('Coins', JSON.stringify(localCoins));
		setlocalCoins(JSON.parse(localStorage.getItem('Coins')));
	};

	useEffect(() => {
		localCoins.some(coin => coin.id === props.favouriteCoin);
		addNewCoin();
	}, [props.favouriteCoin]);

	const removeCoin = coin => {
		setlocalCoins(localCoins.filter(local => local.id !== coin.id));
	};

	useEffect(() => {
		localStorage.setItem('Coins', JSON.stringify(localCoins));
	}, [localCoins]);

	return (
		<section className='favourites'>
			<div className='container'>
				<h1 className='heading'>Favourite Coins</h1>
				<div className='favourites-row'>
					{localCoins[0]
						? localCoins.map(
								coin =>
									coin !== null && (
										<div
											className='favourite-container'
											onClick={() => removeCoin(coin)}
										>
											<div className='coin-container'>
												<img
													className='logo'
													src={coin.image}
													alt='Logo'
												></img>
												<span className='coin-name'>
													{coin.id}
												</span>
											</div>
											<span className='hover-text'>
												REMOVE
											</span>
										</div>
									)
						  )
						: 'No Coins'}
				</div>
			</div>
		</section>
	);
};

export default Favourites;
