import '../sass/TradeForm.scss';

const TradeForm = () => {
	return (
		<div className='trade-form'>
			<div className='btn-container'>
				<div className='btn buy'>BUY</div>
				<div className='btn sell'>SELL</div>
			</div>

			<select className='trade-currency-select dropdown'>
				<option>Select Trade Currency</option>
				<option>Bitcoin</option>
				<option>Ethereum</option>
			</select>

			<select className='amount-select dropdown'>
				<option>Amount</option>
				<option>1</option>
				<option>2</option>
				<option>3</option>
				<option>4</option>
				<option>5</option>
				<option>6</option>
				<option>7</option>
				<option>8</option>
				<option>9</option>
				<option>10</option>
			</select>

			<div className='submit'>SUBMIT</div>

			<div className='submit-message'>
				You Have Purchased 1 ETH For 0.03426843 BTC
			</div>
		</div>
	);
};

export default TradeForm;
