import { useState, useEffect } from 'react';
import axios from 'axios';
import '../sass/TradeForm.scss';

const TradeForm = props => {
	const [data, setData] = useState();
	const [dataLoading, setDataLoading] = useState(true);

	const [input, setInput] = useState('');
	const [purchaseCoin, setPurchaseCoin] = useState();
	const [purchaseSymbol, setPurchaseSymbol] = useState();

	const [messagePrice, setMessagePrice] = useState();
	const [showMessage, setShowMessage] = useState(false);

	const [buyOrSell, setBuyOrSell] = useState(true);

	useEffect(() => {
		setShowMessage(false);
	}, [props.selectedCoin, input, purchaseCoin, buyOrSell]);

	useEffect(() => {
		axios
			.get(
				'https://api.coingecko.com/api/v3/coins/markets?vs_currency=cad'
			)
			.then(res => {
				setData(res.data);
				setDataLoading(false);
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
			.get(`https://api.coingecko.com/api/v3/coins/${purchaseCoin}`)
			.then(res => {
				setPurchaseSymbol(res.data.symbol);
				setShowMessage(true);
			});
	};

	useEffect(() => {
		axios
			.get(
				`https://api.coingecko.com/api/v3/simple/price?ids=${props.selectedCoin}&vs_currencies=${purchaseSymbol}`
			)
			.then(res => {
				setMessagePrice(res.data[props.selectedCoin][purchaseSymbol]);
			});
	}, [purchaseSymbol, props.selectedCoin]);

	if (dataLoading) {
		return <div className='trade-form'>Loading...</div>;
	}

	return (
		<div className='trade-form'>
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
				onChange={e => setPurchaseCoin(e.target.value)}
			>
				<option>Select Trade Currency</option>
				{data.map(coin => (
					<option>{coin.id}</option>
				))}
			</select>

			<input
				className='amount input'
				placeholder='Amount'
				onChange={e => {
					allowNumber(e);
				}}
				value={input}
			></input>

			<div className='submit' onClick={() => onSubmit()}>
				SUBMIT
			</div>

			{showMessage && (
				<div className='submit-message'>
					{`You Have ${
						buyOrSell ? 'Purchased' : 'Sold'
					} ${input} ${purchaseSymbol.toUpperCase()} For ${messagePrice} ${props.selectedCoin.toUpperCase()} Each`}
				</div>
			)}
		</div>
	);
};

export default TradeForm;
