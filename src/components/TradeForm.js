import { useState, useEffect } from 'react';
import axios from 'axios';
import '../sass/TradeForm.scss';

const TradeForm = props => {
	// supported_vs_currencies data for dropdown
	const [data, setData] = useState();
	const [dataLoading, setDataLoading] = useState(true);

	// Form dropdown and input
	const [purchaseCoin, setPurchaseCoin] = useState();
	const [input, setInput] = useState('');

	// Submit message
	const [messagePrice, setMessagePrice] = useState();
	const [showMessage, setShowMessage] = useState(false);

	// True for buy button, False for sell button
	const [buyOrSell, setBuyOrSell] = useState(true);

	// props.selectedCoin data (filtered for symbol in message)
	const [selectedCoinSymbol, setSelectedCoinSymbol] = useState();

	useEffect(() => {
		setShowMessage(false);
	}, [props.selectedCoin, input, purchaseCoin, buyOrSell]);

	useEffect(() => {
		axios
			.get(
				'https://api.coingecko.com/api/v3/simple/supported_vs_currencies'
			)
			.then(res => {
				setData(res.data);
				setDataLoading(false);
			});
		axios
			.get(
				'https://api.coingecko.com/api/v3/coins/markets?vs_currency=cad'
			)
			.then(res => {
				setSelectedCoinSymbol(res.data);
			});
	}, []);

	const allowNumber = e => {
		const regex = /^[0-9\b]+$/;
		if (e.target.value === '' || regex.test(e.target.value)) {
			setInput(e.target.value);
		}
	};

	const onSubmit = () => {
		axios
			.get(
				`https://api.coingecko.com/api/v3/simple/price?ids=${props.selectedCoin}&vs_currencies=${purchaseCoin}`
			)
			.then(res => {
				setMessagePrice(res.data[props.selectedCoin][purchaseCoin]);
				setShowMessage(true);
			});
	};

	if (dataLoading) {
		return <div className='trade-form'>Loading...</div>;
	}

	return (
		<div
			className='trade-form'
			// Extra padding added when message not shown to reduce movement
			style={{ paddingBottom: !showMessage && '43px' }}
		>
			<div className='btn-container'>
				<div
					className={buyOrSell ? 'btn active' : 'btn'}
					onClick={() => setBuyOrSell(true)}
				>
					BUY
				</div>
				<div
					className={buyOrSell ? 'btn' : 'btn active'}
					onClick={() => setBuyOrSell(false)}
				>
					SELL
				</div>
			</div>

			<select
				className='trade-currency-select input'
				onChange={e => setPurchaseCoin(e.target.value.toLowerCase())}
				data-testid='currency-form'
			>
				<option>Select Trade Currency</option>
				{data.map(coin => (
					<option key={coin} value={coin} data-testid='options'>
						{coin.toUpperCase()}
					</option>
				))}
			</select>

			<input
				className='amount input'
				placeholder='Amount'
				onChange={e => {
					allowNumber(e);
				}}
				value={input}
				data-testid='input-form'
			></input>

			<div className='submit' onClick={() => onSubmit()}>
				SUBMIT
			</div>

			{showMessage && (
				<div className='submit-message' data-testid='submit-message'>
					{`You Have ${
						buyOrSell ? 'Purchased' : 'Sold'
					} ${input} ${purchaseCoin.toUpperCase()} For ${messagePrice} ${selectedCoinSymbol
						.find(coin => coin.id === props.selectedCoin)
						.symbol.toUpperCase()} Each`}
				</div>
			)}
		</div>
	);
};

export default TradeForm;
