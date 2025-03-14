import React from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';


ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const StockPriceComponent = () => {
    const BASE_URL = import.meta.env.VITE_TWELVE_DATA_LOCAL;
    const [stockSymbol, setStockSymbol] = React.useState('AAPL');
    const [interval, setInterval] = React.useState('1day');
    const API_KEY = import.meta.env.VITE_TWELVE_DATA_API_KEY;
    const [stockData, setStockData] = React.useState({
        prices: [],
        metadata: null,
        status: null
    });

    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(null);

    const popularStocks = ['AAPL', 'GOOGL', 'MSFT', 'AMZN', 'TSLA', 'META', 'NVDA', 'NFLX', 'INTC', 'AMD'];

    const fetchStockPrices = React.useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await axios.get(`${BASE_URL}/time_series`, {
                params: {
                    symbol: stockSymbol,
                    interval: interval,
                    apikey: API_KEY,
                    outputsize: 25
                }
            });

            if (response.data.status === 'error') {
                throw new Error(response.data.message);
            }

            setStockData({
                prices: response.data.values.reverse(),
                metadata: response.data.meta,
                status: response.data.status
            });
        } catch (error) {
            console.error('Error fetching stock prices', error);
            setError(error.message || 'Failed to fetch stock prices');
        } finally {
            setLoading(false);
        }
    }, [stockSymbol, interval]);

    React.useEffect(() => {
        fetchStockPrices();
    }, [fetchStockPrices]);

    const chartData = {
        labels: stockData.prices.map(price =>
            new Date(price.datetime).toLocaleDateString()
        ),
        datasets: [
            {
                label: 'Open Price',
                data: stockData.prices.map(price => parseFloat(price.open)),
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                tension: 0.1,
            },
            {
                label: 'Close Price',
                data: stockData.prices.map(price => parseFloat(price.close)),
                borderColor: 'rgb(54, 162, 235)',
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                tension: 0.1,
            },
            {
                label: 'High Price',
                data: stockData.prices.map(price => parseFloat(price.high)),
                borderColor: 'rgb(75, 192, 192)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                tension: 0.1,
            },
            {
                label: 'Low Price',
                data: stockData.prices.map(price => parseFloat(price.low)),
                borderColor: 'rgb(255, 206, 86)',
                backgroundColor: 'rgba(255, 206, 86, 0.2)',
                tension: 0.1,
            },
            {
                label: 'Volume',
                data: stockData.prices.map(price => parseFloat(price.volume)),
                borderColor: 'rgb(153, 102, 255)',
                backgroundColor: 'rgba(153, 102, 255, 0.2)',
                tension: 0.1,
                yAxisID: 'y-volume'
            }
        ]
    };

    const chartOptions = {
        responsive: true,
        interaction: {
            mode: 'index',
            intersect: false
        },
        stacked: false,
        plugins: {
            title: {
                display: true,
                text: `${stockSymbol} Stock Price and Volume (${interval})`
            }
        },
        scales: {
            y: {
                type: 'linear',
                display: true,
                position: 'left',
                title: {
                    display: true,
                    text: 'Price (USD)'
                }
            },
            'y-volume': {
                type: 'linear',
                display: true,
                position: 'right',
                title: {
                    display: true,
                    text: 'Volume'
                }
            },
            x: {
                title: {
                    display: true,
                    text: 'Date'
                },
                ticks: {
                    maxTicksLimit: 3
                }
            }
        }
    };

    return (
        <div className="container mx-auto my-8 p-4 w-[360px] md:w-[600px] lg:w-[900px] text-sm box-border border-2 rounded-lg bg-zinc-300 border-slate-700">
            <div className="flex flex-row justify-between mb-4">
                <select
                    value={stockSymbol}
                    onChange={(e) => setStockSymbol(e.target.value)}
                    className="md:mb-0 mx-4 p-2 text-center bg-zinc-300 text-slate-700 border-2 border-slate-700 rounded-lg focus:outline-none"
                >
                    {popularStocks.map(stock => (
                        <option key={stock} value={stock}>
                            {stock}
                        </option>
                    ))}
                </select>

                <select
                    value={interval}
                    onChange={(e) => setInterval(e.target.value)}
                    className="mx-4 p-2 text-center bg-zinc-300 text-slate-700 border-2 border-slate-700 rounded-lg focus:outline-none"
                >
                    <option value="1min">1 Minute</option>
                    <option value="1hour">1 Hour</option>
                    <option value="1day">1 Day</option>
                </select>
            </div>

            {loading && (<div className="text-center text-blue-500">Loading stock data...</div>)}

            {error && (<div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">{error}</div>)}

            {
                !loading && !error && stockData.prices.length > 0 && (
                    <div>
                        <Line data={chartData} options={chartOptions} />
                    </div>
                )
            }
        </div>
    );
};

export default StockPriceComponent;