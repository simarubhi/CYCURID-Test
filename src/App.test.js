import {
	act,
	waitForElementToBeRemoved,
	fireEvent,
	render,
	screen,
	waitFor,
	getByText,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { shallow } from 'enzyme';
import Favourites from './components/Favourites';
import AllCoins from './components/AllCoins';
import CoinInfo from './components/CoinInfo';
import TradeForm from './components/TradeForm';

/*

** Often first couple of test script runs will return timeout errors. Usually running 4-5 times consitently brings passed tests (CTRL+S on App.test.js). **

** Known issues about warnings being displayed (Tests still pass) **

*/

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

describe('General Tests', () => {
	test('All Coins Data Loading', async () => {
		const { container, unmount } = render(<AllCoins />);

		expect(getByText(container, 'Loading...')).toBeInTheDocument();

		await waitForElementToBeRemoved(() =>
			getByText(container, 'Loading...')
		);

		expect(getByText(container, 'ALL COINS')).toBeInTheDocument();

		expect(getByText(container, 'BITCOIN')).toBeInTheDocument();

		unmount();
	});

	test('Coin Info Opens On All Coin Click', async () => {
		const trigger = jest.fn();
		const coinFunc = jest.fn();

		act(() => {
			render(
				<AllCoins checkTradeSectionOpen={trigger} coinInfo={coinFunc} />
			);
		});

		await waitForElementToBeRemoved(() => screen.getByText('Loading...'));

		expect(screen.getAllByTestId('coin-set')[0]).toBeInTheDocument();

		act(() => {
			fireEvent.click(screen.getAllByTestId('coin-set')[0]);
		});

		expect(trigger).toBeCalledTimes(1);
	});

	test('Favourites Being Added', async () => {
		const trigger = jest.fn();

		act(() => {
			render(
				<CoinInfo
					selectedCoin={'bitcoin'}
					sendFavouriteCoin={trigger}
				/>
			);
		});

		expect(screen.getByText('Loading...')).toBeInTheDocument();

		await waitForElementToBeRemoved(() => screen.getByText('Loading...'));

		expect(screen.getByText('BITCOIN')).toBeInTheDocument();

		expect(screen.getByText('ADD TO FAVOURITES')).toBeInTheDocument();

		act(() => {
			fireEvent.click(screen.getByText('ADD TO FAVOURITES'));
		});

		expect(trigger).toBeCalledTimes(1);
	});

	test('Form Input', async () => {
		act(() => {
			render(<TradeForm selectedCoin={'bitcoin'} />);
		});

		expect(screen.getByText('Loading...')).toBeInTheDocument();

		await waitForElementToBeRemoved(() => screen.getByText('Loading...'));

		expect(screen.getByText('BUY')).toBeInTheDocument();

		act(() => {
			userEvent.selectOptions(screen.getByTestId('currency-form'), 'btc');
			expect(screen.getAllByTestId('options')[0].selected).toBeTruthy();
		});

		act(() => {
			userEvent.type(screen.getByTestId('input-form'), '1');
		});

		expect(screen.getByTestId('input-form')).toHaveValue('1');

		act(() => {
			fireEvent.click(screen.getByText('SUBMIT'));
		});

		await waitFor(() => {
			setTimeout(() => {
				expect(
					screen.getByTestId('submit-message')
				).toBeInTheDocument();
			}, 7000);
		});
	});
});
