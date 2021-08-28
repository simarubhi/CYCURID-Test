import { act, getByTestId, render, screen } from '@testing-library/react';
import { shallow, mount } from 'enzyme';
import App from './App';
import Favourites from './components/Favourites';
import AllCoins from './components/AllCoins';
import TradeSection from './components/TradeSection';
import CoinInfo from './components/CoinInfo';
import TradeForm from './components/TradeForm';

describe('Test Ui Render', () => {
	test('Favourites Section Render Test', () => {
		const wrapper = shallow(<Favourites />);
		expect(wrapper.find('.heading').text()).toContain('Favourite Coins');
	});

	test('All Coins Section Render Test', () => {
		const wrapper = shallow(<AllCoins />);
		expect(wrapper.find('.heading').text()).toContain('Loading...');
	});

	test('Coin Info Render Test', () => {
		const wrapper = shallow(<CoinInfo />);
		expect(wrapper.find('.coin-name').text()).toContain('Loading...');
	});

	test('Trade Form Render Test', () => {
		const wrapper = shallow(<TradeForm />);
		expect(wrapper.find('.trade-form').text()).toContain('Loading...');
	});
});

describe('Test Favourite Section', () => {
	test('Test Adding Favourite', async () => {
		const { container } = render(<AllCoins />);
	});
});

// Load data in all coins
// Simulate click on all coins
// simulate click on favouite
// Check favourite for update

// describe('Correct Crypto Price', () => {
// Make test so that crypto price is tested
// });

// describe('Favourites Added', () => {
// Make test so that if coin added to favourites, favourites has the coin added
// });

// describe('Favourites hover', () => {
// Make test so that if hover on favourite coin remove appears
// });
