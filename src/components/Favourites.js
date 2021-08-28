import { useState, useEffect } from 'react';
import '../sass/Favourites.scss';

const Favourites = props => {
	// If any favourite coins stored in local storage set as localCoins
	const [localCoins, setLocalCoins] = useState(
		JSON.parse(localStorage.getItem('Favourite Coins'))
			? JSON.parse(localStorage.getItem('Favourite Coins'))
			: []
	);

	const addNewCoin = () => {
		if (
			props.favouriteCoin &&
			// Prevents same coin being added twice
			!localCoins.some(coin => coin.id === props.favouriteCoin.id)
		) {
			setLocalCoins(localCoins.push(props.favouriteCoin));
		}
		localStorage.setItem('Favourite Coins', JSON.stringify(localCoins));
		setLocalCoins(JSON.parse(localStorage.getItem('Favourite Coins')));
	};

	useEffect(() => {
		localCoins.some(coin => coin.id === props.favouriteCoin);
		addNewCoin();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [props.favouriteCoin]);

	const removeCoin = coin => {
		setLocalCoins(localCoins.filter(local => local.id !== coin.id));
	};

	// Runs after removeCoin to update local storage
	useEffect(() => {
		localStorage.setItem('Favourite Coins', JSON.stringify(localCoins));
	}, [localCoins]);

	return (
		<section className='favourites'>
			<div className='container'>
				<h1 className='heading'>Favourite Coins</h1>
				<div className='favourites-row'>
					{localCoins[0]
						? localCoins.map(coin => (
								<div
									className='favourite-container'
									onClick={() => removeCoin(coin)}
									key={coin.id}
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
									<span className='hover-text'>REMOVE</span>
								</div>
						  ))
						: 'No Coins'}
				</div>
			</div>
		</section>
	);
};

export default Favourites;
