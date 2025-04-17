import React from 'react'
import useSWR from 'swr';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, LineController, LineElement, PointElement, Title, Tooltip, Legend, Ticks } from 'chart.js';


ChartJS.register(CategoryScale, LinearScale, LineController, LineElement, PointElement, Title, Tooltip, Legend);

const CryptoComponent = () => {
    const [error, setError] = React.useState('');

    const [days, setDays] = React.useState(7);
    const [coinID, setCoinID] = React.useState('bitcoin');

    // const coinBase = import.meta.env.VITE_COINGECKO_API;
    const coinBase = import.meta.env.VITE_CRYPTO_LOCAL;
    const MAIN_URL = `${coinBase}coins/${coinID}/market_chart?vs_currency=usd&days=${days}`;
    const LIST_URL = `${coinBase}coins/markets?vs_currency=usd`;
    const COIN_URL = `${LIST_URL}&ids=${coinID}`;


    // console.log(MAIN_URL);

    const fetchCoinList = async (url) => {
        try {
            const response = await fetch(url);
            const data = await response.json();
            return data;
        } catch (error) {
            throw new Error('Rate limit exceeded')
        }
    };

    const { data: coinList, error: coinListError, isLoading: coinListLoading } = useSWR(LIST_URL, fetchCoinList);

    const fetchCoin = async (url) => {
        try {
            const response = await fetch(url);
            const data = await response.json();
            return data;
        } catch (error) {
            setError('Rate limit exceeded');
        }
    };
    const { data: coin } = useSWR(COIN_URL, fetchCoin);

    const fetchData = async (url) => {
        try {
            const response = await fetch(url);
            const data = await response.json();
            return data;
        } catch (error) {
            throw new Error('Rate limit exceeded');
        }
    };
    const { data: priceData, error: pricesError, isLoading: priceLoading } = useSWR(MAIN_URL, fetchData);


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

    const options = {
        interaction: {
            mode: 'index',
            intersect: false
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Date'
                },
                ticks: {
                    maxTicksLimit: 3
                }
            },
            y: {
                title: {
                    display: true,
                    text: `Price in USD`
                }
            }
        }
    }

    const data = {
        labels: priceData?.prices.map((price) => UnixToDate(price[0])),
        datasets: [
            {
                label: (coin ? `${coin[0].name} Price` : 'Price'),
                data: priceData?.prices.map((price) => price[1]),
                fill: true,
                backgroundColor: 'rgba(255, 255, 255, 1)',
                borderColor: 'rgba(100, 100, 100, 1)',
            },
        ],
    }

    if (priceLoading || coinListLoading) {
        return (
            <div className='flex justify-center items-center h-screen'>
                <div className='animate-spin rounded-full h-32 w-32 border-b-2 border-white'></div>
            </div>
        )
    }

    if (pricesError || coinListError) {
        return (
            <div className='flex justify-center items-center h-screen'>
                <div className='text-red-600'>Error: {pricesError?.message || coinListError?.message}</div>
            </div>
        )
    }

    return (
        <React.Fragment>
            <div className='mb-8 flex flex-col justify-center items-center'>
                <div className='w-[360px] md:w-[600px] lg:w-[900px] text-sm box-border border-2 rounded-lg bg-slate-900 border-white p-4'>
                    <h2 className='m-4 md:m-6 text-sm md:text-md lg:text-lg'>
                        <select
                            id='currency'
                            className='mx-4 p-2 text-center bg-slate-900 text-white border-2 border-white rounded-lg w-[100px] focus:outline-none'
                            value={coinID}
                            onChange={(e) => setCoinID(e.target.value)}
                        >
                            {
                                coinList?.map((coin, index) => (
                                    <option key={index} value={coin.id}>{coin.name}</option>
                                ))
                            }
                        </select>
                        Price in last
                        <select
                            id='days'
                            className='m-4 md:mx-4 p-2 text-center bg-slate-900 text-white border-2 border-white rounded-lg w-[100px] focus:outline-none'
                            value={days}
                            onChange={(e) => setDays(e.target.value)}
                        >
                            <option value='7'>1 week</option>
                            <option value='30'>1 month</option>
                            <option value='365'>1 year</option>
                        </select>
                    </h2>
                    {
                        error
                            ? <p className='text-red-600'>Error: {error}</p>
                            : <div className='flex p-2 justify-center items-center gap-4'>
                                {coin ?
                                    (<>
                                        <div>
                                            <img src={coin[0].image} alt={coin[0].name} className='mx-auto w-[20px] md:w-[40px]' />
                                        </div>
                                        <p className={coin[0].price_change_percentage_24h > 0 ? `text-green-600` : `text-red-600`}>{coin[0].price_change_percentage_24h}%</p>
                                    </>
                                    ) : <div>{error}</div>
                                }

                            </div>
                    }
                    <Line data={data} options={options} updateMode='resize' />
                </div>
            </div>
        </React.Fragment >
    )
}

export default CryptoComponent