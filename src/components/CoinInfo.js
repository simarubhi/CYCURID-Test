import Logo from '../assets/Bitcoin.svg';
import Add from '../assets/AddFavourite.png';
import '../sass/CoinInfo.scss';

const CoinInfo = () => {
	return (
		<div className='coin-info'>
			<div className='heading'>
				<img className='logo' src={Logo} alt='Logo'></img>
				<h3 className='coin-name'>BITCOIN (BTC)</h3>
			</div>

			<div className='info-container'>
				<div className='info'>
					<span>Current Price:</span>
					<span>$2000</span>
				</div>
				<div className='info'>
					<span>Market Cap:</span>
					<span>235235235</span>
				</div>
				<div className='info'>
					<span>Low 24H:</span>
					<span>$342343</span>
				</div>
				<div className='info'>
					<span>High 24H:</span>
					<span>$2340098</span>
				</div>
				<div className='info'>
					<span>Circulating Supply:</span>
					<span>3240990</span>
				</div>
				<div className='info'>
					<span>Total Supply:</span>
					<span>90098234</span>
				</div>
				<div className='info'>
					<span>Market Cap Rank:</span>
					<span>1ST</span>
				</div>

				<div className='add-favourites'>
					<img className='symbol' src={Add} alt='Add Symbol'></img>
					<span className='add-text'>ADD TO FAVOURITES</span>
				</div>
			</div>
		</div>
	);
};

export default CoinInfo;
