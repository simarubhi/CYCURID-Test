import '../sass/AllCoins.scss';

const AllCoins = () => {
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
					<tr>
						<td>Bitcoin</td>
						<td>10000</td>
						<td>354324234</td>
						<td>$20000.00</td>
					</tr>
				</tbody>
			</table>
		</section>
	);
};

export default AllCoins;
