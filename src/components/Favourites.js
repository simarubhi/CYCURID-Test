import Logo from '../assets/Bitcoin.svg';
import '../sass/Favourites.scss';

const Favourites = () => {
	return (
		<section className='favourites'>
			<div className='container'>
				<h1 className='heading'>Favourite Coins</h1>
				{/* <div className='favourites-row'>No Favourite Coins Added</div> */}
				<div className='favourites-row'>
					<div className='favourite-container'>
						<div className='coin-container'>
							<img className='logo' src={Logo} alt='Logo'></img>
							<span className='coin-name'>BTC</span>
						</div>
						<span className='hover-text'>REMOVE</span>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Favourites;
