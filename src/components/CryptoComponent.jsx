import React from 'react'
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, LineController, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';


ChartJS.register(CategoryScale, LinearScale, LineController, LineElement, PointElement, Title, Tooltip, Legend);

const CryptoComponent = () => {

    const [prices, setPrices] = React.useState([]);
    const [coinList, setCoinList] = React.useState([]);
    const [coin, setCoin] = React.useState('Bitcoin');

    const [days, setDays] = React.useState(7);
    const [coinID, setCoinID] = React.useState('bitcoin');
    const [currency, setCurrency] = React.useState('usd');

    const coinBase = import.meta.env.VITE_COINGECKO_API;
    const MAIN_URL = `${coinBase}coins/${coinID}/market_chart?vs_currency=${currency}&days=${days}`;
    const LIST_URL = `${coinBase}coins/markets?vs_currency=${currency}`;
    const COIN_URL = `${LIST_URL}&ids=${coinID}`;
    // console.log(MAIN_URL);

    const fetchCoinList = React.useCallback(async () => {
        try {
            const response = await fetch(LIST_URL);
            const data = await response.json();
            setCoinList(data);
        } catch (error) {
            console.error('Error:', error);
        }
    }, [currency]);

    const fetchCoin = React.useCallback(async () => {
        try {
            const response = await fetch(COIN_URL);
            const data = await response.json();
            setCoin(data);
        } catch (error) {
            console.error('Error:', error);
        }
    }, [coinID, currency]);

    const fetchData = React.useCallback(async () => {
        try {
            const response = await fetch(MAIN_URL);
            const data = await response.json();
            setPrices(data.prices);
        } catch (error) {
            console.error('Error:', error);
        }
    }, [coinID, currency, days]);


    const UnixToDate = (unix_timestamp) => {
        const date = new Date(unix_timestamp);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    React.useEffect(() => {
        fetchCoin();
        fetchData();
        fetchCoinList();
    }, [fetchData, fetchCoinList]);

    const options = {
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Date'
                },
            },
            y: {
                title: {
                    display: true,
                    text: `Price in ${currency.toUpperCase()}`
                }
            }
        }
    }

    const data = {
        labels: prices.map((price) => UnixToDate(price[0])),
        datasets: [
            {
                label: `${coin[0].name} Price`,
                data: prices.map((price) => price[1]),
                fill: true,
                backgroundColor: 'rgb(132, 255, 32)',
                borderColor: 'rgba(32, 255, 132, 0.2)',
            },
        ],
    }

    return (
        <React.Fragment>
            <div className='w-[980px] border-2 rounded-lg'>
                <h2 className='m-6 text-3xl'>
                    <select
                        className='mx-4 p-2 text-center bg-emerald-300 text-emerald-800 border-2 border-emerald-800 rounded-lg focus:outline-none'
                        value={coinID}
                        onChange={(e) => setCoinID(e.target.value)}
                    >
                        {
                            coinList.map((coin, index) => (
                                <option key={index} value={coin.id}>{coin.symbol}</option>
                            ))
                        }
                    </select>
                    Price in last
                    <select
                        className='mx-4 p-2 text-center bg-emerald-300 text-emerald-800 border-2 border-emerald-800 rounded-lg focus:outline-none'
                        value={days}
                        onChange={(e) => setDays(e.target.value)}
                    >
                        <option value='7'>7</option>
                        <option value='30'>30</option>
                        <option value='90'>90</option>
                    </select>
                    days
                </h2>
                <div className='flex p-2 justify-center items-center gap-4'>
                    <div>
                        <img width={50} src={coin[0].image} alt={coin[0].name} className='mx-auto' />
                    </div>
                    <p className={coin[0].price_change_percentage_24h > 0 ? `text-green-600` : `text-red-600`}>{coin[0].price_change_percentage_24h}%</p>

                </div>
                <Line data={data} options={options} updateMode='resize' />

            </div>
        </React.Fragment>
    )
}

export default CryptoComponent